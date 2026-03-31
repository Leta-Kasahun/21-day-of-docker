from datetime import datetime

from pydantic import BaseModel, Field
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    completed: bool = False

class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None

class TodoUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    completed: bool | None = None

class TodoRead(TodoBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
