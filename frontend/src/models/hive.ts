export type Hive = {
    id: string;
    apiary_id: string;
    number: string;
    model: 0;
    type: 0;
    status: '';    
    x: 0;
    y: 0;
}

export const HiveModels = {
    DEFAULT: 0,
    OTHER: 0,
    DADAN_BLAT: 1,
    FARAR: 2,
    LANGSTROTH: 3,
}

export const HiveTypes = {
    DEFAULT: 0,
    BEE_FAMILY: 0,
    NUCLEUS_COLONY: 1,
    SWARM: 2
}