import { Apiary } from "./apiary";

export type Hive = {
  id: string | undefined;
  apiary_id: string;
  number: string;
  model: number;
  type: number;
  status: string;
  x: number;
  y: number;
}

export const HiveTypes = {
  BEE_FAMILY: 0,
  NUCLEUS_COLONY: 1,
  SWARM: 2
}

export const HiveTypesLabels = {
  BEE_FAMILY: 'Пчелно семейство',
  NUCLEUS_COLONY: 'Отводка',
  SWARM: 'Рояк'
}

export const HiveModels = {
  OTHER: 0,
  DADAN_BLAT: 1,
  FARAR: 2,
  LANGSTROTH: 3,
}

export const HiveModelsLabels = {
  OTHER: 'Друг',
  DADAN_BLAT: 'Дадан-Блат',
  FARAR: 'Фарар',
  LANGSTROTH: 'Лангстроут',
}


export const emptyHive = (apiary: Apiary): Hive => {
  return {
    id: undefined,
    number: '',
    apiary_id: apiary.id!,
    type: HiveTypes.BEE_FAMILY,
    model: HiveModels.DADAN_BLAT,
    status: '',
    x: 0,
    y: 0
  }
};