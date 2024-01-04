import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import beemother from '../../assets/images/beemother.png';
import brood from '../../assets/images/brood.jpg';
import frame from '../../assets/images/frame.jpg';
import superImg from '../../assets/images/super.jpg';
import { 
  HiveModelsInverted, 
  HiveModelsLabels, 
  HiveTypesInverted, 
  HiveTypesLabels, 
  SharedHive 
} from "../../models";

type HiveComponentProps = {
  sharedHive: SharedHive;
};

export const HiveComponent = ({ sharedHive }: HiveComponentProps) => {
  const {hive, owner, recipient} = sharedHive;
  
  function openHive() {
    console.log('open')
  }
  
  return (
    <IonCard className="hive-card" onClick={openHive}>
      <IonCardHeader>
        <IonCardTitle>Кошер {hive.number}</IonCardTitle>
        <IonCardSubtitle>Споделил: <b>{owner.first_name} {owner.last_name}</b></IonCardSubtitle>
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