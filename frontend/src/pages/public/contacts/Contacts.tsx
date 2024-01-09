import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonText } from "@ionic/react"
import Page from '../../Page';
import { call, mail, phoneLandscape } from "ionicons/icons";

export const Contacts = () => {
  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <h2>"Пчелинът" ("Apiarium")</h2>
                </IonCardTitle>
                <IonCardSubtitle>
                  <h3>Разработка и собственост на "Апиариум" ЕООД</h3>
                </IonCardSubtitle>
                <IonCardSubtitle>
                  <h3><IonText>За контакти:</IonText></h3>
                  <h2><IonText>Александър Стефанов</IonText></h2>
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow><IonCol></IonCol></IonRow>
                  <IonRow>
                    <IonCol>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonIcon size="large" src={mail} />
                    </IonCol>
                    <IonCol>
                      <IonIcon size="large" src={call} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonText>stefanov.alexandre@gmail.com</IonText>
                    </IonCol>
                    <IonCol>
                      <IonText>(+359) 887150809</IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow></IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </Page>

  )
}