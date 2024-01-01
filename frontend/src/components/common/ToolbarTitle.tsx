import { IonButtons, IonButton, IonText, IonLabel } from "@ionic/react";
import logo from '../../assets/images/logo.png'
import '../../theme/main.css';

const ToolbarTitle = () => {
  return (
    <IonButtons slot="start" class="toolbar-title">
      <IonButton disabled>
        <img src={logo} width="36px" height="36px"></img>
      </IonButton>
      <IonLabel className="logo-label">Пчелинът</IonLabel>
    </IonButtons>
  )
}

export default ToolbarTitle;