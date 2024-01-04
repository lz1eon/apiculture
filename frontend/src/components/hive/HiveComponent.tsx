import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";
import { Hive, HiveModelsInverted, HiveModelsLabels, HiveTypesInverted, HiveTypesLabels } from "../../models";
import frame from '../../assets/images/frame.jpg';
import beemother from '../../assets/images/beemother.png';
import brood from '../../assets/images/brood.jpg';
import superImg from '../../assets/images/super.jpg';

type HiveComponentProps = {
  hive: Hive
};


export const HiveComponent = ({ hive }: HiveComponentProps) => {
  
  function openHive() {
    console.log('open')
  }
  
  return (
    <IonCard className="hive-card" onClick={openHive}>
      <IonCardHeader>
        <IonCardTitle>Кошер {hive.number}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText>
                {HiveTypesLabels[HiveTypesInverted[hive.type]]}
              </IonText>
            </IonCol>

            <IonCol>
              <IonText>
                {HiveModelsLabels[HiveModelsInverted[hive.model]]}
              </IonText>
            </IonCol>

            {/* <IonCol>
              <IonText>
                {hive.status}
              </IonText>
            </IonCol> */}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonImg
                src={frame}
                title="брой рамки"
                className="apis-hive-card-status-icon"
              ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={beemother}
                title="майка"
                className={`apis-hive-card-status-icon ${!hive.mother ? 'apis-null': ''}`}
                ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={brood}
                title="пило"
                className={`apis-hive-card-status-icon ${!hive.brood ? 'apis-null': ''}`}
              ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={superImg}
                title="магазин"
                className={`apis-hive-card-status-icon ${!hive.super ? 'apis-null': ''}`}
              ></IonImg>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonCardContent>
    </IonCard>
  );
}