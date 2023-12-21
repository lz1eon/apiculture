export interface Hive {
    id: string;
    apiary_id: string;
    number: string;
    model?: string;
    type?: string;
    status?: string;    
    x?: number;
    y?: number;
}

export const HiveModels = {
    OTHER: 0,
    DADAN_BLAT: 1,
    FARAR: 2,
    LANGSTROTH: 3,
}

export const HiveTypes = {
    BEE_FAMILY: 0,
    NUCLEUS_COLONY: 1,
    SWARM: 2
}