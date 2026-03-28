from fastapi import FastAPI
import sqlite3
import os

app = FastAPI()
DB_PATH = "/app/db/data.db"  # Volume will persist this file

# Ensure DB folder exists
os.makedirs("/app/db", exist_ok=True)

# Initialize SQLite DB if it doesn't exist
conn = sqlite3.connect(DB_PATH)
conn.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT)")
conn.commit()
conn.close()


@app.get("/")
def read_root():
    return {"message": "Hello FastAPI + Docker Volume!"}


@app.post("/add/{msg}")
def add_message(msg: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO messages (text) VALUES (?)", (msg,))
    conn.commit()
    conn.close()
    return {"status": "success", "msg": msg}


@app.get("/messages")
def get_messages():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM messages")
    rows = cursor.fetchall()
    conn.close()
    return {"messages": rows}