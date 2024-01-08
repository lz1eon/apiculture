import { IonButton, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import mainImage from '../../../assets/images/bee.jpg';
import Page from '../../Page';
import './home.css';

export const Home = () => {
  const { isAuthReady, user } = useAuth();

  return !isAuthReady ? '' : (
    user ? <Redirect to='/apiaries' /> : (
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
            <IonCol><IonButton routerLink='/login'>Вход</IonButton></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </Page>
    )
  )
};