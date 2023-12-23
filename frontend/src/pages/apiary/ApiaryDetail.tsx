import { IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import { MainContainer } from '../../components/common/MainContainer';
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
    <MainContainer>
      <IonText style={{ marginTop: '10px', marginBottom: '20px' }}>
        {apiary.name}  {apiary.type == 1 ? 'Подвижен' : ''}
      </IonText>

      <ApiaryPlan apiary={apiary} />
    </MainContainer>
  )
}