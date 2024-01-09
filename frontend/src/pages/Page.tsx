import React from 'react';
import { IonPage, IonContent, IonFooter, IonTitle, IonToolbar, IonItem, IonText } from "@ionic/react"
import { MainContainer } from '../components';

type Props = {
  children: React.ReactNode
};

const Page = ({ children }: Props) => {
  return (
    <IonPage>
      <IonContent id='main-content'>
        <MainContainer>
          {children}
        </MainContainer>
      </IonContent>
      
      {/* <IonFooter translucent={true} className="main ion-padding">
        &copy; 2024 Пчелинът
      </IonFooter> */}
    </IonPage>
  )
}

export default Page;