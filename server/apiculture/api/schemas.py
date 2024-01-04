import datetime
from typing import List, Optional

from pydantic import BaseModel, Field

from apiculture.models import Hive, User


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


class UserShareSchema(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None


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
    mother: bool | None = True
    brood: bool | None = False
    super: bool | None = False
    shared: bool | None = False


class HiveCreateSchema(HiveBaseSchema):
    pass


class HiveUpdateSchema(BaseModel):
    number: Optional[str] = None
    model: Optional[int] = None
    type: Optional[int] = None
    status: Optional[str] = None
    mother: Optional[bool] = True
    brood: Optional[bool] = False
    super: Optional[bool] = False
    shared: Optional[bool] = False
    x: Optional[float] = 0.0
    y: Optional[float] = 0.0


class HiveSchema(HiveBaseSchema):
    id: int
    x: float = 0.0
    y: float = 0.0
    created_datetime: datetime.datetime | None = None
    updated_datetime: datetime.datetime | None = None

    class Config:
        orm_mode = True


class HivePublicSchema(BaseModel):
    number: str
    model: int | None = None
    type: int | None = None
    status: str | None = None
    mother: bool | None = True
    brood: bool | None = False
    super: bool | None = False


class SharedHiveSchema(BaseModel):
    owner: UserShareSchema
    recipient: UserShareSchema
    hive: HivePublicSchema


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
