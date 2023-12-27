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
import { Redirect, Link } from 'react-router-dom';
import { ModalDialog } from '../../components';


const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPassword, setIsValidPassword] = useState<boolean>();
  const { loginUser } = useAuth();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const handleChangeEmail = (event: InputCustomEvent) => {
    const value = String(event.target.value || '');
    setEmail(value);
    
    setIsValidEmail(undefined);
    if (value === '') setIsValidEmail(false);
    if (validateEmail(value) === null) setIsValidEmail(false);
  }

  const handleChangePassword = (event: InputCustomEvent) => {
    const value = String(event.target.value || '');
    setPassword(value);

    setIsValidPassword(undefined);
    if (value === '') setIsValidPassword(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    client.login({ username: email, password: password })
      .then((response) => {
        if (response.data.access_token !== '' && response.data.access_token !== undefined) {
          const user = response.data.user;
          user.authToken = response.data.access_token;
          setLoggedIn(true);
          loginUser(user);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
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
      <ModalDialog title={'Грешка'} isOpen={showModal} onClose={() => { () => setShowModal(false) }}>
        {errorMessage}
      </ModalDialog>

      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h1>Вход</h1></IonText>
            <form className='ion-padding' onSubmit={handleSubmit}>
              <IonItem>
                <IonInput
                  // className={`${isValidEmail && 'ion-valid'} ${isValidEmail === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  name="email"
                  type="text"
                  label="Имейл"
                  labelPlacement='stacked'
                  autocomplete="username"
                  // errorText='Имейлът не е валиден'
                  onIonInput={handleChangeEmail}
                  onIonBlur={() => setIsTouched(true)}
                  required
                />
              </IonItem>
              <IonItem>
                <IonInput
                  // className={`${isValidPassword && 'ion-valid'} ${isValidPassword === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  name="password"
                  type="password"
                  label="Парола"
                  labelPlacement='stacked'
                  autocomplete="current-password"
                  // errorText='Не е въведена парола'
                  onIonInput={handleChangePassword}
                  onIonBlur={() => setIsTouched(true)}
                  required
                />
              </IonItem>
              <IonButton className="ion-margin-top" type="submit" expand="block">
                Влез
              </IonButton>
            </form>
            {/* <IonLabel><p><Link to='/forgotten-password'>Забравена парола?</Link></p></IonLabel> */}
            {/* <IonText><p>Не сте регистриран? <Link to='/register'>Регистрирайте се</Link></p></IonText> */}
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};


export default LoginForm;
