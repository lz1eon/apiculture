import { InputCustomEvent, IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

import { useState } from 'react';
import { useGeneralInfo } from '../../hooks/useGeneralInfo';
import { Hive, HiveTypes, HiveModels } from '../../models';
import { ApiSelect } from '../inputs/ApiSelect';
import client from '../../api';

type HiveFormProps = {
  hive: Hive
}

export const HiveForm = ({ hive }: HiveFormProps) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [inputs, setInputs] = useState({
    number: '',
    apiary_id: '',
    type: '',
    model: '',
    status: ''
  });

  const setModeView = () => setMode('view');
  const setModeEdit = () => setMode('edit');


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    client.updateHive(Number(hive.id), hive.apiary_id, inputs)
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  const handleChange = (event: InputCustomEvent) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form className='ion-padding' onSubmit={handleSubmit}>
      <IonItem>
        <IonInput name="number" label="Номер" labelPlacement="stacked" value={hive.number} onIonInput={handleChange} disabled={true} />
      </IonItem>
      <IonItem>
        <IonInput name="apiary_id" label="Пчелин" labelPlacement="stacked" value={hive.apiary_id} disabled={true} />
      </IonItem>

      <IonItem>
        <ApiSelect
          name="type"
          value={hive.type}
          type={HiveTypes}
          label="Вид"
          labelPlacement='stacked'
          disabled={mode !== 'edit'}
        />
      </IonItem>
      <IonItem>
        <ApiSelect
          name="model"
          value={hive.model}
          type={HiveModels}
          label="Модел"
          labelPlacement='stacked'
          // onIonChange={handleChange}
          disabled={mode !== 'edit'}
        />
      </IonItem>
      <IonItem>
        <IonInput name="status" label='Сила' labelPlacement="stacked" aria-label='Сила' onIonInput={handleChange} disabled={mode !== 'edit'} />
      </IonItem>
      {mode === 'view' &&
        <IonButton className="ion-margin-top" onClick={setModeEdit}>
          Промени
        </IonButton>
      }
      {mode === 'edit' &&
        <IonButton className="ion-margin-top" type="submit" onClick={handleSubmit}>
          Запази
        </IonButton>
      }
      {mode === 'edit' &&
        <IonButton className="ion-margin-top" fill='outline' onClick={setModeView}>
          Откажи
        </IonButton>
      }
    </form>
  );
}



