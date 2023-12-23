import { IonButtons, IonButton } from "@ionic/react";
import logo from '../../assets/images/logo.png'

const ToolbarTitle = () => {
  return (
    <IonButtons slot="start">
      <IonButton disabled>
        <img src={logo}></img>
      </IonButton>
      <IonButton size="large" fill="clear" routerLink="/">Пчелинът</IonButton>
    </IonButtons>
  )
}

export default ToolbarTitle;