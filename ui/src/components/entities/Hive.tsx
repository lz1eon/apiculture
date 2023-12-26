import { FormControl } from '@mui/base/FormControl';
import Button from '@mui/material/Button';
import { Hive as HiveModel } from '../../models/hive';
import { Label } from '../form/Label';
import { StyledInput } from '../form/StyledInput';
import HelperText from '../form/HelperText';
import { IonButton, IonDatetime } from '@ionic/react';


export const Hive = (hive: HiveModel) => {
    const handleSubmit = () => {}
    const handleChange = () => {}

    return (
      <>
      
      <form onSubmit={handleSubmit}>
        
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
            <IonButton  type={'submit'} className={'py-3 btn-primary'} variant='contained'>
                Промени
            </IonButton>
        </div>
      </form>
      </>
    );
}



