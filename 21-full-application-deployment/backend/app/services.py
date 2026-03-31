from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app import crud, schemas


def list_todos_service(db: Session, completed: bool | None = None):
    try:
        return crud.get_todos(db, completed=completed)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch todos.",
        ) from exc


def get_todo_service(db: Session, todo_id: int):
    try:
        todo = crud.get_todo(db, todo_id)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch todo.",
        ) from exc

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found.",
        )
    return todo


def create_todo_service(db: Session, payload: schemas.TodoCreate):
    try:
        return crud.create_todo(db, payload)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create todo.",
        ) from exc


def update_todo_service(db: Session, todo_id: int, payload: schemas.TodoUpdate):
    todo = get_todo_service(db, todo_id)
    try:
        return crud.update_todo(db, todo, payload)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update todo.",
        ) from exc


def delete_todo_service(db: Session, todo_id: int):
    todo = get_todo_service(db, todo_id)
    try:
        crud.delete_todo(db, todo)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete todo.",
        ) from exc
