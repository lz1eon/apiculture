import math
from random import randint
from passlib.context import CryptContext

from apiculture.database import SessionLocal, engine
from apiculture.models.core import Apiary, Hive, User, Base, SharedHive
from apiculture.models.enum import HiveModels, HiveTypes, HiveStrengths

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
    x = 5
    y = 5
    delta_x = 10
    delta_y = 10
    max_x = int(math.sqrt(count)) * 10

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


def random_super():
    return bool(randint(0, 1))


def random_mother():
    """
    Generate random true/false with 5:1 chance for true
    """
    return bool(randint(0, 5))


def random_brood():
    """
    Generate random true/false with 5:1 chance for true
    """
    return bool(randint(0, 5))


def random_strength():
    return randint(0, len(HiveStrengths) - 1)


def random_coordinate(minimum=0, maximum=100):
    return randint(minimum, maximum)


def share_some_hives(hives, owner, recipients, percent=10):
    new_shares = []

    for hive in hives:
        to_share = not bool(randint(0, int(100 / percent)))
        if to_share and recipients:
            random_recipient = recipients[randint(0, len(recipients)) - 1]
            new_share = SharedHive(hive_id=hive.id, owner_id=owner.id, recipient_id=random_recipient.id)
            new_shares.append(new_share)

    db.add_all(new_shares)
    db.commit()


def create_hive(owner_id, apiary_id, number, x, y):
    hive = Hive()
    hive.owner_id = owner_id
    hive.apiary_id = apiary_id
    hive.number = number
    hive.type = random_type()
    hive.model = random_model()
    hive.super = random_super()
    hive.mother = random_mother()
    hive.brood = random_brood()
    hive.strength = random_strength()
    hive.x = x
    hive.y = y
    return hive


def create_hives(db, owner_id, apiary_id, hives_count):
    new_hives = []
    generate_hive_number = hive_number_generator(hives_count)
    generate_hive_coordinates = hive_coordinates_generator(hives_count)
    for index in range(0, hives_count):
        x, y = next(generate_hive_coordinates)
        new_hive = create_hive(owner_id, apiary_id, next(generate_hive_number), x, y)
        new_hives.append(new_hive)

    db.add_all(new_hives)
    db.commit()

    # Return the newly created ives
    return db.query(Hive).where(Hive.apiary_id == apiary_id)


def create_apiary(db, user_id, number, name):
    new_apiary = Apiary(number=number, name=name, owner_id=user_id)
    db.add(new_apiary)
    db.commit()
    apiary = db.query(Apiary).where(Apiary.owner_id == user_id).where(Apiary.number == number).first()
    return apiary


def create_data(db, user, apiaries=None, hives=None):
    apiaries = apiaries or ['Водоема']
    hives = hives or [20]
    users = list(db.query(User).where(User.id != user.id))

    if len(apiaries) != len(hives):
        raise ValueError('len() of "apiaries" argument must be the same as the len() of "hives" argument.')

    generate_apiary_number = apiary_number_generator(len(apiaries))

    for i, apiary_name in enumerate(apiaries):
        apiary_number = next(generate_apiary_number)
        apiary = create_apiary(db, user.id, apiary_number, apiary_name)
        new_hives = create_hives(db, user.id, apiary.id, hives[i])
        share_some_hives(new_hives, owner=user, recipients=users)

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
    create_user(db, "viki@gmail.com", "viki", "Виктор", "Стефанов")
    user = db.query(User).filter(User.email == "viki@gmail.com").first()
    create_data(db, user, apiaries=["Лозето", "Парапунов"], hives=[5, 33])

    # User 2
    create_user(db, "stefanov.alexandre@gmail.com", "alex", "Александър", "Стефанов")
    user = db.query(User).filter(User.email == "stefanov.alexandre@gmail.com").first()
    create_data(db, user, apiaries=["Манастиро", "Водоема", "Ридо"], hives=[57, 10, 105])

    # User 3
    create_user(db, "joro@gmail.com", "joro", "Георги", "Стефанов")
    user = db.query(User).filter(User.email == "joro@gmail.com").first()
    create_data(db, user, apiaries=["Чифлико", "Родопа"], hives=[7, 49])
