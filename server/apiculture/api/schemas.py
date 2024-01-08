import datetime
from typing import List, Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    admin: bool = False


class UserCreateSchema(BaseModel):
    """
    Used on user registration.
    """

    password: str
    email: str
    first_name: str
    last_name: str
    admin: bool


class UserShareSchema(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    admin: bool | None = False


class UserInDBSchema(UserSchema):
    hashed_password: str


class TokenUserSchema(BaseModel):
    access_token: str
    token_type: str
    refresh_token: Optional[str]
    user: Optional[UserSchema]


class TokenDataSchema(BaseModel):
    username: str | None = None


class HiveBaseSchema(BaseModel):
    number: str
    apiary_id: int
    model: int | None = None
    type: int | None = None
    strength: int | None = None
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
    strength: Optional[int] = None
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
        from_attributes = True


class HivePublicSchema(BaseModel):
    number: str
    model: int | None = None
    type: int | None = None
    strength: int | None = None
    mother: bool | None = True
    brood: bool | None = False
    super: bool | None = False


class SharedHiveSchema(BaseModel):
    owner: UserShareSchema
    recipients: list[UserShareSchema]
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
        from_attributes = True
