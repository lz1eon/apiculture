import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_API_BASE;
const api = axios.create();

// Add Authorization header on every request
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            config.headers.Authorization = `Bearer ${user.authToken}`;
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


class Client {
    register(data) {
        // axios is used on purpose so no Authorization header is added to the request        
        return axios.post('/register/', data);
    }

    login(credentials) {
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

    getApiary(id) {
        return api.get(`/apiaries/${id}/`);
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