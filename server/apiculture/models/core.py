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
    name: Mapped[str]
    number: Mapped[str] = mapped_column(nullable=True)
    type: Mapped[Optional[int]] = mapped_column(default=ApiaryTypes.IMMOBILE.value)
    hives: Mapped[Optional[List["Hive"]]] = relationship()

    __table_args__ = (
        UniqueConstraint("owner_id", "number"),
        UniqueConstraint("owner_id", "name"),
    )

    def __str__(self):
        return f"Apiary {self.name} ({self.number})"

    def __repr__(self):
        return f"<Apiary: name={self.name}, number={self.number}>"


class Hive(Base):
    __tablename__ = "hive"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    apiary_id: Mapped[int] = mapped_column(ForeignKey("apiary.id"))
    number: Mapped[str]
    model: Mapped[Optional[int]] = mapped_column(default=HiveModels.DADAN_BLAT.value)
    type: Mapped[Optional[int]] = mapped_column(default=HiveTypes.BEE_FAMILY.value)
    status: Mapped[Optional[str]]
    super: Mapped[Optional[bool]] = mapped_column(nullable=True)
    mother: Mapped[bool] = mapped_column(default=True)
    notes: Mapped[Optional[str]] = mapped_column(String(2048), nullable=True)
    x: Mapped[Optional[float]] = mapped_column(default=0.0)
    y: Mapped[Optional[float]] = mapped_column(default=0.0)

    __table_args__ = (UniqueConstraint("apiary_id", "number"),)

    def __str__(self):
        return f"Hive {self.number}"

    def __repr__(self):
        return f"<Hive: number={self.number}>"


class SharedHive(Base):
    __tablename__ = "shared_hive"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    hive_id: Mapped[int] = mapped_column(ForeignKey("hive.id"))
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    recipient_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
