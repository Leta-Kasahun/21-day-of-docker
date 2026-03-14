from fastapi import FastAPI
import os
app=FastAPI()
PORT=int(os.environ.get("APP_PORT",8000))
app.get("/")
def read_root():
    return {"message: Hello from FastAPI docker container"}