import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';

interface ModalDialogProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ onClose, title, children }) => (
  <IonModal isOpen={true}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {children}
    </IonContent>
    <IonButton fill="clear" onClick={onClose}>Затвори</IonButton>
  </IonModal>
);