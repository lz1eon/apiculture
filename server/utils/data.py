from random import randint
from passlib.context import CryptContext

from apiculture.database import SessionLocal, engine
from apiculture.models.core import Apiary, Hive, User, Base
from apiculture.models.enum import HiveModels, HiveTypes

MAX_APIARIES_COUNT = 10
MAX_HIVES_COUNT = 3000


def apiary_number_generator(count=MAX_APIARIES_COUNT):
    for number in range(1, count + 1):
        yield f"000{number}"


def hive_number_generator(count=MAX_HIVES_COUNT):
    prefix = "00"
    for number in range(1, count + 1):
        if number >= 10:
            prefix = "0"
        elif number >= 100:
            prefix = ""
        yield f"{prefix}{number}"


def hive_coordinates_generator(count=MAX_HIVES_COUNT):
    x = 0
    y = 0
    delta_x = 10
    delta_y = 10
    max_x = 120

    for index in range(1, count + 1):
        if x > max_x:
            x = 0
            y = y + delta_y

        yield x, y

        x = x + delta_x


def random_type():
    return randint(0, len(HiveTypes) - 1)


def random_model():
    return randint(0, len(HiveModels) - 1)


def random_coordinate(minimum=0, maximum=100):
    return randint(minimum, maximum)


def create_hive(apiary_id, number, x, y):
    hive = Hive()
    hive.number = number
    hive.apiary_id = apiary_id
    hive.type = random_type()
    hive.model = random_model()
    hive.x = x
    hive.y = y

    return hive


def create_hives(db, apiary_id, hives_count):
    new_hives = []
    generate_hive_number = hive_number_generator(hives_count)
    generate_hive_coordinates = hive_coordinates_generator(hives_count)
    for index in range(0, hives_count):
        x, y = next(generate_hive_coordinates)
        new_hives.append(create_hive(apiary_id, next(generate_hive_number), x, y))

    print(apiary_id, new_hives)
    # bulk insert hives into DB
    db.add_all(new_hives)
    db.commit()


def create_apiary(db, user_id, number, name):
    new_apiary = Apiary(number=number, name=name, owner_id=user_id)
    db.add(new_apiary)
    db.commit()
    apiary = db.query(Apiary).where(Apiary.owner_id == user_id).where(Apiary.number == number).first()
    return apiary


def create_data(db, user, apiaries=None, hives=None):
    apiaries = apiaries or ['Водоема']
    hives = hives or [20]

    if len(apiaries) != len(hives):
        raise ValueError('len() of "apiaries" argument must be the same as the len() of "hives" argument.')

    generate_apiary_number = apiary_number_generator(len(apiaries))

    for i, apiary_name in enumerate(apiaries):
        apiary_number = next(generate_apiary_number)
        apiary = create_apiary(db, user.id, apiary_number, apiary_name)
        create_hives(db, apiary.id, hives[i])

        print(f'Apiary "{apiary_name}" created.')
        print(f'Created {hives[i]} hives for apiary "{apiary_name}"')


def create_user(db, email, password, first_name="", last_name=""):
    # Hash user password
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    # Save user to Database
    new_user = User(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
    )
    db.add(new_user)
    db.commit()
    print(f"User {email} created.")


if __name__ == "__main__":
    db = SessionLocal()
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # User 1
    create_user(db, "stefanov.alexandre@gmail.com", "alex", "Александър", "Стефанов")
    user = db.query(User).filter(User.email == "stefanov.alexandre@gmail.com").first()
    create_data(db, user, apiaries=["Манастиро", "Водоема", "Ридо"], hives=[57, 10, 105])

    # User 2
    create_user(db, "viki@gmail.com", "viki", "Виктор", "Стефанов")
    user = db.query(User).filter(User.email == "viki@gmail.com").first()
    create_data(db, user, apiaries=["Лозето", "Парапунов"], hives=[5, 33])

    # User 3
    create_user(db, "joro@gmail.com", "joro", "Георги", "Стефанов")
    user = db.query(User).filter(User.email == "joro@gmail.com").first()
    create_data(db, user, apiaries=["Чифлико", "Родопа"], hives=[7, 49])
