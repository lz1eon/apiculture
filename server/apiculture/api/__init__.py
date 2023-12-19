from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from apiculture.models.core import Base
from apiculture.database import SessionLocal, engine
from apiculture.api import schemas
from apiculture.dal.query import (
    get_apiaries,
    get_hives,
    get_apiaries_count,
    get_all_hives_count,
)

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


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root(db: Session = Depends(get_db)):
    return {
        "message": f"Добре дошли в Пчелина. Разполагате с {get_apiaries_count(db)} пчелина и {get_all_hives_count(db)} кошера."
    }


@app.post("/login/")
async def login():
    # raise HTTPException(status_code=400, detail="Password or username is incorrect!")
    return {
        "message": "OK",
        "status": 200,
        "user": {
            "id": 1,
            "first_name": "alexander",
            "last_name": "stefanov",
            "email": "stefanov.alexandre@gmail.com",
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
