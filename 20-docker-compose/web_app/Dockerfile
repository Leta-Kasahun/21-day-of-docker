# Stage 1: Build
FROM python:3.12-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install -r requirements.txt

COPY ./app ./app

# Stage 2: Runtime
FROM python:3.12-slim
WORKDIR /app

RUN useradd -m appuser
USER appuser

# Copy code
COPY --from=builder /app /app

# Copy installed packages + scripts
COPY --from=builder /install /usr/local

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]