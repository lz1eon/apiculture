import { IonCard, IonCardContent, IonText, IonButton, IonItem, IonLabel, IonCardTitle, IonCardSubtitle, IonCardHeader } from "@ionic/react";
import { Hive, HiveModels, HiveModelsInverted, HiveModelsLabels, HiveTypes, HiveTypesInverted, HiveTypesLabels } from "../../models";
import { ComponentProps } from "react";
import HiveImage from "../../pages/apiary/plan/HiveImage";

type HiveComponentProps = {
  hive: Hive
}; // & ComponentProps;


export const HiveComponent = ({ hive }: HiveComponentProps) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Кошер {hive.number}</IonCardTitle>
        <IonCardSubtitle>
          {HiveModelsLabels[HiveModelsInverted[hive.model]]}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p><IonText color="secondary">
          {HiveTypesLabels[HiveTypesInverted[hive.type]]}
        </IonText></p>
        <IonText>
          {hive.status}
        </IonText>
      </IonCardContent>
    </IonCard>
  );
}