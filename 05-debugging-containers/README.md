# 05-debugging-containers
## Day 5 Debugging Containers

### By the end of this day, you should be able to:

- Understand how to debug Docker containers
- Inspect container logs to find errors
- Access a running container's shell
- Inspect container configuration
- Monitor container processes

---

# What is Container Debugging?

Container debugging is the process of **finding and fixing issues inside a Docker container**.

Sometimes containers may:

- Fail to start
- Stop unexpectedly
- Produce errors
- Not expose expected ports
- Crash due to application errors

Docker provides several **CLI tools to inspect and debug containers**.

---

# Common Docker Debugging Commands

## 1 Inspect Container Logs

```bash
docker logs CONTAINER_NAME

```
| Command                        | Purpose                               |
| ------------------------------ | ------------------------------------- |
| `docker logs CONTAINER`        | Show container logs                   |
| `docker logs -f CONTAINER`     | Follow logs in real time              |
| `docker inspect CONTAINER`     | View detailed container configuration |
| `docker exec -it CONTAINER sh` | Access container terminal             |
| `docker top CONTAINER`         | Show running processes in container   |
| `docker stats`                 | Monitor container resource usage      |

---

[⬅ Previous: Day 4 Container Management](../04-container-management/) | [Next ➡ Day 6 Cleaning Containers](../06-cleaning-containers/)
