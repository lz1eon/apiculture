import { IonHeader, IonToolbar, IonButton, IonButtons, IonIcon } from "@ionic/react";
import PageHeaderTitle from "./ToolbarTitle";
import { useAuth } from "../../hooks/useAuth";

const UserToolbar = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  }

  return (
      <IonToolbar className="toolbar" color="warning">
        <PageHeaderTitle />
        <IonButtons slot="primary">
          <IonButton routerLink="/apiaries">Пчелини</IonButton>
        </IonButtons>        
        <IonButtons slot="end">
          <IonButton routerLink="/admin">Админ</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton onClick={handleLogout}>Изход</IonButton>
        </IonButtons>
      </IonToolbar>
  )
}

export default UserToolbar;