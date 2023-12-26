import { IonList, IonItem, IonCol, IonGrid, IonRow, IonText } from "@ionic/react"
import Page from '../Page';

export const Pricing = () => {
  return (
    <Page>       
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>            
            <IonText><h3>Безплатната версия на Пчелинът включва:</h3></IonText>
            <IonList inset={true}>
              <IonItem>1 потребител</IonItem>
              <IonItem>1 пчелин</IonItem>
              <IonItem>5 кошера</IonItem>
            </IonList>
          </IonCol>             
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
}