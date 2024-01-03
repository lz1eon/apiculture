import { IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalDialog } from '../../components';
import client from '../../api';
import imgPlus from '../../assets/plus-icon.svg';
import { ApiaryComponent } from '../../components/apiary/ApiaryComponent';
import { ApiaryForm } from '../../components/apiary/ApiaryForm';
import { useGeneralInfo } from '../../hooks/useGeneralInfo';
import Page from '../Page';
import { Apiary, emptyApiary } from '../../models';


export const ApiaryList = () => {
  const { apiaries, setApiaries } = useGeneralInfo();
  const [showModal, setShowModal] = useState(false);
  const apiary: Apiary = emptyApiary();


  function onFormSuccess(apiary: Apiary) {
    setApiaries([...apiaries, apiary]);
    setShowModal(false);
  }

  return (
    <Page>
      { showModal && 
        <ModalDialog isOpen={showModal} title={`Нов пчелин`} onClose={() => setShowModal(false)}>
          <ApiaryForm apiary={apiary} onFormSuccess={onFormSuccess}/>
        </ModalDialog>
      }

      <IonText style={{ marginBottom: '20px' }}><h1>Пчелини</h1></IonText>
      <IonGrid>
        <IonRow>
          {apiaries.map((apiary) => (
            <IonCol size="4" key={apiary.id}>
              <Link to={`/apiaries/${apiary.id}`}>
                <ApiaryComponent key={apiary.id} apiary={apiary} />
              </Link>
            </IonCol>
          ))}
          <IonCol size="4">
            <IonCard>
              <IonCardContent>
                <IonImg 
                  src={imgPlus} 
                  title='Добави Пчелин' 
                  className='add-apiary-plus-icon'
                  onClick={() => setShowModal(true)} 
                ></IonImg>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
}