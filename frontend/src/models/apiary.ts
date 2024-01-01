import { Hive } from '.';

export type Apiary = {
  id?: string;
  owner_id?: string;
  number: string;
  name: string;
  type: number;
  hives: Hive[];
}

export const ApiaryTypes = {
  IMMOBILE: 0,
  MOBILE: 1
}

export const ApiaryTypesLabels = {
  IMMOBILE: 'Основен',
  MOBILE: 'Подвижен'
}


export const emptyApiary = () => {
  return {
    id: undefined,
    owner_id: undefined,
    number: '',
    name: '',
    type: ApiaryTypes.IMMOBILE,
    hives: []
  }
}