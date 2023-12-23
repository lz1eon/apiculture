import { IonHeader, IonToolbar, IonButton, IonButtons, IonIcon } from "@ionic/react";
import PageHeaderTitle from "./ToolbarTitle";

const UserToolbar = () => {
  return (
      <IonToolbar>
        <PageHeaderTitle />
        <IonButtons slot="start">
          <IonButton routerLink="/apiaries">Пчелини</IonButton>
        </IonButtons>        
        <IonButtons slot="start">
          <IonButton routerLink="/hives">Кошери</IonButton>
        </IonButtons>        
        <IonButtons slot="start">
          <IonButton routerLink="/mothers">Майки</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton routerLink="/logout">Изход</IonButton>
        </IonButtons>
      </IonToolbar>
  )
}

export default UserToolbar;