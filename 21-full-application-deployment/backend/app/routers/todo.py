from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import TodoCreate, TodoRead, TodoUpdate
from app.services import (
    create_todo_service,
    delete_todo_service,
    get_todo_service,
    list_todos_service,
    update_todo_service,
)

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=list[TodoRead], status_code=status.HTTP_200_OK)
async def list_todos(completed: bool | None = None, db: Session = Depends(get_db)):
    return list_todos_service(db, completed=completed)


@router.get("/{todo_id}", response_model=TodoRead, status_code=status.HTTP_200_OK)
async def get_todo(todo_id: int, db: Session = Depends(get_db)):
    return get_todo_service(db, todo_id)


@router.post("", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
async def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    return create_todo_service(db, payload)


@router.put("/{todo_id}", response_model=TodoRead, status_code=status.HTTP_200_OK)
async def update_todo(todo_id: int, payload: TodoUpdate, db: Session = Depends(get_db)):
    return update_todo_service(db, todo_id, payload)


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    delete_todo_service(db, todo_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
