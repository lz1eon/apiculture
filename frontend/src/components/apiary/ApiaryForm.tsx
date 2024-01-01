import { InputCustomEvent, IonButton, IonInput, IonItem } from '@ionic/react';
import client from '../../api';
import { Apiary, ApiaryTypes, ApiaryTypesLabels } from '../../models';
import { ApiSelect } from '../inputs/ApiSelect';

type ApiaryFormProps = {
  apiary: Apiary
  onFormSuccess?: (apiary: Apiary) => void
}

export const ApiaryForm = ({ apiary, onFormSuccess }: ApiaryFormProps) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    client.createApiary(apiary.number, apiary.name, apiary.type)
      .then((response) => {
        if (onFormSuccess) onFormSuccess(response.data);
      })
      .catch((error) => {
      });
  }

  const handleChangeNumber = (event: InputCustomEvent) => {
    apiary.number = String(event.target.value);
  }

  const handleChangeName = (event: InputCustomEvent) => {
    apiary.name = String(event.target.value);
  }

  return (
    <form className='ion-padding' onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          name="number"
          type="text"
          label="Номер"
          labelPlacement="stacked"
          value={apiary.number}
          onIonInput={handleChangeNumber} 
        />
      </IonItem>
      <IonItem>
        <IonInput
          name="name"
          type="text"
          label="Име"
          labelPlacement="stacked"
          value={apiary.name}
          onIonInput={handleChangeName} 
        />
      </IonItem>

      <IonItem>
        <ApiSelect
          name="type"
          value={apiary.type}
          type={ApiaryTypes}
          option_labels={ApiaryTypesLabels}
          label="Вид"
          labelPlacement='stacked'
        />
      </IonItem>
        <IonButton className="ion-margin-top" type="submit" onClick={handleSubmit}>
          Запази
        </IonButton>
    </form>
  );
}



