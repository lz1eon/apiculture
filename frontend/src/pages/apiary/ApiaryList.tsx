import { IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalDialog } from '../../components';
import client from '../../api';
import imgPlus from '../../assets/plus-icon.svg';
import { ApiaryComponent } from '../../components/apiary/ApiaryComponent';
import { ApiaryForm } from '../../components/apiary/ApiaryForm';
import { useGeneralInfo } from '../../hooks/useGeneralInfo';
import Page from '../Page';
import { Apiary, ApiaryTypes } from '../../models';

export const ApiaryList = () => {
  const { apiaries, setApiaries } = useGeneralInfo();
  const [showModal, setShowModal] = useState(false);
  const emptyApiary: Apiary = {number: '', name: '', type: ApiaryTypes.DEFAULT}

  useEffect(() => {
    client.getApiaries()
      .then((response) => {
        setApiaries(response.data);
      });
  }, []);


  function onFormSuccess(apiary: Apiary) {
    setApiaries([...apiaries, apiary])
  }

  return (
    <Page>
      { showModal && 
        <ModalDialog isOpen={showModal} title={`Нов пчелин`} onClose={() => setShowModal(false)}>
          <ApiaryForm apiary={emptyApiary} onFormSuccess={onFormSuccess}/>
        </ModalDialog>
      }

      <IonText style={{ marginBottom: '20px' }}><h1>Пчелини</h1></IonText>
      <IonGrid>
        <IonRow>
          {apiaries.map((apiary) => (
            <IonCol key={apiary.id}>
              <Link to={`/apiaries/${apiary.id}`}>
                <ApiaryComponent key={apiary.id} apiary={apiary} />
              </Link>
            </IonCol>
          ))}
          <IonCol>
            <IonImg 
              src={imgPlus} 
              title='Добави Пчелин' 
              className='add-apiary-plus-icon'
              onClick={() => setShowModal(true)} 
            ></IonImg>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
}