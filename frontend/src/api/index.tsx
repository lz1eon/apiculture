import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import axios from "axios";
import ReactDOM from "react-dom";
import { MainContainer, ModalDialog } from "../components";

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
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Log the user out when status 401 is received for whatever reason
api.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    const { config } = error;

    if (error.response.data.error == 'Token expired.') {
      return client.refreshToken().then(
        (response) => {
          // Get user from local storage
          const user = JSON.parse(localStorage.getItem('user') || '{}');

          // Set user tokens
          user.accessToken = response.data.access_token;
          if (response.data.refresh_token) {
            console.log('New Refresh Token: ', response.data.refresh_token, user.refreshToken)
            user.refreshToken = response.data.refresh_token;
          }
          localStorage.setItem('user', JSON.stringify(user));

          // Resend the failed request with new access token
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return axios(config);
        },
        (error) => {
          // Refresh token has failed so remove 'user' from local storge 
          localStorage.setItem('user', '');

          // Show modal to inform the user that his session timed out
          ReactDOM.render(
            <ModalDialog
              isOpen={true}
              title={'Изтекла сесия'}
              onClose={() => { window.location.href = '/login'; }}
            >
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="6">
                    <IonText><h1>Сесията Ви изтече.</h1></IonText>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="6">
                    <IonButton color="primary" routerLink='/login'>Влезте отново</IonButton>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </ModalDialog>,
            document.getElementById('main-content')
          );
        })
    }
  }
);


class Client {
  register(data: Object) {
    // axios is used on purpose so no Authorization header is added to the request
    return axios.post('/register/', data);
  }

  login(credentials: { username: string, password: string }) {
    const form = new FormData();
    form.append('username', credentials.username);
    form.append('password', credentials.password);
    // axios is used on purpose so no Authorization header is added to the request
    return axios.post('/login/', form);
  }

  logout() {
    return api.post('/logout/');
  }

  refreshToken() {
    const userJSON = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userJSON);
    const headers = {
      'Authorization': `Bearer ${user.refreshToken}`,
    };
    return axios.post('/refresh-token/', {}, { headers: headers });
  }

  getApiaries() {
    return api.get('/apiaries/');
  }

  getApiary(id: string) {
    return api.get(`/apiaries/${id}/`);
  }

  createApiary(number: string, name: string, type: number) {
    return api.post(`/apiaries/`, { number: number, name: name, type: type });
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
    return api.put(`/apiaries/${apiary_id}/hives/${id}/`, { x: x, y: y });
  }

  shareHive(id: number, apiary_id: number, recipientEmail: string) {
    return api.post(`/apiaries/${apiary_id}/hives/${id}/share/`, { recipient_email: recipientEmail });
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