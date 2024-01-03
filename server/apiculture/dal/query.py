from sqlalchemy.orm import Session

from apiculture.models.core import Apiary, Hive, User, SharedHive

PAGE_SIZE = 100


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_apiary(db: Session, user, apiary_id: int):
    # TODO: use Joins to get all hives for all apiaries at once
    return (
        db.query(Apiary)
        .filter(Apiary.id == apiary_id)
        .filter(Apiary.owner_id == user.id)
        .first()
    )


def get_apiaries(db: Session, user, skip: int = 0, limit: int = PAGE_SIZE):
    return (
        db.query(Apiary)
        .filter(Apiary.owner_id == user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_apiaries_count(db: Session):
    return db.query(Apiary).count()


def get_hive(db: Session, hive_id: int):
    return db.query(Hive).filter(Hive.id == hive_id).first()


def get_hives(
    db: Session, user, apiary_id: int = None, skip: int = 0, limit: int = PAGE_SIZE
):
    if not apiary_id:
        hives = db.query(Hive).offset(skip).limit(limit).all()
    else:
        hives = (
            db.query(Hive)
            .where(Apiary.owner_id == user.id)
            .where(Hive.apiary_id == apiary_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    return hives


def get_my_shared_hives(db: Session, user: User):
    hives = (
        db.query(Hive)
        .where(Hive.owner_id == user.id)
        .where(Hive.id == SharedHive.hive_id)
    )
    return hives


def get_hives_shared_with_me(db: Session, user: User):
    hives = (
        db.query(Hive)
        .where(Hive.id == SharedHive.hive_id)
        .where(SharedHive.recipient_id == user.id)
    )
    return hives


def get_all_hives_count(db: Session):
    return db.query(Hive).count()
