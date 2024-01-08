from datetime import UTC, datetime, timedelta
from typing import Annotated, Union

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_auth_middleware import AuthMiddleware
from jose import JWTError, jwt
from mangum import Mangum
from sqlalchemy.orm import Session

from apiculture.api.auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    handle_auth_error,
    register_user,
    verify_authorization_header,
)
from apiculture.api.schemas import (
    ApiaryCreateSchema,
    ApiarySchema,
    HiveCreateSchema,
    HiveSchema,
    HiveUpdateSchema,
    SharedHiveSchema,
    TokenUserSchema,
    UserCreateSchema,
    UserSchema,
)
from apiculture.config import settings
from apiculture.dal.command import create_apiary, create_hive, share_hive, update_hive
from apiculture.dal.query import (
    get_apiaries,
    get_apiary,
    get_hives,
    get_hives_shared_with_me,
    get_my_shared_hives,
    get_user_by_email,
)
from apiculture.database import engine, get_db
from apiculture.models.core import Base

Base.metadata.create_all(bind=engine)


app = FastAPI()
app.add_middleware(
    AuthMiddleware,
    verify_header=verify_authorization_header,
    auth_error_handler=handle_auth_error,
    excluded_urls=["/register/", "/login/", "/refresh-token/"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8100",
        "https://apiarium.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/apiaries/", response_model=list[ApiarySchema])
async def apiaries_get(request: Request, db: Session = Depends(get_db)):
    return get_apiaries(db, request.user)


@app.post("/apiaries/", response_model=ApiarySchema)
async def apiary_create(
    request: Request, apiary: ApiaryCreateSchema, db: Session = Depends(get_db)
):
    return create_apiary(db, request.user, apiary)


@app.get("/apiaries/{apiary_id}/", response_model=ApiarySchema)
async def apiary_get(apiary_id, request: Request, db: Session = Depends(get_db)):
    return get_apiary(db, request.user, apiary_id)


@app.get("/apiaries/{apiary_id}/hives/", response_model=list[HiveSchema])
async def hives_get(request: Request, apiary_id: int, db: Session = Depends(get_db)):
    return get_hives(db, request.user, apiary_id=apiary_id)


@app.get("/hives/my-shared/", response_model=list[SharedHiveSchema])
async def hives_get_my_shared(request: Request, db: Session = Depends(get_db)):
    my_shared_hives_query = get_my_shared_hives(db, request.user)
    my_shared_hives = []
    for hive in my_shared_hives_query:
        shared_hive = SharedHiveSchema(
            hive=hive.to_dict(),
            owner=request.user.to_dict(),
            recipients=[r.to_dict() for r in hive.recipients],
        )
        my_shared_hives.append(shared_hive)
    return my_shared_hives


@app.get("/hives/shared-with-me/", response_model=list[SharedHiveSchema])
async def hives_get_shared_with_me(request: Request, db: Session = Depends(get_db)):
    shared_hives_query = get_hives_shared_with_me(db, request.user)
    shared_hives = []
    for hive, owner, _ in shared_hives_query:
        shared_hive = SharedHiveSchema(
            hive=hive.to_dict(),
            owner=owner.to_dict(),
            recipients=[request.user.to_dict()],
        )
        shared_hives.append(shared_hive)
    return shared_hives


@app.post("/apiaries/{apiary_id}/hives/", response_model=HiveSchema)
async def hives_create(
    request: Request,
    apiary_id: int,
    hive: HiveCreateSchema,
    db: Session = Depends(get_db),
):
    return create_hive(db, request.user, apiary_id=apiary_id, hive=hive)


@app.put("/apiaries/{apiary_id}/hives/{hive_id}/")
async def hive_update(
    request: Request,
    hive_id: int,
    hive_data: HiveUpdateSchema,
    db: Session = Depends(get_db),
):
    return update_hive(db, request.user, hive_id, hive_data)


@app.post("/apiaries/{apiary_id}/hives/{hive_id}/share/")
async def hive_share(
    request: Request,
    hive_id: int,
    recipient_email: str,
    db: Session = Depends(get_db),
):
    recipient = get_user_by_email(recipient_email)
    if not recipient:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User with email {recipient_email} does not exist.",
        )
    return share_hive(db, request.user, hive_id, recipient)


# Authentication Paths #


@app.post("/register/", response_model=TokenUserSchema)
async def register(user_data: UserCreateSchema, db: Session = Depends(get_db)):
    user = register_user(user_data, db)

    # TODO: Temporarily log the user in without email validation
    user_data = UserSchema(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
    )

    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user_data,
    }


@app.post("/login/", response_model=TokenUserSchema)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """
    Login the user and give him an access token to be used is subsequent requests.

    :param form_data: username (email) and password
    :return: access_token as per OpenAPI
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_data = UserSchema(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        admin=user.admin,
    )

    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user_data,
    }


@app.post(
    "/refresh-token/", response_model=TokenUserSchema, response_model_exclude_unset=True
)
def refresh_access_token(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Extract token from header
        scheme, _, token = request.headers["authorization"].partition(" ")
        if scheme.lower() != "bearer":
            raise credentials_exception

        # Decode token to get username
        payload = jwt.decode(
            token, settings.JWT_REFRESH_TOKEN_SECRET_KEY, algorithms=[ALGORITHM]
        )
        username: str = payload.get("sub")
        refresh_token_expiry: datetime = datetime.fromtimestamp(payload.get("exp"), UTC)
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # We user email as username
    user = get_user_by_email(db, username)
    if user is None:
        raise credentials_exception

    access_token_expiry = datetime.now(UTC) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = create_access_token(user.email)
    token_data = {"access_token": access_token, "token_type": "bearer", "user": user}
    # If the refresh token is about to expire,
    # generate new refresh token also.
    if refresh_token_expiry <= access_token_expiry:
        refresh_token = create_refresh_token(user.email)
        token_data.update({"refresh_token": refresh_token})

    return token_data


@app.post("/logout/")
async def logout():
    """
    Logs the user out.

    Delete the access token.

    :return:
    """
    # TODO: implement proper logout
    #       1. Delete user token
    #       2. Set token expire
    return {"message": "OK", "status": 200}


app_handler = Mangum(app)
