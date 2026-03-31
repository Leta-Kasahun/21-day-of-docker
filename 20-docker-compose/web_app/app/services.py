from app.models import Item

items_db = []

def add_item(item: Item):
    items_db.append(item)
    return item

def get_items():
    return items_db