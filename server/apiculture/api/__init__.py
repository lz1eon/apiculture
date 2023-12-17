from fastapi import FastAPI, Depends, HTTPException
from uuid import UUID
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


@app.get("/apiaries/", response_model=list[schemas.Apiary])
async def apiaries(db: Session = Depends(get_db)):
    return get_apiaries(db)


@app.get("/apiaries/{apiary_id}/hives/", response_model=list[schemas.Hive])
async def hives(apiary_id: int, db: Session = Depends(get_db)):
    return get_hives(db, apiary_id=apiary_id)
