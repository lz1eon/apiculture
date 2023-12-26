import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { Histogram } from '../../components';
import Page from '../Page';
import data from '../../components/charts/apiaries';
// import { data } from '../../components/charts/dataset';


export const Charts = () => {

  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol><IonText><h1>Планиране</h1></IonText></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <Histogram width={900} height={500} data={data}></Histogram>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
};