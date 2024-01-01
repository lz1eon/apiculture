import React, { useRef } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core';

interface ModalDialogProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ onClose, isOpen, title, children }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  
  function onDidDismiss(ev: CustomEvent<OverlayEventDetail>) {
    onClose();
  }

  return (
  <IonModal ref={modal} isOpen={isOpen} onDidDismiss={() => {onClose()}}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {children}
    </IonContent>
    <IonButton onClick={onClose}>Затвори</IonButton>
  </IonModal>
)};