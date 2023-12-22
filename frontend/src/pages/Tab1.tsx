import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { IonList, IonItem, IonInput } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Пчелинът</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput enterkeyhint="search" labelPlacement="stacked" placeholder="">
              <code slot="label">Номер</code>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput enterkeyhint="send" labelPlacement="stacked" placeholder="">
              <code slot="label">Пчелин</code>
            </IonInput>
          </IonItem>
        </IonList>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
