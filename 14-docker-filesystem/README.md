# 14-docker-filesystem
## Day 14 Docker Filesystem

### By the end of this day, you should be able to:
- Understand Docker container filesystem structure  
- Share data between host and containers  
- Use bind mounts and volumes effectively  
- Run temporary containers for development/testing  
- Access and inspect container files and directories  

---

## 1. Intermediate Docker Commands

### Common Docker commands for filesystem and container management
```bash
docker --help           # Show all docker commands
docker COMMAND --help   # Show detailed options for a specific command
docker run --help       # Show run command options
docker ps               # List running containers
docker ps -a            # List all containers including stopped
docker stop <container> # Stop a running container
docker rm <container>   # Remove stopped container
docker run --rm <image> # Run temporary container that deletes itself on exit
docker build -t myapp . # Build an image from Dockerfile
```
## Docker Filesystem Explained

In Docker, **every container has its own isolated filesystem**. Think of it as a **self-contained “virtual hard drive”** for that container. This filesystem is **based on the image** you use to create the container, and any changes you make inside the container are **initially private to that container**.

### Key Points

1. **Isolation**  
   - Containers are **sandboxed**.  
   - Changes in one container do **not affect other containers** or the host system.  

2. **Image-based starting point**  
   - The container’s filesystem starts as a copy of the Docker **image**.  
   - The image defines the OS, installed packages, and any files you included via the Dockerfile.  

3. **Persistence**  
   - Changes inside the container **persist only for that container**.  
   - If you delete the container, those changes are lost unless you use **volumes or bind mounts**.  

4. **Ephemeral nature**  
   - By default, containers are temporary.  
   - Restarting a container keeps its filesystem intact **only if the container is not removed**.  
   - Using `docker run --rm` will delete the container and its filesystem after it exits.  

5. **Writable layers**  
   - Docker uses a **layered filesystem**:
     - **Read-only layers:** Created from the image.  
     - **Writable layer:** Container-specific changes go here.  

---

### Example

```bash
docker run -it ubuntu bash
```
## Mounting the Host Filesystem

### Container Filesystems

Each Docker container has its **own isolated filesystem**, created from the image it was based on.  

- **Changes made inside a container** are tied to that container instance.  
- These changes **persist across restarts** of the same container.  
- **New containers** created from the same image will **not have instance-specific changes**; they start fresh from the image.  

> This ensures containers are isolated, reproducible, and can be safely deleted or replaced without affecting the host or other containers.

---

### Sharing Files or Directories (Bind Mounts)

To persist data outside the container or share files with the host system, you can **attach host files or directories** to the container.  

**Benefits:**

- Persist data independently of container lifecycle  
- Safely upgrade or replace container versions without losing host data  
- Can be **read-only** or **read/write**  

> Note: Files or directories attached to a running container **are not visible to the host until the container is stopped**.

---

### Using the `-v` Option

Bind mounts are most often created using the `-v` flag:

```bash
# Mount a host HTML directory into an nginx container
docker run -v ~/html:/var/www/html nginx

# Mount PostgreSQL data directory and configuration file
docker run \
  -v ~/pgdata:/opt/data \
  -v ~/pg.conf:/etc/pg.conf \
  postgresql
```
## Summary: Must-Know Commands for Filesystem & Containers
| Task                              | Command                                                                |
| --------------------------------- | ---------------------------------------------------------------------- |
| Show all docker commands          | `docker --help`                                                        |
| Show specific command help        | `docker run --help`                                                    |
| List running containers           | `docker ps`                                                            |
| List all containers               | `docker ps -a`                                                         |
| Stop a container                  | `docker stop <container>`                                              |
| Remove a container                | `docker rm <container>`                                                |
| Run temporary container           | `docker run --rm <image>`                                              |
| Mount host directory (bind mount) | `docker run -v ~/hostdir:/containerdir <image>`                        |
| Alternative mount syntax          | `docker run --mount type=bind,source="$(pwd)"/app,target=/app <image>` |


---

[⬅ Previous: Day 13 Docker Caching](../13-docker-caching/) | [Next ➡ Day 15 Docker Volumes](../15-docker-volumes/)
