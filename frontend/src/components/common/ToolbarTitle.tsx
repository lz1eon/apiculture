import { IonButtons, IonButton, IonText } from "@ionic/react";
import logo from '../../assets/images/logo.png'
import '../../theme/main.css';

const ToolbarTitle = () => {
  return (
    <IonButtons slot="start" class="toolbar-title">
      <IonButton disabled>
        <img src={logo}></img>
      </IonButton>
      <IonButton size="large" disabled={true}>Пчелинът</IonButton>
    </IonButtons>
  )
}

export default ToolbarTitle;