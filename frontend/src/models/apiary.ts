import { Hive } from '.';

export type Apiary = {
    id: string;
    owner_id: string;
    number: string;
    name: string;
    type?: string;
    hives: Hive[];
}

export const ApiaryTypes = {
    IMMOBILE: 0,
    MOBILE: 1
}
