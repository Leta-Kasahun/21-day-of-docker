# Dockerfile

# 1️⃣ Use slim Python base
FROM python:3.11-slim

# 2️⃣ Create a non-root user
RUN useradd -m repl

# 3️⃣ Set working directory
WORKDIR /home/repl/app

# 4️⃣ Copy project files
COPY . .

# 5️⃣ Change ownership to non-root user
RUN chown -R repl:repl /home/repl/app

# 6️⃣ Switch to non-root user
USER repl

# 7️⃣ Default command to run Python app
CMD ["python", "app.py"]