from fastapi import FastAPI
from app.controllers import router
import os

app = FastAPI(title="FastAPI Docker Demo")

# Load router
app.include_router(router)

@app.get("/")
def root():
    return {"message": "FastAPI Docker Demo running!"}

# Example of using environment variable securely
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")