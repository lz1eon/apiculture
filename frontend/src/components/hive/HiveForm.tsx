import { IonButton, IonInput, IonItem } from '@ionic/react';

import { useState } from 'react';
import client from '../../api';
import { useGeneralInfo } from '../../hooks/useGeneralInfo';
import { 
  Hive,
  HiveModels,
  HiveModelsLabels,
  HiveStrengths,
  HiveStrengthsLabels,
  HiveTypes,
  HiveTypesLabels 
} from '../../models';

import { ApiSelect } from '../inputs/ApiSelect';

type HiveFormProps = {
  hive: Hive,
  openMode: 'view' | 'edit' | 'create',
  onCreateSuccess: (hive: Hive) => void
  onUpdateSuccess: (hive: Hive) => void
}

export const HiveForm = ({ hive, openMode, onCreateSuccess, onUpdateSuccess}: HiveFormProps) => {
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(openMode);
  const [inputs, setInputs] = useState({
    number: hive.number,
    apiary_id: hive.apiary_id,
    type: hive.type,
    model: hive.model,
    strength: hive.strength
  });
  const { apiaries } = useGeneralInfo();
  const apiaryName = apiaries.find((a) => a.id === hive.apiary_id)!.name;

  const setModeView = () => setMode('view');
  const setModeEdit = () => setMode('edit');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const shouldUpdate = hive.id ? true : false;

    if (shouldUpdate) {
      client.updateHive(Number(hive.id), hive.apiary_id, inputs)
        .then((response) => {
          console.log(inputs)
          setMode('view');
          hive.type = inputs.type;
          hive.model = inputs.model;
          hive.strength = inputs.strength;
          onUpdateSuccess({...hive});
        })
        .catch((error) => {
        });
    } else {
      client.createHive(hive.apiary_id, inputs)
        .then((response) => {
          setMode('view');
          onCreateSuccess(response.data);
        })
        .catch((error) => {
        });
    }
  }

  const handleChange = (event: any) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const handleShareHive = (event: any) => {
    // client.shareHive(hive.apiary_id, hive.id)
  }

  return (
    <form className='ion-padding' onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          name="number"
          value={inputs.number}
          label="Номер"
          labelPlacement="stacked"
          onIonInput={handleChange}
          disabled={mode !== 'create'} 
        />
      </IonItem>
      <IonItem>
        <IonInput
          name="apiary_id"
          value={apiaryName}
          label="Пчелин"
          labelPlacement="stacked"
          disabled={true}
        />
      </IonItem>

      <IonItem>
        <ApiSelect
          name="type"
          value={inputs.type}
          type={HiveTypes}
          option_labels={HiveTypesLabels}
          label="Вид"
          labelPlacement='stacked'
          disabled={mode === 'view'}
          onIonChange={handleChange}
        />
      </IonItem>
      <IonItem>
        <ApiSelect
          name="model"
          value={inputs.model}
          type={HiveModels}
          option_labels={HiveModelsLabels}
          label="Модел"
          labelPlacement='stacked'
          disabled={mode === 'view'}
          onIonChange={handleChange}
          />
      </IonItem>
      <IonItem>
        <ApiSelect
          name="strength"
          value={inputs.strength}          
          type={HiveStrengths}
          option_labels={HiveStrengthsLabels}
          label='Сила'
          labelPlacement="stacked"
          aria-label='Сила'
          onIonChange={handleChange}
          disabled={mode === 'view'}
        />
      </IonItem>
      {mode === 'view' &&
        <IonButton className="ion-margin-top" onClick={setModeEdit}>
          Промени
        </IonButton>
      }
      {mode === 'view' &&
        <IonButton 
          className="ion-margin-top" 
          fill='outline' 
          style={{float: 'right'}}
        >
          Сподели
        </IonButton>
      }
      {(mode === 'edit' || mode === 'create') &&
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

HiveForm.defaultProps = {
  openMode: 'view',
  onCreateSuccess: () => {},
  onUpdateSuccess: () => {}
}



