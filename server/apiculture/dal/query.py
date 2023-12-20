from uuid import UUID

from sqlalchemy.orm import Session

from apiculture.models.core import Apiary, Hive, User

PAGE_SIZE = 100


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_apiary(db: Session, apiary_id: int):
    return db.query(Apiary).filter(Apiary.id == apiary_id).first()


def get_apiaries(db: Session, skip: int = 0, limit: int = PAGE_SIZE):
    return db.query(Apiary).offset(skip).limit(limit).all()


def get_apiaries_count(db: Session):
    return db.query(Apiary).count()


def get_hive(db: Session, hive_id: int):
    return db.query(Hive).filter(Hive.id == hive_id).first()


def get_hives(
    db: Session, apiary_id: int = None, skip: int = 0, limit: int = PAGE_SIZE
):
    if not apiary_id:
        hives = db.query(Hive).offset(skip).limit(limit).all()
    else:
        hives = (
            db.query(Hive)
            .where(Hive.apiary_id == apiary_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    return hives


def get_all_hives_count(db: Session):
    return db.query(Hive).count()
