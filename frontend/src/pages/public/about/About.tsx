import { IonList, IonItem, IonCol, IonGrid, IonRow, IonText } from "@ionic/react"
import Page from '../../Page';

export const About = () => {
  return (
    <Page>       
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>            
            <IonText><h3>Как Пчелинът може да Ви бъде полезен:</h3></IonText>
            <IonList inset={true}>
              <IonItem>Бързо и лесно въвеждане на информация от полевата работа</IonItem>
              <IonItem>Споделяне на информация за пчелните семейства с цел онлайн консултация</IonItem>
              <IonItem>Споделяне на информация относно болести и пръскане с инсектициди с другите потребители</IonItem>
            </IonList>
          </IonCol>             
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
}
