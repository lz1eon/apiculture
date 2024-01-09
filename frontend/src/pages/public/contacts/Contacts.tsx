import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react"
import Page from '../../Page';


export const Contacts = () => {
  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h2>"Пчелинът" ("Apiarium") е разработка и собственост на Апиариум ЕООД</h2></IonText>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h3>За контакти</h3></IonText>
            <IonLabel>Александър Стефанов</IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonLabel><a href="mailto:stefanov.alexandre@gmail.com">stefanov.alexandre@gmail.com</a></IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonLabel>+359887150809</IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
      </IonGrid>
    </Page>

  )
}