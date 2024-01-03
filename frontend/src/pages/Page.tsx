import React from 'react';
import { IonPage, IonContent } from "@ionic/react"
import { MainContainer } from '../components';

type Props = {
  children: React.ReactNode
};

const Page = ({children}: Props) => {
  return (
    <IonPage>
      <IonContent>
        <MainContainer>
          {children}
        </MainContainer>
      </IonContent>
    </IonPage>
  )
}

export default Page;