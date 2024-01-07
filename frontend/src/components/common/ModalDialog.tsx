import React, { useRef } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core';

interface ModalDialogProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  noCloseButton?: boolean;
  onClose: () => void;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, title, noCloseButton = false, children, onClose }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  
  function onDidDismiss(ev: CustomEvent<OverlayEventDetail>) {
    onClose();
  }

  return (
  <IonModal ref={modal} isOpen={isOpen} onDidDismiss={() => {onClose()}}>
    <IonHeader className='modal-header'>
      <IonToolbar color='primary'>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {children}
    </IonContent>
    { !noCloseButton && <IonButton onClick={onClose}>Затвори</IonButton>}
  </IonModal>
)};