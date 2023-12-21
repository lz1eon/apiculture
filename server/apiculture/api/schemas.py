import datetime
from typing import List

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None


class UserCreateSchema(BaseModel):
    """
    Used on user registration.
    """

    password: str
    email: str
    first_name: str
    last_name: str


class UserInDBSchema(UserSchema):
    hashed_password: str


class TokenUserSchema(BaseModel):
    access_token: str
    token_type: str
    user: UserSchema


class TokenDataSchema(BaseModel):
    username: str | None = None


class HiveBaseSchema(BaseModel):
    number: str
    apiary_id: int
    model: int | None = None
    type: int | None = None
    status: str | None = None


class HiveCreateSchema(HiveBaseSchema):
    pass


class HiveSchema(HiveBaseSchema):
    id: int
    x: int = 0
    y: int = 0
    created_datetime: datetime.datetime | None = None
    updated_datetime: datetime.datetime | None = None

    class Config:
        orm_mode = True


class ApiaryBaseSchema(BaseModel):
    name: str
    number: str
    type: int | None = None


class ApiaryCreateSchema(ApiaryBaseSchema):
    pass


class ApiarySchema(ApiaryBaseSchema):
    id: int
    hives: List[HiveSchema] = []
    created_datetime: datetime.datetime | None = None
    updated_datetime: datetime.datetime | None = None

    class Config:
        orm_mode = True
