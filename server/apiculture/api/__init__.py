from typing import Annotated
from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from apiculture.models.core import Base
from apiculture.database import SessionLocal, engine
from apiculture.api import schemas
from apiculture.api.auth import (
    authenticate_user,
    create_access_token,
    get_current_active_user,
    UserSchema,
    TokenSchema
)
from apiculture.dal.query import (
    get_user,
    get_apiaries,
    get_hives,
    get_apiaries_count,
    get_all_hives_count,
)


ACCESS_TOKEN_EXPIRE_MINUTES = 30


Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/token", response_model=TokenSchema)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}



@app.get("/users/me/", response_model=UserSchema)
async def read_users_me(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.get("/")
async def root(db: Session = Depends(get_db)):
    return {
        "message": f"Добре дошли в Пчелина. Разполагате с {get_apiaries_count(db)} пчелина и {get_all_hives_count(db)} кошера."
    }


@app.post("/login/")
async def login(db: Session = Depends(get_db)):
    user_id = 3
    user = get_user(db, user_id)
    return {
        "message": "OK",
        "status": 200,
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
        },
    }


@app.post("/logout/")
async def logout():
    # raise HTTPException(status_code=400, detail="Password or username is incorrect!")
    return {"message": "OK", "status": 200}


@app.get("/apiaries/", response_model=list[schemas.Apiary])
async def apiaries(db: Session = Depends(get_db)):
    return get_apiaries(db)


@app.get("/apiaries/{apiary_id}/hives/", response_model=list[schemas.Hive])
async def hives(apiary_id: int, db: Session = Depends(get_db)):
    return get_hives(db, apiary_id=apiary_id)
