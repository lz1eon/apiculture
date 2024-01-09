import math
from random import randint
from passlib.context import CryptContext


from apiculture.database import SessionLocal, engine
from apiculture.models.core import (
    Apiary,
    Hive,
    User,
    Base,
    SharedHive,
    SharedHiveComment,
)
from apiculture.models.enum import HiveModels, HiveTypes, HiveStrengths

MAX_APIARIES_COUNT = 10
MAX_HIVES_COUNT = 3000


COMMENTS = [
    'Пилото е малко',
    'Кошерът е твърде слаб за поставяне на магазини',
    'Още е рано за поставяне на магазини',
    'Майката е за смяна',
    'От коя година е майката?',
    'Колко запаси мед има кошерът?',
    'Късно си започнал да ги подхранваш',
    'Според мен скоро ще се рои.',
    'Кога е излюпено последото пило?',
    'Имало ли е болести по кошера последния месец?',
    'Има ли заложени маточници?',
    'Слагай им повече храна',
    'С колко рамки е кошерът?',
    'Каква е пашата наоколо?',
]

def connect_users(db, first_id, second_id):
    assert first_id != second_id

    first = db.query(User).where(User.id == first_id).first()
    second = db.query(User).where(User.id == second_id).first()

    if second_id not in first.connections:
        first.connections.append(second_id)
        db.add(first)

    if first_id not in second.connections:
        second.connections.append(first_id)
        db.add(second)

    db.commit()


def connect_user(db, user, connections=None):
    # TODO: optimize
    connections = connections or []
    for connection in connections:
        connect_users(db, user.id, connection.id)


def apiary_number_generator(count=MAX_APIARIES_COUNT):
    for number in range(1, count + 1):
        yield f"000{number}"


def hive_number_generator(count=MAX_HIVES_COUNT):
    prefix = "00"
    for number in range(1, count + 1):
        if number >= 10:
            prefix = "0"
        if number >= 100:
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


def add_comment(db, hive_id, text, commentator_id, owner_id):
    shared_hive, _ = (
        db.query(SharedHive, Hive)
        .where(Hive.id == hive_id)
        .where(Hive.owner_id == owner_id)
        .where(SharedHive.hive_id == Hive.id)
        .first()
    )

    comment = SharedHiveComment(
        shared_hive_id=shared_hive.id, commentator_id=commentator_id, text=text
    )
    db.add(comment)
    db.commit()


def share_some_hives(owner, percent=10):
    shared_hives = []
    all_user_hives = db.query(Hive).where(Hive.owner_id == owner.id)
    recipients = list(db.query(User).where(User.id.in_(owner.connections)))

    for hive in all_user_hives:
        to_share = not bool(randint(0, int(100 / percent)))
        if to_share and recipients:
            num_share = randint(1, len(recipients))  # share with multiple users
            for _ in range(num_share):
                random_recipient = recipients[randint(0, len(recipients)) - 1]
                shared_hive = SharedHive(
                    hive_id=hive.id,
                    owner_id=owner.id,
                    recipient_id=random_recipient.id,
                    active=True,
                )
                shared_hives.append(shared_hive)
    db.add_all(shared_hives)
    db.commit()

    for shared_hive in shared_hives:
        to_add_comment = bool(randint(0, 4))  # add comment to 1/4 of the shared hives
        if to_add_comment and recipients:
            num_comments = randint(1, 7) # add 1 to 7 comments
            for _ in range(num_comments + 1):
                random_recipient = recipients[randint(0, len(recipients)) - 1]
                text = COMMENTS[randint(0, len(COMMENTS)) - 1]
                add_comment(db, shared_hive.hive_id, text, random_recipient.id, owner.id)


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
    apiary = (
        db.query(Apiary)
        .where(Apiary.owner_id == user_id)
        .where(Apiary.number == number)
        .first()
    )
    return apiary


def create_data(db, user, apiaries=None, hives=None):
    if len(apiaries) != len(hives):
        raise ValueError(
            'len() of "apiaries" argument must be the same as the len() of "hives" argument.'
        )

    generate_apiary_number = apiary_number_generator(len(apiaries))

    for i, apiary_name in enumerate(apiaries):
        apiary_number = next(generate_apiary_number)
        created_apiary = create_apiary(db, user.id, apiary_number, apiary_name)
        created_hives = list(create_hives(db, user.id, created_apiary.id, hives[i]))
        print(f'Apiary "{created_apiary.name}" created.')
        print(f'Created {len(created_hives)} hives for apiary "{created_apiary.name}"')


def create_user(db, email, password, first_name="", last_name="", admin=False):
    # Hash user password
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    # Save user to Database
    new_user = User(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        admin=admin,
    )
    db.add(new_user)
    db.commit()

    print(f"User {email} created.")
    return new_user


if __name__ == "__main__":
    db = SessionLocal()
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # User 1
    viki = create_user(
        db,
        "viki@gmail.com",
        "viki",
        "Виктор",
        "Стефанов",
        admin=True,
    )
    user = db.query(User).filter(User.email == "viki@gmail.com").first()
    create_data(db, user, apiaries=["Лозето", "Парапунов"], hives=[5, 33])

    # User 2
    alex = create_user(
        db,
        "alex@gmail.com",
        "alex",
        "Александър",
        "Стефанов",
        admin=True,
    )
    user = db.query(User).filter(User.email == "alex@gmail.com").first()
    create_data(
        db, user, apiaries=["Манастиро", "Водоема", "Ридо"], hives=[57, 10, 105]
    )

    # User 3
    joro = create_user(
        db,
        "joro@gmail.com",
        "joro",
        "Георги",
        "Стефанов",
        admin=True,
    )
    user = db.query(User).filter(User.email == "joro@gmail.com").first()
    create_data(db, user, apiaries=["Чифлико", "Родопа"], hives=[7, 49])

    # User 4
    juli = create_user(
        db,
        "juli@gmail.com",
        "juli",
        "Жулиета",
        "Стефанова",
        admin=True,
    )
    user = db.query(User).filter(User.email == "juli@gmail.com").first()
    create_data(db, user, apiaries=["Лозето", "Родопа"], hives=[12, 61])

    # User 5
    stoyan = create_user(
        db,
        "stoyan@gmail.com",
        "stoyan",
        "Стоян",
        "Стоянов",
    )
    user = db.query(User).filter(User.email == "stoyan@gmail.com").first()
    create_data(db, user, apiaries=["Медовина", "Сладост"], hives=[15, 70])

    # User 6
    rosen = create_user(
        db,
        "rosen@gmail.com",
        "rosen",
        "Росен",
        "Росенов",
    )
    user = db.query(User).filter(User.email == "rosen@gmail.com").first()
    create_data(db, user, apiaries=["Изобилие", "Водоема"], hives=[13, 55])

    # User 7
    elina = create_user(
        db,
        "elina@gmail.com",
        "elina",
        "Елина",
        "Елинова",
    )
    user = db.query(User).filter(User.email == "elina@gmail.com").first()
    create_data(db, user, apiaries=["Изобилие", "Медовина"], hives=[15, 150])

    # User 8
    raya = create_user(
        db,
        "raya@gmail.com",
        "raya",
        "Рая",
        "Раева",
    )
    user = db.query(User).filter(User.email == "raya@gmail.com").first()
    create_data(db, user, apiaries=["Изобилие", "Медовина"], hives=[8, 80])

    # Connect users only when all of them are already created
    connect_user(db, alex, connections=[viki, joro, juli, rosen, stoyan, elina, raya])
    connect_user(db, viki, connections=[alex, joro, juli, rosen, stoyan])
    connect_user(db, joro, connections=[alex, viki, juli, rosen, stoyan])
    connect_user(db, juli, connections=[alex, viki, joro, rosen, stoyan])
    connect_user(db, stoyan, connections=[alex, viki, joro, raya])
    connect_user(db, rosen, connections=[alex, viki, joro, juli, elina, raya])
    connect_user(db, elina, connections=[alex, raya, rosen])
    connect_user(db, raya, connections=[alex, rosen, stoyan, elina])

    # Share hives at the end when all users are created.
    share_some_hives(alex)
    share_some_hives(viki)
    share_some_hives(joro)
    share_some_hives(juli)
    share_some_hives(stoyan)
    share_some_hives(rosen)
    share_some_hives(elina)
    share_some_hives(raya)
