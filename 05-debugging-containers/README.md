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
### View logs
```bash
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker logs app1
(node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
Using sqlite database at /etc/todos/todo.db
Listening on port 3000
```
### Docker Container Terminal Access – Brief Explanation
```bash
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker exec -it app1 sh
/app # 
```

- **docker exec**  
  Allows you to run a command inside a container that is already running. It is commonly used for debugging or inspecting the container environment.

- **-it**  
  Combines two options:
  - **-i (interactive)** keeps the input open so you can type commands.
  - **-t (tty)** creates a terminal interface so the container behaves like a normal shell.

- **sh**  
  A lightweight Linux shell used to execute commands inside the container. Many minimal Docker images use `sh` instead of `bash`.

- **Result**  
  When you run this, you enter the container's terminal and can explore files, run commands, and debug the application running inside the container.
 ### Monitor resources 
 ```bash
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-jourteku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ d
ocker logs app1
(node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implicationsCONTAINER ID   NAME        CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O         PIDS
3c5e38051897   app1        0.00%     24.41MiB / 7.645GiB   0.31%     872B / 126B     45.1kB / 28.7kB   11
739cd5f4b3a8   myapp-dev   0.00%     24.35MiB / 7.645GiB   0.31%     1.55kB / 126B   0B / 16.4kB       11

```
| Command                        | Purpose                               |
| ------------------------------ | ------------------------------------- |
| `docker logs CONTAINER`        | Show container logs                   |
| `docker logs -f CONTAINER`     | Follow logs in real time              |
| `docker inspect CONTAINER`     | View detailed container configuration |
| `docker exec -it CONTAINER sh` | Access container terminal             |
| `docker top CONTAINER`         | Show running processes in container   |
| `docker stats`                 | Monitor container resource usage      |

## Key Takeaways

- Logs are the first place to check when containers fail

- docker exec helps you access the container environment

- docker inspect reveals internal container configuration

- docker stats helps monitor resource usage

Debugging containers is an essential DevOps skill for troubleshooting production systems
---

[⬅ Previous: Day 4 Container Management](../04-container-management/) | [Next ➡ Day 6 Cleaning Containers](../06-cleaning-containers/)
