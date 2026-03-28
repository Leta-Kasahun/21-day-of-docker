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
