import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';

interface ModalDialogProps {
  onClose: () => void;
  children: React.ReactNode
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ onClose, children }) => (
  <IonModal isOpen={true}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Modal Content</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {children}
      <IonButton onClick={onClose}>Close Modal</IonButton>
    </IonContent>
  </IonModal>
);