from sqlalchemy.orm import Session

from app import models, schemas


def get_todos(db: Session, completed: bool | None = None) -> list[models.Todo]:
    query = db.query(models.Todo)
    if completed is not None:
        query = query.filter(models.Todo.completed == completed)
    return query.order_by(models.Todo.id.asc()).all()


def get_todo(db: Session, todo_id: int) -> models.Todo | None:
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def create_todo(db: Session, payload: schemas.TodoCreate) -> models.Todo:
    todo = models.Todo(
        title=payload.title,
        description=payload.description,
        completed=False,
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def update_todo(db: Session, todo: models.Todo, payload: schemas.TodoUpdate) -> models.Todo:
    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(todo, key, value)

    db.commit()
    db.refresh(todo)
    return todo


def delete_todo(db: Session, todo: models.Todo) -> None:
    db.delete(todo)
    db.commit()
