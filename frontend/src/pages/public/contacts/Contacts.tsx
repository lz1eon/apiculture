import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react"
import Page from '../../Page';


export const Contacts = () => {
  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h3>Контакти</h3></IonText>
            <IonLabel>Електронна поща: <a href="mailto:stefanov.alexandre@gmail.com">stefanov.alexandre@gmail.com</a></IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonLabel>Телефон: +359887150809</IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
      </IonGrid>
    </Page>

  )
}