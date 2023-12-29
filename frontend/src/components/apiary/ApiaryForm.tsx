import { InputCustomEvent, IonButton, IonInput, IonItem } from '@ionic/react';
import client from '../../api';
import { Apiary, ApiaryTypes } from '../../models';
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

  const handleChange = (event: InputCustomEvent) => {
    apiary[event.target.name] = event.target.value
  }

  return (
    <form className='ion-padding' onSubmit={handleSubmit}>
      <IonItem>
        <IonInput name="number" label="Номер" labelPlacement="stacked" value={apiary.number} onIonInput={handleChange} />
      </IonItem>
      <IonItem>
        <IonInput name="name" label="Име" labelPlacement="stacked" value={apiary.name} onIonInput={handleChange} />
      </IonItem>

      <IonItem>
        <ApiSelect
          name="type"
          value={apiary.type}
          type={ApiaryTypes}
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



