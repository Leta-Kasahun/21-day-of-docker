# ---------------------------
# Stage 1: Base Image
# ---------------------------
FROM python:3.12 AS base
WORKDIR /app

# ---------------------------
# Stage 2: Dependencies
# ---------------------------
FROM base AS dependencies

COPY requirements.txt .
RUN pip install --user -r requirements.txt

# ---------------------------
# Stage 3: Builder (App Setup)
# ---------------------------
FROM base AS builder

COPY --from=dependencies /root/.local /root/.local
COPY ./app ./app

ENV PATH=/root/.local/bin:$PATH

# ---------------------------
# Stage 4: Production (Final)
# ---------------------------
FROM python:3.12-slim AS production

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY --from=builder /app /app

ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]