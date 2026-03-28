# 1. Use lightweight base image (better practice)
FROM python:3.10-slim

# 2. Create non-root user (security)
RUN useradd -m appuser

# 3. Set working directory
WORKDIR /app

# 4. Copy only requirements first (optimization)
COPY requirements.txt .

# 5. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy app code
COPY . .

# 7. Change ownership to non-root user
RUN chown -R appuser:appuser /app

# 8. Switch to non-root user
USER appuser

# 9. Run  app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]