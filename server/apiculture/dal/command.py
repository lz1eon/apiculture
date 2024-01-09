from sqlalchemy import update
from sqlalchemy.orm import Session

from apiculture.api import schemas
from apiculture.dal.errors import OwnershipMismatch
from apiculture.models.core import Apiary, Hive, SharedHive, User


def create_user(db: Session, user: schemas.UserCreateSchema):
    db_user = User(
        email=user.email,
        password=user.password,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def connect_users(db: Session, first_id, second_id):
    first, second = db.query(User).where(User.id.in_([first_id, second_id]))
    if second_id not in first.connections:
        first.connections.append(second_id)
        db.add(first)

    if first_id not in second.connections:
        second.connections.append(first_id)
        db.add(second)

    db.commit()


def connect_user(db: Session, first_id, connections=None):
    # TODO: optimize
    connections = connections or []
    for connection in connections:
        connect_users(db, first_id, connection.id)


def create_apiary(db: Session, user, apiary: schemas.ApiaryCreateSchema):
    db_apiary = Apiary(
        owner_id=user.id, number=apiary.number, name=apiary.name, type=apiary.type
    )
    db.add(db_apiary)
    db.commit()
    db.refresh(db_apiary)
    return db_apiary


def create_hive(db: Session, user, apiary_id, hive: schemas.HiveCreateSchema):
    apiary = db.query(Apiary).where(Apiary.owner_id == user.id)
    if not apiary:
        # TODO: If Apiary.owner_id != user.id this is possible hacking attempt.
        raise OwnershipMismatch()

    db_hive = Hive(
        apiary_id=apiary_id,
        owner_id=user.id,
        number=hive.number,
        model=hive.model,
        type=hive.type,
        status=hive.status,
    )
    db.add(db_hive)
    db.commit()
    db.refresh(db_hive)
    return db_hive


def update_hive(db: Session, user, hive_id, hive_update: schemas.HiveUpdateSchema):
    """
    Partially (or fully) update a hive. Make sure the hive is from an apiary of the
    current user and not another.

    :param db:
    :param user:
    :param hive_id:
    :param hive_update: Data with the fields to be updated.
    :return:
    """
    stmt = (
        update(Hive)
        .where(Hive.id == hive_id)
        .where(Apiary.id == Hive.apiary_id)
        .where(Apiary.owner_id == user.id)
        .values(**hive_update.model_dump(exclude_none=True, exclude_unset=True))
    )
    db.execute(stmt)
    db.commit()


def share_hive(db: Session, user, hive_id, recipient):
    shared_hive = SharedHive(
        hive_id=hive_id, owner_id=user.id, recipient_id=recipient.id
    )
    db.add(shared_hive)
    db.commit()
    db.refresh(shared_hive)
    return shared_hive
