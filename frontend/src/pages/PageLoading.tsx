import React from 'react';
import { IonCol, IonGrid, IonLoading, IonRow, IonText, useIonLoading } from '@ionic/react';
import { useEffect } from 'react';
import mainImage from '../assets/images/bee.jpg';
import Page from './Page';
import './home/home.css';

// type Props = React.ComponentProps<(typeof React.ReactNode)>  & {
type Props = {
  dismissLoading: boolean;
  children: React.ReactNode;
};

export const PageLoading: React.FC<Props> = ({ dismissLoading, children }) => {
  const [present, dismiss] = useIonLoading();
  
  useEffect(() => {
    // console.log('dismissLoading ', dismissLoading);
    if (dismissLoading) {
      dismiss();
    } else {
      present({
        message: "Пчелинът се зарежда ..."
      });
    }
  }, [dismissLoading]);

  return dismissLoading ? children : (  
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol><IonText><h1>Пчелинът</h1></IonText></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol><img src={mainImage} className="main-img" alt="bee" /></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonLoading message="Пчелинът са зарежда ..." />
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>      
    </Page>
  )
};