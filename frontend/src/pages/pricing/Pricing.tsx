import { IonList, IonItem, IonCol, IonGrid, IonRow, IonText } from "@ionic/react"
import MainContainer from "../../components/MainContainer"

export const Pricing = () => {
  return (
    <MainContainer>       
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
    </MainContainer>
  )
}