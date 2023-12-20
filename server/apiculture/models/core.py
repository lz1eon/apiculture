import datetime
import uuid
from typing import Optional

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    created_datetime: Mapped[Optional[datetime.datetime]]
    updated_datetime: Mapped[Optional[datetime.datetime]]


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str]
    password: Mapped[str]


class Apiary(Base):
    __tablename__ = "apiary"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    number: Mapped[str]
    name: Mapped[str]
    type: Mapped[Optional[int]]


class Hive(Base):
    __tablename__ = "hive"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    number: Mapped[str]
    apiary_id: Mapped[int] = mapped_column(ForeignKey("apiary.id"))
    model: Mapped[Optional[int]]
    type: Mapped[Optional[int]]
    status: Mapped[Optional[str]]

    class Meta:
        unique_together = ("apiary_id", "number")
