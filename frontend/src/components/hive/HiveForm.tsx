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
        <IonLabel position="floating">Номер</IonLabel>
        <IonInput name="number" value={hive.number} onIonInput={handleChange} disabled={true} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Пчелин</IonLabel>
        <IonInput name="apiary_id" value={hive.apiary_id} disabled={true} />
      </IonItem>

      <IonItem>
        <ApiSelect
          type={HiveTypes}
          label="Вид"
          labelPlacement='floating'
          disabled={mode !== 'edit'}
        />
      </IonItem>
      <IonItem>
        <ApiSelect
          type={HiveModels}
          label="Модел"
          labelPlacement='floating'
          // onIonChange={handleChange}
          disabled={mode !== 'edit'}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Сила</IonLabel>
        <IonInput name="status" onIonInput={handleChange} disabled={mode !== 'edit'} />
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

  {/* <form onSubmit={handleSubmit}>
        <div className={'my-3'}>  
          <FormControl defaultValue={hive.number} required>
            <Label>Номер</Label>
            <StyledInput placeholder=""  />
            <HelperText />
          </FormControl>
        </div>

        <div className={'my-3'}>  
          <FormControl defaultValue="" value={hive.apiary_id} required>
            <Label>Пчелин</Label>
            <StyledInput placeholder="" />
            <HelperText />
          </FormControl>
        </div>

        <div className={'my-3'}>  
          <FormControl defaultValue="">
            <Label>Сила</Label>
            <StyledInput placeholder="" />
            <HelperText />
          </FormControl>
        </div>

        <div className={'my-3'}>  
          <FormControl defaultValue="">
            <Label>Модел</Label>
            <StyledInput placeholder="" />
            <HelperText />
          </FormControl>
        </div>

        <div className={'my-3'}>  
          <FormControl defaultValue="">
            <Label>Вид</Label>
            <StyledInput placeholder="" />
            <HelperText />
          </FormControl>
        </div>

        <div className={'flex justify-end mt-6'}>
            <IonButton  type={'submit'} className={'py-3 btn-primary'}>
                Промени
            </IonButton>
        </div>
      </form> */}
}



