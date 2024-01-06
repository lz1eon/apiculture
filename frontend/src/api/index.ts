import axios from "axios";
import { Hive } from "../models/hive";

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
axios.defaults.baseURL = "http://localhost:8000";
const api = axios.create();

// Add Authorization header on every request
api.interceptors.request.use(
    (config) => {
        const userJSON = localStorage.getItem('user');        
        if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user) {
                config.headers.Authorization = `Bearer ${user.authToken}`;
            }
        }        
        return config;
    },
    (error) => Promise.reject(error)
);

// Log the user out when status 401 is received for whatever reason
// api.interceptors.response.use(
//     (response) => {return response;},
//     (error) => {
//         console.log('errrrr')
//     }
// );
type UpdateHiveProps = {
    id: number
    apiary_id: number
    rest: any
}

class Client {
    register(data: Object) {
        // axios is used on purpose so no Authorization header is added to the request
        return axios.post('/register/', data);
    }

    login(credentials: {username: string, password: string}) {
        const form = new FormData();
        form.append('username', credentials.username);
        form.append('password', credentials.password);
        // axios is used on purpose so no Authorization header is added to the request
        return axios.post('/login/', form);
    }

    logout() {
        return api.post('/logout/');
    }

    getApiaries() {
        return api.get('/apiaries/');
    }

    getApiary(id: string) {
        return api.get(`/apiaries/${id}/`);
    }

    createApiary(number: string, name: string, type: number) {
        return api.post(`/apiaries/`, {number: number, name: name, type: type});
    }

    getMySharedHives() {
        return api.get('/hives/my-shared/');
    }

    getSharedWithMe() {
        return api.get('/hives/shared-with-me/');
    }

    createHive(apiary_id: string, data: any) {        
        return api.post(`/apiaries/${apiary_id}/hives/`, data);
    }

    updateHive(id: number, apiary_id: string, rest: any) {        
        return api.put(`/apiaries/${apiary_id}/hives/${id}/`, rest);
    }

    updateHiveCoordinates(id: number, apiary_id: number, x: number, y: number) {
        return api.put(`/apiaries/${apiary_id}/hives/${id}/`, {x: x, y: y});
    }

    shareHive(id: number, apiary_id: number, recipientEmail: string) {
        return api.post(`/apiaries/${apiary_id}/hives/${id}/share/`, {recipient_email: recipientEmail});
    }

    // get(url, config) {
    //     return api.get(url, config)
    //                 .catch(error => {
    //                     if (error.response.status == 401) {
    //                       console.log('User should be logged out')
    //                     } else {
    //                       console.log(error);
    //                     }
    //                     return Promise.resolve(error);
    //                 });
    // }

    // post(url, data, config) {
    //     return api.post(url, data, config)
    //                 .catch(error => {
    //                     if (error.response.status == 401) {
    //                       console.log('User should be logged out')
    //                     } else {
    //                       console.log(error);
    //                     }
    //                     return Promise.reject(error);
    //                 });

    // }

    // put(url, data, config) {
    //     return api.put(url, data, config)
    //                 .catch(error => {
    //                     if (error.response.status == 401) {
    //                       console.log('User should be logged out')
    //                     } else {
    //                       console.log(error);
    //                     }
    //                     return Promise.reject(error);
    //                 });
    // }

    // delete(url, data, config) {
    //     return api.delete(url, data, config)
    //                 .catch(error => {
    //                     if (error.response.status == 401) {
    //                       console.log('User should be logged out')
    //                     } else {
    //                       console.log(error);
    //                     }
    //                     return Promise.reject(error);
    //                 });
    // }
};

const client = new Client();
export default client;