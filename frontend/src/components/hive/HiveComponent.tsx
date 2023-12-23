import { IonCard, IonCardContent, IonText, IonButton } from "@ionic/react";
import { Hive } from "../../models";
import { ComponentProps } from "react";

type HiveComponentProps = {
  hive: Hive
}; // & ComponentProps;


export const HiveComponent = ({hive}: HiveComponentProps) => {
    return (
        <IonCard>
        <IonCardContent>
          <IonText color="text.secondary">
            {hive.model}
          </IonText>
          <IonText>
            {hive.number}
          </IonText>
          <IonText color="text.secondary">
            {hive.type}
          </IonText>
          <IonText>
            {hive.status}
            <br/>
            x: {hive.x}
            <br/>
            y: {hive.y}
          </IonText>
        </IonCardContent>
          <IonButton size="small">Редактирай</IonButton>
      </IonCard>
    );
}