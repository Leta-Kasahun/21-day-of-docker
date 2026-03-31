# 19-multistage-builds

## Day 19 Multistage Builds

---

### Learning Objectives (Summary)

By the end of this day, you will understand:

1. **What Multistage Builds Are** – Using multiple stages in one Dockerfile  
2. **Why Multistage Builds Matter** – Smaller, secure, and optimized images  
3. **How Layers Work** – Efficient reuse and caching  
4. **How to Structure Dockerfiles** – Build → Copy → Run pattern  
5. **Production Best Practices** – Clean, minimal, and maintainable images  

---

### What are Multistage Builds?

- Multistage builds allow using **multiple `FROM` statements** in a single Dockerfile  
- Each stage performs a specific task (build, test, runtime)  
- You copy only the **necessary artifacts** to the final image  

> This avoids including unnecessary tools like compilers and reduces image size

---

### Why Use Multistage Builds?

- ✅ Reduce image size significantly  
- ✅ Improve security (fewer dependencies)  
- ✅ Faster deployment and transfer  
- ✅ Cleaner and more maintainable Dockerfiles  

---

### When to Use Multistage Builds

- Applications that require a **build step** (Python, Node.js, Java)  
- Production-ready applications  
- When optimizing for performance and security  

---

### Understanding Docker Image Layers

- Each Dockerfile command creates a **layer**  
- Layers are:
  - Cached  
  - Reusable  
  - Ordered  

> Changing one layer invalidates all layers after it

---

### Multistage Build Workflow

1. **Build Stage**
   - Install dependencies  
   - Compile or prepare the application  

2. **Final Stage**
   - Copy only required files  
   - Run the application in a minimal environment  

---

### Example: Multistage Dockerfile (FastAPI)

```dockerfile
# Stage 1: Build dependencies
FROM python:3.12 AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --user -r requirements.txt

# Stage 2: Production image
FROM python:3.12-slim

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /root/.local /root/.local

# Copy application code
COPY . .

# Ensure PATH includes installed packages
ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
---

[⬅ Previous: Day 18 Advanced Images](../18-advanced-images/) | [Next ➡ Day 20 Docker Compose](../20-docker-compose/)
