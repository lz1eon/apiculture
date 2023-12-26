import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';

interface ModalDialogProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ onClose, isOpen, title, children }) => (
  <IonModal isOpen={isOpen}>
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