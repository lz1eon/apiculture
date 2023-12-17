from sqlalchemy.orm import Session
from apiculture.api import schemas
from apiculture.models.core import Apiary, Hive


def create_apiary(db: Session, apiary: schemas.ApiaryCreate):
    db_apiary = Apiary(number=apiary.number, name=apiary.name, type=apiary.type)
    db.add(db_apiary)
    db.commit()
    db.refresh(db_apiary)
    return db_apiary


def create_hive(db: Session, hive: schemas.HiveCreate):
    db_hive = Hive(
        number=hive.number,
        apiary_id=hive.apiary_id,
        model=hive.model,
        type=hive.type,
        status=hive.status,
    )
    db.add(db_hive)
    db.commit()
    db.refresh(db_hive)
    return db_hive
