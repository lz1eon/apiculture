export interface Apiary {
    id: string;
    owner_id: string;
    number: string;
    name: string;
    type?: string;
}

export const ApiaryTypes = {
    IMMOBILE: 0,
    MOBILE: 1
}
