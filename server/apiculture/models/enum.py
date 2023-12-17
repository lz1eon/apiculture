from enum import Enum


class CommonEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((item.value, item.name) for item in cls)


class ApiaryTypes(CommonEnum):
    IMMOBILE = 1
    MOBILE = 2


class HiveModels(CommonEnum):
    OTHER = 1
    DADAN_BLAT = 2
    FARAR = 3
    LANGSTROTH = 4


class HiveTypes(CommonEnum):
    BEE_FAMILY = 1
    NUCLEUS_COLONY = 2
    SWARD = 3
