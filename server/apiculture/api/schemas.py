import datetime

from pydantic import BaseModel


class ApiaryBase(BaseModel):
    name: str
    number: str
    type: int | None = None


class ApiaryCreate(ApiaryBase):
    pass


class Apiary(ApiaryBase):
    id: int
    created_datetime: datetime.datetime | None = None
    updated_datetime: datetime.datetime | None = None

    class Config:
        orm_mode = True


class HiveBase(BaseModel):
    number: str
    apiary_id: int
    model: int | None = None
    type: int | None = None
    status: str | None = None


class HiveCreate(HiveBase):
    pass


class Hive(HiveBase):
    id: int
    created_datetime: datetime.datetime | None = None
    updated_datetime: datetime.datetime | None = None

    class Config:
        orm_mode = True
