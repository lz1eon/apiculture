import { MainContainer } from '../../components';
import { IonText, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import mainImage from '../../assets/images/bee.jpg';
import './home.css';

export const Home = () => {
  return (  
    <MainContainer>
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
    </MainContainer>
  )
};