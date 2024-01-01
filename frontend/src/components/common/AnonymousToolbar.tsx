import { IonToolbar, IonButton, IonButtons } from "@ionic/react";
import PageHeaderTitle from "./ToolbarTitle";

const AnonymousToolbar = () => {
  return (
    <IonToolbar className="toolbar" color="warning">
      <PageHeaderTitle />
      <IonButtons slot="primary">
        <IonButton routerLink="/">Начало</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton routerLink="/contacts">Контакти</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton routerLink="/login">Вход</IonButton>
      </IonButtons>
    </IonToolbar>
  )
}

export default AnonymousToolbar;