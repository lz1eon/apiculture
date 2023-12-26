import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { useEffect } from 'react';
import client from '../../api';
import Page from '../Page';
import { ApiaryComponent } from '../../components/apiary/ApiaryComponent';
import { useGeneralInfo } from '../../hooks/useGeneralInfo';

export const ApiaryList = () => {
  const {apiaries, setApiaries} = useGeneralInfo();

  useEffect(() => {
    client.getApiaries()
      .then((response) => {
        setApiaries(response.data);
      });
  }, []);

  return (
    <Page>
      <IonText style={{marginBottom: '20px'}}><h1>Пчелини</h1></IonText>
      <IonGrid>
        <IonRow>
        {apiaries.map((apiary) => (                    
          <IonCol key={apiary.id}>                        
            <a href={`/apiaries/${apiary.id}`}>
              <ApiaryComponent key={apiary.id} apiary={apiary}/>
            </a>
          </IonCol>                    
        ))}
        </IonRow>
      </IonGrid>
    </Page>        
    )
}