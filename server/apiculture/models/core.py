import datetime
from typing import List, Optional

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from apiculture.models.enum import ApiaryTypes, HiveModels, HiveStrengths, HiveTypes


class Base(DeclarativeBase):
    # __abstract__ = True

    created_datetime: Mapped[Optional[datetime.datetime]]
    updated_datetime: Mapped[Optional[datetime.datetime]]

    def to_dict(self):
        return {field.name: getattr(self, field.name) for field in self.__table__.c}


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str]
    password: Mapped[str]
    admin: Mapped[bool] = mapped_column(nullable=False, default=False)

    __table_args__ = (UniqueConstraint("email"),)

    def __str__(self):
        return f"User: {self.first_name} {self.last_name} ({self.email})"

    def __repr__(self):
        return f"<User: first_name={self.first_name}, last_name={self.last_name}, emali={self.email}>"


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
        return f"Apiary: {self.name} ({self.number})"

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
    strength: Mapped[Optional[str]] = mapped_column(default=HiveStrengths.MEDIUM.value)
    super: Mapped[Optional[bool]] = mapped_column(nullable=True)
    mother: Mapped[bool] = mapped_column(default=True)
    brood: Mapped[bool] = mapped_column(default=False, nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(String(2048), nullable=True)
    x: Mapped[Optional[float]] = mapped_column(default=0.0)
    y: Mapped[Optional[float]] = mapped_column(default=0.0)

    __table_args__ = (UniqueConstraint("apiary_id", "number"),)

    def __str__(self):
        return f"Hive: {self.number}"

    def __repr__(self):
        return f"<Hive: number={self.number}>"


class SharedHive(Base):
    __tablename__ = "shared_hive"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    hive_id: Mapped[int] = mapped_column(ForeignKey("hive.id"))
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    recipient_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def __str__(self):
        return f"SharedHive: [{self.hive_id}] from user ({self.owner_id} to user {self.recipient_id})"

    def __repr__(self):
        return f"<SharedHive: hive_id={self.hive_id}, owner_id={self.owner_id}, recipient_id={self.recipient_id}>"
