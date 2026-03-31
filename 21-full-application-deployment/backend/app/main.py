from fastapi import FastAPI

from app.database import Base, engine
from app.routers import todo


# Create DB tables at startup for this simple app.
Base.metadata.create_all(bind=engine)

app = FastAPI(
	title="Todo API",
	description="Simple production-ready Todo backend built with FastAPI and SQLAlchemy.",
	version="1.0.0",
)

app.include_router(todo.router)


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
	return {"status": "ok"}
