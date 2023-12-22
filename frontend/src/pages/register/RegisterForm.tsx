import React, { useState } from 'react';
import Navigate from '../../components/Navigate';
import { useAuth } from '../../hooks/useAuth';
import client from '../../api';
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';

const RegisterForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };

    const { loginUser } = useAuth();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        // client.register(inputs)
        //     .then((response) => {
        //         if (response.data.access_token !== '' && response.data.access_token !== undefined) {                    
        //             const user = response.data.user;
        //             user.authToken = response.data.access_token;
        //             setLoggedIn(true);
        //             loginUser(user);               
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setLoggedIn(false);
        //         setStatus({
        //             type: 'danger',
        //             message: 'Something went wrong',
        //             error: error.response.data.detail,
        //         });
        //         openModal({
        //             title:'Error',
        //             content: error.response.data.detail
        //         })
        //     });
    };

    // return loggedIn ? (<Navigate to={'/apiaries'} />) : (
        return (
        <>
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <IonText><h1>Регистрация</h1></IonText>  
                  <p>Ако вече имате акаунт <a href='/login'>влезте</a></p>                                  
                  
                  <form className='ion-padding' onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position="floating">Име</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Фамилия</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Имейл</IonLabel>
                      <IonInput type="email" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Парола</IonLabel>
                      <IonInput type="password" />
                    </IonItem>
                    <IonButton className="ion-margin-top" type="submit" expand="block">
                        Регистрирай се
                    </IonButton>
                  </form>
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>                    
        </>
    );
};


export default RegisterForm;
