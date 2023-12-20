from passlib.context import CryptContext

from apiculture.database import SessionLocal, engine
from apiculture.models.core import Apiary, Base, Hive, User
from apiculture.models.enum import ApiaryTypes, HiveModels, HiveTypes


def create_sample_apiaries(db, user):
    apiaries = [
        Apiary(owner_id=user.id, name="Ридо", number="0001"),
        Apiary(owner_id=user.id, name="Баба Донка", number="0002"),
        Apiary(
            owner_id=user.id,
            name="Рилски манастир",
            number="0003",
            type=ApiaryTypes.MOBILE.value,
        ),
    ]
    db.add_all(apiaries)
    db.commit()
    print(f"Created {len(apiaries)} apiaries.")


def create_sample_hives(db, user):
    apiaries = db.query(Apiary).filter(Apiary.owner_id == user.id).all()
    apiary_1 = apiaries[0]
    apiary_2 = apiaries[1]
    apiary_3 = apiaries[2]

    hives = [
        Hive(number="0001", apiary_id=apiary_1.id),
        Hive(number="0002", apiary_id=apiary_1.id),
        Hive(number="0003", apiary_id=apiary_1.id, type=HiveTypes.NUCLEUS_COLONY.value),
        Hive(
            number="0004",
            apiary_id=apiary_1.id,
            type=HiveTypes.SWARD.value,
            model=HiveModels.OTHER.value,
        ),
        Hive(number="0001", apiary_id=apiary_2.id, model=HiveModels.FARAR.value),
        Hive(number="0002", apiary_id=apiary_2.id),
        Hive(number="0003", apiary_id=apiary_2.id),
        Hive(number="0001", apiary_id=apiary_3.id),
        Hive(number="0002", apiary_id=apiary_3.id),
    ]

    db.add_all(hives)
    db.commit()
    print(f"Created {len(hives)} hives.")


def create_sample_data(db, user):
    create_sample_apiaries(db, user)
    create_sample_hives(db, user)


def create_user(email, password, first_name="", last_name=""):
    db = SessionLocal()

    # Hash user password
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    # Save user to Database
    user = User(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
    )
    db.add(user)
    db.commit()
    print(f"User {email} created.")


if __name__ == "__main__":
    db = SessionLocal()
    Base.metadata.create_all(bind=engine)
    create_user("stefanov.alexandre@gmail.com", "alex", "Александър", "Стефанов")
    create_user("viki@gmail.com", "viki", "Виктор", "Стефанов")
    user = db.query(User).filter(User.email == "stefanov.alexandre@gmail.com").first()
    create_sample_data(db, user)
