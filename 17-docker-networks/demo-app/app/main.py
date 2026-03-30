# app/main.py
from fastapi import FastAPI, HTTPException
from app.models import Note
from app.database import get_connection

app = FastAPI(title="FastAPI Notes Demo")

@app.get("/")
def read_root():
    return {"message": "FastAPI Notes Demo"}

@app.post("/notes/")
def create_note(note: Note):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        (note.title, note.content)
    )
    conn.commit()
    note_id = cursor.lastrowid
    conn.close()
    return {"id": note_id, "title": note.title, "content": note.content}

@app.get("/notes/{note_id}")
def read_note(note_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes WHERE id=?", (note_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {"id": row["id"], "title": row["title"], "content": row["content"]}
    raise HTTPException(status_code=404, detail="Note not found")

@app.get("/notes/")
def list_notes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": row["id"], "title": row["title"], "content": row["content"]} for row in rows]