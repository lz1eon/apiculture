import { IonButton, IonIcon, IonImg, IonItem, IonList, IonText } from '@ionic/react';
import drone from '../../assets/images/drone_3.jpg';
import { useState } from 'react';
import { close } from 'ionicons/icons';


export type ActionItem = {
  text: string;
  action: () => void;
}

type DroneProps = {
  advices?: ActionItem[];
  selectedHivesCount: number;
}


export const Drone = ({ advices = [], selectedHivesCount = 0 }: DroneProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDroneContent = () => {
    setIsOpen(!isOpen);
  }

  const closeDroneContent = () => {
    setIsOpen(false);
  }

  return (
    <div className={`apis-drone-box ${isOpen ? 'apis-open' : ''} ion-padding`}>
      <IonImg
        src={drone}
        title='Кликни за съвет'
        className={`apis-drone-img ${advices.length && selectedHivesCount ? 'apis-active' : ''}`}
        draggable={false}
        onClick={toggleDroneContent}
      >
      </IonImg>

    {isOpen ?
      <IonIcon
        src={close}
        size='medium'
        className='apis-icon-close'
        onClick={closeDroneContent}
      ></IonIcon> : ''
    }

      <div className={`apis-drone-content ${isOpen ? 'apis-open' : ''}`}>
        {advices.length > 0 && selectedHivesCount ? (
          <p>
            <IonText>Търтеят предлага:</IonText>
            <IonList lines='none' className='ion-no-padding'>
              {advices?.map((advice, i) => {
                return (
                  <IonItem key={i}>
                    <IonButton size="small" fill="clear" color='secondary'>{advice.text}</IonButton>
                  </IonItem>
                )
              })}
            </IonList>
          </p>
        ) : (<IonText color="medium">В момента нямам съвети за теб.</IonText>)
        }
      </div>
    </div>
  )
}