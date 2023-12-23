import client from '../../api';
import { ApiaryComponent } from '../../components/apiary/ApiaryComponent'; 
import { useEffect, useState } from 'react';
import { IonText, IonList, IonItem } from '@ionic/react';

export const ApiaryList = () => {
  const [apiaries, setApiaries] = useState<any[]>([]);

  useEffect(() => {
    client.getApiaries()
      .then((response) => {
        setApiaries(response.data);
      });
  }, []);

  return (
    <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>
      <IonText style={{marginBottom: '20px'}}>Пчелини</IonText>
      <IonList>
        {apiaries.map((apiary) => (                    
          <IonItem key={apiary.id}>                        
            <a href={`/apiaries/${apiary.id}`}>
              <ApiaryComponent key={apiary.id} apiary={apiary}/>
            </a>
          </IonItem>                    
        ))}
      </IonList>
    </div>        
    )
}