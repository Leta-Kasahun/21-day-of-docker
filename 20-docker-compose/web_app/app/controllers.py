from fastapi import APIRouter
from app.models import Item
from app.services import add_item, get_items

router = APIRouter()

@router.post("/items")
def create_item(item: Item):
    return add_item(item)

@router.get("/items")
def list_items():
    return get_items()