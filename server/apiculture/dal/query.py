from sqlalchemy import func
from sqlalchemy.orm import Session

from apiculture.api.schemas import (
    SharedHiveSchema,
    UserShareSchema,
    HiveSchema,
    HivePublicSchema,
)
from apiculture.models.core import Apiary, Hive, SharedHive, User, SharedHiveComment

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
    # TODO: optimize loops and the whole function
    shared_hive_items = {}

    shared_hives_query = list(
        db.query(Hive, SharedHive.id, User)
        .where(Hive.owner_id == user.id)
        .where(SharedHive.active.is_(True))
        .where(Hive.id == SharedHive.hive_id)
        .where(SharedHive.recipient_id == User.id)
        .order_by(SharedHive.recipient_id, Hive.number)
    )

    shared_hive_ids = set()
    for hive, shared_hive_id, recipient in shared_hives_query:
        shared_hive_ids.add(shared_hive_id)
        shared_hive_items.setdefault(hive.id, SharedHiveSchema(
            hive=HivePublicSchema(**hive.to_dict()),
            owner=UserShareSchema(**user.to_dict()),
            recipients=[],
            comments=[],
        ))
        shared_hive_items[hive.id].recipients.append(recipient)

    comments = (
        db.query(SharedHiveComment, SharedHive, User)
        .where(SharedHiveComment.shared_hive_id.in_(shared_hive_ids))
        .where(SharedHiveComment.commentator_id == User.id)
        .order_by(SharedHiveComment.created_datetime.asc())
    )

    # distribute comments to hives
    for comment, shared_hive, commentator in comments:
        if shared_hive.id == comment.shared_hive_id:
            comment.commentator = UserShareSchema(**commentator.to_dict())
            shared_hive_items[shared_hive.hive_id].comments.append(comment)

    return shared_hive_items.values()


def get_hives_shared_with_me(db: Session, user: User):
    shared_hive_items = []

    shared_hives_query = (
        db.query(Hive, User, SharedHive)
        .where(SharedHive.active.is_(True))
        .where(Hive.id == SharedHive.hive_id)
        .where(SharedHive.recipient_id == user.id)
        .where(User.id == SharedHive.owner_id)
        .order_by(SharedHive.recipient_id, Hive.number)
    )

    shared_hive_ids = [shared_hive.id for _, _, shared_hive in shared_hives_query]
    comments = (
        db.query(SharedHiveComment, User)
        .where(SharedHiveComment.shared_hive_id.in_(shared_hive_ids))
        .where(SharedHiveComment.commentator_id == User.id)
        .order_by(SharedHiveComment.created_datetime.asc())
    )

    for hive, owner, shared_hive in shared_hives_query:
        shared_hive_item = SharedHiveSchema(
            hive=HivePublicSchema(**hive.to_dict()),
            owner=UserShareSchema(**owner.to_dict()),
            recipients=[UserShareSchema(**user.to_dict())],
            comments=[]
        )

        # distribute comments to hives
        for comment, commentator in comments:
            if shared_hive.id == comment.shared_hive_id:
                comment.commentator = UserShareSchema(**commentator.to_dict())
                shared_hive_item.comments.append(comment)

        shared_hive_items.append(shared_hive_item)

    return shared_hive_items


def get_all_hives_count(db: Session):
    return db.query(Hive).count()
