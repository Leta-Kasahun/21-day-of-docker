# 03-running-docker-containers

## By the end of this day , you should able to:
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


```
- docker run creates and starts a container.

- hello-world is a small test image provided by Docker.

- Docker downloads the image (if not available locally), creates a container, and runs it.
----
### Run a Detached Container (Backend API)

```bash
teku@DESKTOP-E6CA0FQ:~$ docker run -d postgres
41200eea4ba8d8422188232860a42813c07e5fc721f0708d8322d31c0097af84
```

| Part | Meaning |
|------|--------|
| `docker run` | Create and start a container |
| `-d` | Run the container in detached mode (background) |
| `postgres` | Name of the Docker image |

```bash
teku@DESKTOP-E6CA0FQ:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
postgres     latest    52ea5ef23f82   11 days ago   456MB
ubuntu       latest    bbdabce66f1b   3 weeks ago   78.1MB
teku@DESKTOP-E6CA0FQ:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
teku@DESKTOP-E6CA0FQ:~$ docker ps -a
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS                     PORTS     NAMES
fdc4d231e8d8   postgres   "docker-entrypoint.s…"   2 minutes ago   Exited (1) 2 minutes ago             quirky_payne
c6a2f7dc6cdc   postgres   "docker-entrypoint.s…"   2 minutes ago   Exited (1) 2 minutes ago             heuristic_mcclintock
e2d1b9bf8b78   postgres   "docker-entrypoint.s…"   3 minutes ago   Exited (1) 3 minutes ago             stoic_snyder
83a22c775877   ubuntu     "/bin/bash"              6 minutes ago   Exited (0) 6 minutes ago             competent_faraday
teku@DESKTOP-E6CA0FQ:~$ docker run -it ubuntu
root@3ae94f5cb0ba:/# exit
exit
teku@DESKTOP-E6CA0FQ:~$
```
- docker images lists all Docker images stored locally on your machine.

- Each row represents an image that can be used to create containers
- docker ps shows only currently running containers.

- In this case, there are no running containers, so the list is empty.
- docker ps -a shows all containers, including stopped ones.
-The STATUS column shows if the container is running or stopped.
- -it allows interactive terminal access.
- ubuntu is the Docker image used to create the container.
- Inside the container, you are logged in as root.
- exit stops the container and returns to the host system.
## Docker CLI Command Summary

| Command | Description |
|--------|-------------|
| `docker run <image>` | Create and run a container from an image |
| `docker run -d <image>` | Run container in background (detached mode) |
| `docker run -it <image>` | Run container interactively with terminal |
| `docker images` | List available images |
| `docker ps` | List running containers |
| `exit` | Exit interactive container |

---

[⬅ Previous: Day 2 Docker Installation](../02-docker-installation/) | [Next ➡ Day 4 Container Management](../04-container-management/)
