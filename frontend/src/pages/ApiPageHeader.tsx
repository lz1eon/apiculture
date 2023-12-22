import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons } from "@ionic/react";

const ApiPageHeader = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Пчелинът</IonTitle>
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