import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react"
import { MainContainer } from '../../components';


export const Contacts = () => {
  return (
    <MainContainer>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h3>За връзка с нас</h3></IonText>
            <IonLabel>Пишете ни на <a href="mailto:stefanov.alexandre@gmail.com">stefanov.alexandre@gmail.com</a></IonLabel>
          </IonCol>
          <IonCol></IonCol>                        
        </IonRow>
      </IonGrid>
    </MainContainer>

  )
}