import { Apiary } from "./apiary";

export type Hive = {
  id: string | undefined;
  apiary_id: string;
  number: string;
  type: number;
  model: number;
  status: string;
  mother: number;
  super: number;
  x: number;
  y: number;
}

interface StringKeys {
  [key: string]: string
}

interface StringKeysNumberValue {
  [key: string]: number
}

export const HiveTypes: StringKeysNumberValue = {
  BEE_FAMILY: 0,
  NUCLEUS_COLONY: 1,
  SWARM: 2
}

export const HiveTypesInverted: StringKeys = {
  '0': 'BEE_FAMILY',
  '1': 'NUCLEUS_COLONY',
  '2': 'SWARM'
}

export const HiveTypesLabels: StringKeys = {
  BEE_FAMILY: 'Пчелно семейство',
  NUCLEUS_COLONY: 'Отводка',
  SWARM: 'Рояк'
}

export const HiveModels: StringKeysNumberValue = {
  OTHER: 0,
  DADAN_BLAT: 1,
  FARAR: 2,
  LANGSTROTH: 3,
}

export const HiveModelsInverted: StringKeys = {
  '0': 'OTHER',
  '1': 'DADAN_BLAT',
  '2': 'FARAR',
  '3': 'LANGSTROTH'
}

export const HiveModelsLabels: StringKeys = {
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