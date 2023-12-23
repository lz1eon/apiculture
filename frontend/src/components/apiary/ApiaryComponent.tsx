import { IonCard, IonCardContent, IonText, IonButton } from "@ionic/react";
import { Apiary } from '../../models';

type ApiaryComponentProps = {
  apiary: Apiary
}

export const ApiaryComponent = ({apiary}: ApiaryComponentProps) => {
    return (
        <IonCard>
        <IonCardContent>
          <IonText color="text.secondary">
            {apiary.number}
          </IonText>
          <IonText>
            {apiary.name}
          </IonText>
          <IonText color="text.secondary">
            {apiary.hives.length} кошера
          </IonText>
          <IonText>
            Предстоящи задачи: 4
            <br/>
            Последна проверка: 08.09.20023
          </IonText>
        </IonCardContent>
        <IonButton size="small">Подбробно</IonButton>
      </IonCard>
    );
}