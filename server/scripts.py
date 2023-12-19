from passlib.context import CryptContext
from apiculture.models.core import User, Apiary, Hive
from apiculture.models.enum import ApiaryTypes, HiveTypes, HiveModels
from apiculture.database import SessionLocal


def create_sample_apiaries(db):
    apiaries = [
        Apiary(name="Медовина", number="0001"),
        Apiary(name="Изобилие", number="0002"),
        Apiary(name="Плодородие", number="0003", type=ApiaryTypes.MOBILE.value)
    ]
    db.add_all(apiaries)
    db.commit()
    print(f"Created {len(apiaries)} apiaries.")


def create_sample_hives(db):
    apiaries = db.query(Apiary).all()
    apiary_1 = apiaries[0]
    apiary_2 = apiaries[1]
    apiary_3 = apiaries[2]

    hives = [
        Hive(number="0001", apiary_id=apiary_1.id),
        Hive(number="0002", apiary_id=apiary_1.id),
        Hive(number="0003", apiary_id=apiary_1.id, type=HiveTypes.NUCLEUS_COLONY.value),
        Hive(number="0004", apiary_id=apiary_1.id, type=HiveTypes.SWARD.value, model=HiveModels.OTHER.value),

        Hive(number="0001", apiary_id=apiary_2.id, model=HiveModels.FARAR.value),
        Hive(number="0002", apiary_id=apiary_2.id),
        Hive(number="0003", apiary_id=apiary_2.id),

        Hive(number="0001", apiary_id=apiary_3.id),
        Hive(number="0002", apiary_id=apiary_3.id),
    ]

    db.add_all(hives)
    db.commit()
    print(f"Created {len(hives)} hives.")


def create_sample_data(db):
    create_sample_apiaries(db)
    create_sample_hives(db)


def create_user(email, password, first_name="", last_name=""):
    db = SessionLocal()

    # Hash user password
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    # Save user to Database
    user = User(email=email, password=hashed_password, first_name=first_name, last_name=last_name)
    db.add(user)
    db.commit()
    print(f"User {email} created.")

if __name__ == "__main__":
    db = SessionLocal()
    create_sample_data(db)
