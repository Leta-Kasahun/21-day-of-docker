# 06-cleaning-containers
## Day 6 Cleaning Containers
### By the end of this day, you should be able to:

- Understand how to remove stopped containers  
- Learn how to clean up unused or dangling containers  
- Manage system resources effectively  
- Use Docker CLI commands for cleaning containers  

### Why Cleaning Containers is Important

Over time, stopped or unused containers can take up disk space and system resources. Cleaning them regularly ensures a tidy and efficient Docker environment.

### Container Cleaning Concepts

- **Stopped Containers** – Containers that are not running but still exist  
- **Dangling Containers** – Containers without names or references  
- **Pruning** – Removing all stopped or unused containers in bulk  

### Key Docker Commands for Cleaning Containers

**docker ps -a** – List all containers including stopped ones  
**docker stop CONTAINER** – Stop a running container  
**docker rm CONTAINER** – Remove a container permanently  
**docker container prune** – Remove all stopped containers at once  

### Notes

- Always ensure important data is saved before removing containers  
- Pruning is irreversible  
- Helps maintain disk space and avoid clutter  

---

| Resource           | Prune Command                      | Notes                                                             |
| ------------------ | ---------------------------------- | ----------------------------------------------------------------- |
| Stopped Containers | `docker container prune`           | Safe, interactive confirmation                                    |
| Dangling Images    | `docker image prune`               | Only removes untagged images by default                           |
| Unused Networks    | `docker network prune`             | Only removes networks not used by containers                      |
| Unused Volumes     | `docker volume prune`              | **Caution:** can delete persistent data                           |
| Everything         | `docker system prune`              | Stops containers, removes dangling images, unused networks, cache |
| Full Cleanup       | `docker system prune -a --volumes` | Removes everything including volumes                              |

- Stopped Containers – Containers that are no longer running but still exist in the system.

- Dangling Images – Images that are untagged or not used by any container.

- Unused Networks – Networks created by Docker but not currently attached to any container.
---

[⬅ Previous: Day 5 Debugging Containers](../05-debugging-containers/) | [Next ➡ Day 7 Managing Docker Images](../07-managing-docker-images/)
