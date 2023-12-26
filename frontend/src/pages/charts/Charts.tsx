import { IonCol, IonGrid, IonInput, IonRow, IonText } from '@ionic/react';
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
          <IonCol><IonText><h1>Ценови модел</h1></IonText></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* <form>
              <IonInput label='Групиране' name="bins" /> 
            </form>             */}
          </IonCol>
          <IonCol></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <Histogram width={900} height={450} data={data}></Histogram>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
};