import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import client from '../../api';
import { IonButton, IonCol, InputCustomEvent, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { Redirect } from 'react-router-dom';

const RegisterForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',      
        email: '',
        password: '',
    });

    const handleChange = (event: InputCustomEvent) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };

    const { loginUser } = useAuth();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        client.register(inputs)
            .then((response) => {
                if (response.data.access_token !== '' && response.data.access_token !== undefined) {                    
                    const user = response.data.user;
                    user.authToken = response.data.access_token;
                    setLoggedIn(true);
                    loginUser(user);               
                }
            })
            .catch((error) => {
                console.log(error);
                setLoggedIn(false);
            });
    };

    return loggedIn ? (<Redirect to='/apiaries' />) : (
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
                      <IonInput name="first_name" onIonInput={handleChange} />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Фамилия</IonLabel>
                      <IonInput name="last_name" onIonInput={handleChange} />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Имейл</IonLabel>
                      <IonInput name="email" type="email" onIonInput={handleChange} />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Парола</IonLabel>
                      <IonInput name="password" type="password" onIonInput={handleChange} />
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
