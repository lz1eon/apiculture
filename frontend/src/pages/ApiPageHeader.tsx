import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";
import logo from '../assets/images/logo.png';

const ApiPageHeader = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton disabled>
            <img src={logo}></img>
          </IonButton>
          <IonButton size="large" fill="clear" routerLink="/">Пчелинът</IonButton>
        </IonButtons>
        {/* <IonButtons slot="end">
          <IonButton routerLink="/pricing">Цена</IonButton>
        </IonButtons>         */}
        <IonButtons slot="end">
          <IonButton routerLink="/about">За Пчелинът</IonButton>
        </IonButtons>        
        <IonButtons slot="end">
          <IonButton routerLink="/contacts">За нас</IonButton>
        </IonButtons>        
        <IonButtons slot="end">
          <IonButton routerLink="/register">Регистрация</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton routerLink="/login">Вход</IonButton>
        </IonButtons>

      </IonToolbar>
    </IonHeader>
  )
}

export default ApiPageHeader;