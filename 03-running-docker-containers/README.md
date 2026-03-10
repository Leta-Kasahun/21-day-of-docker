# 03-running-docker-containers

## Goal of Day 3
- Understand what **Docker containers** are.
- Learn how to **run, start, and list containers**.
- Practice **basic Docker CLI commands**.
- Understand the relationship between **Docker images and containers**.

---

# What are Docker Containers?

A **Docker container** is a **runtime instance of a Docker image**.

- A **Docker image** is a **blueprint or template**.
- A **container** is the **running instance created from that blueprint**.

This means:

- One **image** can create **multiple containers**.
- Each container runs independently but is based on the same image.

### Example

Think of it like this:

| Concept | Real World Example |
|------|------|
| Docker Image | A blueprint of a house |
| Docker Container | A house built from the blueprint |

You can build **many houses from one blueprint**, just like you can run **many containers from one Docker image**.

---

## What a Container Includes

A container packages everything needed to run an application:

- Application code
- Runtime
- Libraries
- Dependencies
- System tools

Containers are:

- **Lightweight**
- **Portable**
- **Isolated**
- **Fast to start**

Containers **share the host operating system kernel**, which makes them much lighter than virtual machines.

---

# Practical Docker Commands

## Step 1 – Test Docker Installation
```bash
teku@DESKTOP-E6CA0FQ:~$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

---
```
- docker run creates and starts a container.

- hello-world is a small test image provided by Docker.

- Docker downloads the image (if not available locally), creates a container, and runs it.
----
### Run a Detached Container (Backend API)

```bash
teku@DESKTOP-E6CA0FQ:~$ docker run -d full-stack-api
```
41200eea4ba8d8422188232860a42813c07e5fc721f0708d8322d31c0097af84
-docker run → creates and starts a new container.

- -d → detached mode, runs the container in the background.
-full-stack-api → the Docker image being run
---
[⬅ Previous: Day 2 Docker Installation](../02-docker-installation/) | [Next ➡ Day 4 Container Management](../04-container-management/)
