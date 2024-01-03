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
        Hive(number="001", apiary_id=apiary_1.id, x=10, y=10),
        Hive(number="002", apiary_id=apiary_1.id, model=HiveModels.FARAR.value, x=20, y=20),
        Hive(number="003", apiary_id=apiary_1.id, model=HiveModels.OTHER.value, x=10, y=30),
        Hive(number="004", apiary_id=apiary_1.id, type=HiveTypes.NUCLEUS_COLONY.value, x=20, y=10),
        Hive(number="005", apiary_id=apiary_1.id, x=40, y=20),
        Hive(number="006", apiary_id=apiary_1.id, model=HiveModels.OTHER.value, x=20, y=30),
        Hive(number="007", apiary_id=apiary_1.id, x=50, y=10),
        Hive(number="008", apiary_id=apiary_1.id, model=HiveModels.LANGSTROTH.value, x=50, y=30),
        Hive(number="009", apiary_id=apiary_1.id, x=60, y=20),
        Hive(
            number="010",
            apiary_id=apiary_1.id,
            type=HiveTypes.SWARM.value,
            model=HiveModels.LANGSTROTH.value,
            x=70,
            y=20
        ),
        Hive(number="001", apiary_id=apiary_2.id, model=HiveModels.FARAR.value, x=10, y=10),
        Hive(number="002", apiary_id=apiary_2.id, x=40, y=10),
        Hive(number="003", apiary_id=apiary_2.id, x=10, y=20),
        Hive(number="001", apiary_id=apiary_3.id, x=10, y=10),
        Hive(number="002", apiary_id=apiary_3.id, x=20, y=10),
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
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # User 1
    create_user("stefanov.alexandre@gmail.com", "alex", "Александър", "Стефанов")
    user = db.query(User).filter(User.email == "stefanov.alexandre@gmail.com").first()
    create_sample_data(db, user)

    # User 2
    create_user("viki@gmail.com", "viki", "Виктор", "Стефанов")
    user = db.query(User).filter(User.email == "viki@gmail.com").first()
    create_sample_data(db, user)

    # User 3
    create_user("joro@gmail.com", "joro", "Георги", "Стефанов")
    user = db.query(User).filter(User.email == "joro@gmail.com").first()
    create_sample_data(db, user)
