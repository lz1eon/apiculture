import { IonGrid, IonLabel, IonRow } from "@ionic/react"
import MainContainer from "../../components/MainContainer"


export const Contacts = () => {
  return (
    <MainContainer>
      <IonGrid>
        <IonRow>                        
         <IonLabel>За връзка с нас</IonLabel>
        </IonRow>   
        <IonRow>   
          <IonLabel>Пишете ни на stefanov.alexandre@gmail.com</IonLabel>
        </IonRow>
      </IonGrid>
    </MainContainer>

  )
}