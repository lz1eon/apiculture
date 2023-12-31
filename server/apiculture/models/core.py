import datetime
from typing import List, Optional

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from apiculture.models.enum import ApiaryTypes, HiveModels, HiveTypes


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

    __table_args__ = (UniqueConstraint("email"),)


class Apiary(Base):
    __tablename__ = "apiary"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    number: Mapped[str]
    name: Mapped[str]
    type: Mapped[Optional[int]] = mapped_column(default=ApiaryTypes.IMMOBILE.value)
    hives: Mapped[Optional[List["Hive"]]] = relationship()


class Hive(Base):
    __tablename__ = "hive"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    number: Mapped[str]
    apiary_id: Mapped[int] = mapped_column(ForeignKey("apiary.id"))
    model: Mapped[Optional[int]] = mapped_column(default=HiveModels.DADAN_BLAT.value)
    type: Mapped[Optional[int]] = mapped_column(default=HiveTypes.BEE_FAMILY.value)
    status: Mapped[Optional[str]]
    x: Mapped[Optional[float]] = mapped_column(default=0.0)
    y: Mapped[Optional[float]] = mapped_column(default=0.0)

    class Meta:
        unique_together = ("apiary_id", "number")
