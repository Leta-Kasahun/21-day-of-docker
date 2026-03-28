# 12-docker-security

## Day 12 Docker Security

### By the end of this day, you should be able to:

* Understand why **running as non-root improves security**
* Use **USER and WORKDIR** properly in Dockerfiles
* Avoid common Docker security mistakes
* Structure Dockerfiles cleanly using working directories
* Build and run a secure Python container

---

## 🔐 Why Docker Security Matters

* Containers share the **host OS kernel**
* Running as root can lead to **serious security risks**
* Poor structure can expose files and system access

---

## 👤 USER Instruction (Security Best Practice)

* `USER` changes the **active user** inside the container
* By default, Docker runs as **root (dangerous)**
* Always switch to a **non-root user**

---

## Typical Usage

```dockerfile
FROM ubuntu

# Install dependencies as root
RUN apt-get update && apt-get install -y python3

# Create a non-root user
RUN useradd -m repl

# Switch to non-root user
USER repl

CMD python3
```

---

## 📁 WORKDIR Instruction (Clean Structure)

* `WORKDIR` sets the **current working directory**
* Avoid long paths in every command
* Makes Dockerfile cleaner and readable

---

## Example Without WORKDIR (Bad Practice)

```dockerfile
RUN /home/repl/projects/app/start.sh
CMD /home/repl/projects/app/start.sh
```

---

## Example With WORKDIR (Best Practice)

```dockerfile
WORKDIR /home/repl/projects/app

RUN ./start.sh
CMD ./start.sh
```

---

## 🔁 Interaction Between Instructions

* `FROM` → defines base image
* `RUN` → executes commands during build
* `COPY` → copies files into container
* `WORKDIR` → affects all next commands
* `USER` → affects permissions of next commands

---

## 🧪 Step-by-Step Example (Secure Python App)

### 1. Create project structure

```bash
mkdir docker-secure-app
cd docker-secure-app
```

### 2. Create Python file

```python
# app.py
print("Hello from secure Docker container")
```

---

### 3. Create Dockerfile

```dockerfile
FROM ubuntu

# Install dependencies
RUN apt-get update && apt-get install -y python3

# Create user
RUN useradd -m repl

# Set working directory
WORKDIR /home/repl/app

# Copy project files
COPY . .

# Change ownership (important)
RUN chown -R repl:repl /home/repl/app

# Switch user
USER repl

# Run app
CMD ["python3", "app.py"]
```

---

##  Run the Application

### 1. Build the image

```bash
docker build -t secure-app:v1 .
```

### 2. Run the container

```bash
docker run --rm secure-app:v1
```

---

## 🔍 Check Running User

```bash
docker run -it secure-app:v1 whoami
```

👉 Output:

```
repl
```

---

## ⚠️ Common Mistakes

❌ Running everything as root
❌ Not using WORKDIR (messy paths)
❌ Installing after switching USER
❌ Not setting file permissions

---

## ✅ Best Practices Summary

* Use `WORKDIR` instead of long paths
* Install packages as root, then switch user
* Use `USER` to improve security
* Keep Dockerfile clean and readable
* Use `--rm` to avoid leftover containers

---

## 📊 Commands Summary

| Command / Dockerfile    | Purpose                               |
| ----------------------- | ------------------------------------- |
| `USER repl`             | Runs container as non-root user       |
| `WORKDIR /app`          | Sets working directory                |
| `COPY . .`              | Copies files into working directory   |
| `RUN apt-get update`    | Installs dependencies                 |
| `docker build -t image` | Builds Docker image                   |
| `docker run image`      | Runs container                        |
| `docker run --rm image` | Runs and removes container after stop |
| `whoami`                | Checks current user inside container  |

---



---

[⬅ Previous: Day 11 Dockerfile Commands](../11-dockerfile-commands/) | [Next ➡ Day 13 Docker Caching](../13-docker-caching/)
