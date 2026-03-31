from fastapi import FastAPI
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import Task

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Multistage Docker Demo 🚀"}

@app.post("/tasks")
def create_task(title: str):
    db: Session = SessionLocal()
    task = Task(title=title)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@app.get("/tasks")
def get_tasks():
    db: Session = SessionLocal()
    return db.query(Task).all()