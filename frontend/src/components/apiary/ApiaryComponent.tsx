import { IonCard, IonCardContent, IonText, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import { Apiary } from '../../models';

type ApiaryComponentProps = {
  apiary: Apiary
}

export const ApiaryComponent = ({apiary}: ApiaryComponentProps) => {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{apiary.name}</IonCardTitle>
          <IonCardSubtitle>{apiary.number}</IonCardSubtitle>
          <IonText style={{ marginTop: '10px', marginBottom: '20px', height: '20px' }}>
            <span>{apiary.type == 1 ? 'Подвижен' : ' '}</span>
          </IonText>          
        </IonCardHeader>
        <IonCardContent>          
          <p><IonText color="text.secondary">{apiary.hives.length} кошера</IonText></p>          
          <p><IonText>Последна проверка: 08.09.20023</IonText></p>
        </IonCardContent>
      </IonCard>
    );
}