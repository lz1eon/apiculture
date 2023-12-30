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
    DEFAULT: 0,
    IMMOBILE: 0,
    MOBILE: 1
}
