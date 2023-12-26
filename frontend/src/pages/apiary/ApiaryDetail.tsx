import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import Page from '../Page';
import { ApiaryPlan } from './plan/ApiaryPlan';

export const ApiaryDetail = () => {
  const { id } = useParams<{id: string}>();
  const [apiary, setApiary] = useState<any>({});

  useEffect(() => {
    client.getApiary(id)
      .then((response) => {
        setApiary(response.data);
      });
  }, []);

  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol><h1><IonText>{apiary.name}</IonText></h1></IonCol>
        </IonRow>
        <IonRow>
          <IonCol><ApiaryPlan apiary={apiary} /></IonCol>
        </IonRow>
      </IonGrid>      
    </Page>
  )
}