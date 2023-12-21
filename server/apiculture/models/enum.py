from enum import Enum


class CommonEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((item.value, item.name) for item in cls)


class ApiaryTypes(CommonEnum):
    IMMOBILE = 0
    MOBILE = 1


class HiveModels(CommonEnum):
    OTHER = 0
    DADAN_BLAT = 1
    FARAR = 2
    LANGSTROTH = 3


class HiveTypes(CommonEnum):
    BEE_FAMILY = 0
    NUCLEUS_COLONY = 1
    SWARM = 2
