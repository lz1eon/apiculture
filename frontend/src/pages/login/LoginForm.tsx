import React, { useRef, useState } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,
    IonCol,
    IonGrid,
    IonRow,
    IonText,
    InputCustomEvent
  } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

import { useAuth } from '../../hooks/useAuth';
import client from '../../api';
import { Redirect } from 'react-router-dom';


const LoginForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
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
        client.login(inputs)
          .then((response) => {
            if (response.data.access_token !== '' && response.data.access_token !== undefined) {
              const user = response.data.user;
              user.authToken = response.data.access_token;
              setLoggedIn(true);
              loginUser(user);
            }
          })
          .catch((error) => {
            setLoggedIn(false);
          });
    };

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [message, setMessage] = useState(
      'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        setMessage(`Hello, ${ev.detail.data}!`);
      }
    }

    return loggedIn ? (
        <Redirect to='/apiaries' />
    ) : (
        <>
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <IonText><h1>Вход</h1></IonText>                  
                  <form className='ion-padding' onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position="floating">Имейл</IonLabel>
                      <IonInput name="username" required autocomplete="username" onIonInput={handleChange} />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Парола</IonLabel>
                      <IonInput type="password" name="password" required autocomplete="current-password" onIonInput={handleChange} />
                    </IonItem>
                    <IonButton className="ion-margin-top" type="submit" expand="block">
                        Влез
                    </IonButton>
                  </form>
                  <IonLabel><p><a href='/forgotten-password'>Забравена парола?</a></p></IonLabel>
                  <IonText><p>Не сте регистриран? <a href='/register'>Регистрирайте се</a></p></IonText>
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>


            <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Welcome</IonTitle>
                <IonButtons slot="end">
                    <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                    </IonButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                <IonInput
                    label="Enter your name"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder="Your name"
                />
                </IonItem>
            </IonContent>
            </IonModal>
        </>
    );
};


export default LoginForm;
