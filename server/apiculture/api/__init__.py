from datetime import timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_auth_middleware import AuthMiddleware
from sqlalchemy.orm import Session

from apiculture.api import schemas
from apiculture.api.auth import (
    authenticate_user,
    create_access_token,
    verify_authorization_header, register_user,
)
from apiculture.api.schemas import UserSchema, UserCreateSchema
from apiculture.dal.query import get_apiaries, get_hives
from apiculture.database import engine, get_db
from apiculture.models.core import Base

ACCESS_TOKEN_EXPIRE_MINUTES = 30


Base.metadata.create_all(bind=engine)


app = FastAPI()
app.add_middleware(
    AuthMiddleware,
    verify_header=verify_authorization_header,
    excluded_urls=["/register/", "/login/"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/apiaries/", response_model=list[schemas.ApiarySchema])
async def apiaries(db: Session = Depends(get_db)):
    return get_apiaries(db)


@app.get("/apiaries/{apiary_id}/hives/", response_model=list[schemas.HiveSchema])
async def hives(apiary_id: int, db: Session = Depends(get_db)):
    return get_hives(db, apiary_id=apiary_id)


# Authentication Paths #

@app.post("/register/")
async def register(user_data: UserCreateSchema):
    user = register_user(user_data)

    # TODO: Temporarily log the user in without email validation
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    user_data = UserSchema(id=user.id, email=user.email, first_name=user.first_name, last_name=user.last_name)
    return {"access_token": access_token, "token_type": "bearer", "user": user_data}


@app.post("/login/", response_model=schemas.TokenUserSchema)
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
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    user_data = UserSchema(id=user.id, email=user.email, first_name=user.first_name, last_name=user.last_name)
    return {"access_token": access_token, "token_type": "bearer", "user": user_data}


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
