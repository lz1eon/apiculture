import { IonToolbar, IonButton, IonButtons } from "@ionic/react";
import PageHeaderTitle from "./ToolbarTitle";

const AnonymousToolbar = () => {
  return (
    <IonToolbar>
      <PageHeaderTitle />
      <IonButtons slot="start">
        <IonButton routerLink="/">Начало</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton routerLink="/contacts">Контакти</IonButton>
      </IonButtons>
      {/* <IonButtons slot="end">
          <IonButton routerLink="/register">Регистрация</IonButton>
        </IonButtons> */}
      <IonButtons slot="end">
        <IonButton routerLink="/login">Вход</IonButton>
      </IonButtons>
    </IonToolbar>
  )
}

export default AnonymousToolbar;