import { Apiary } from "./apiary";
import { User } from "./user";

export type Hive = {
  id: string | undefined;
  apiary_id: string;
  number: string;
  type: number;
  model: number;
  strength: number;
  mother: boolean;
  brood: boolean;
  super: boolean;
  shared: boolean;
  x: number;
  y: number;
}

export type HiveObjectKey = keyof Hive; 


type SharedHiveComment = {
  commentator: User,
  text: string,
  created_datetime: string
}

export type SharedHive = {
  hive: Hive,
  owner: User,
  recipients: User[]
  comments: SharedHiveComment[]
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

export const HiveStrengths: StringKeysNumberValue = {
  WEAK: 0,
  MEDIUM: 1,
  STRONG: 2,
}

export const HiveStrengthsInverted: StringKeys = {
  '0': 'WEAK',
  '1': 'MEDIUM',
  '2': 'STRONG',
}

export const HiveStrengthsLabels: StringKeys = {
  WEAK: 'Слаб',
  MEDIUM: 'Среден',
  STRONG: 'Силен',
}


export const emptyHive = (apiary: Apiary): Hive => {
  return {
    id: undefined,
    number: '',
    apiary_id: apiary.id!,
    type: HiveTypes.BEE_FAMILY,
    model: HiveModels.DADAN_BLAT,
    mother: false,
    brood: false,
    super: false,
    strength: HiveStrengths.MEDIUM,
    shared: false,
    x: 0,
    y: 0
  }
};