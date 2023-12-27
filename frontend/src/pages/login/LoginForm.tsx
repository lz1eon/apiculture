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
                  name="username"
                  label="Имейл"
                  labelPlacement='stacked'
                  autocomplete="username"
                  onIonInput={handleChange}
                  required
                />
              </IonItem>
              <IonItem>
                <IonInput
                  name="password"
                  type="password"
                  label="Парола"
                  labelPlacement='stacked'
                  autocomplete="current-password"
                  onIonInput={handleChange}
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
