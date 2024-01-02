import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonList, IonPopover, IonToolbar } from "@ionic/react";
import { colorPalette, settings } from "ionicons/icons";
import { useAuth } from "../../hooks/useAuth";
import PageHeaderTitle from "./ToolbarTitle";

const UserToolbar = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  }

  return (
      <IonToolbar className="toolbar" color="primary">
        <PageHeaderTitle />
        <IonButtons slot="start">
          <IonButton routerLink="/apiaries">Пчелини</IonButton>
        </IonButtons>        
        <IonButton id="palette-button">
          <IonIcon slot="icon-only" icon={colorPalette}></IonIcon>
        </IonButton>
        <IonButtons slot="end">
          <IonButton routerLink="/admin">Админ</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton><IonIcon slot="icon-only" icon={settings}></IonIcon></IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton onClick={handleLogout}>Изход</IonButton>
        </IonButtons>

        <IonPopover trigger="palette-button" side="left" alignment="start">
          <IonContent class="ion-padding">
            <IonList>
              <IonItem>Зелена</IonItem>
              <IonItem>Синя</IonItem>
              <IonItem>Жълта</IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </IonToolbar>
  )
}

export default UserToolbar;