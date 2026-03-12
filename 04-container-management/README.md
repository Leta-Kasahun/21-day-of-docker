# 04-container-management
## Day 4 Container Management

### By the end of this day , you should be able to: 

- Understand container lifecycle and states

- Learn how to start, stop, restart, and remove containers

- Manage multiple containers efficiently

- Use Docker CLI commands for container management

- Understand container naming and labeling

### What is Container Management?
Container management refers to controlling the lifecycle and behavior of containers after they're created. Just like managing running applications on your computer, containers need to be:

- Started and stopped

- Paused and resumed

- Restarted when needed

- Removed when no longer needed

- Monitored for resource usage

- Container Lifecycle States

---

Containers are **instances of images**. You can have **multiple containers from the same image**, each running independently.

---
###Container Lifecycle States
```bash
┌─────────────┐
│   CREATED   │  ← Container created but not running
└─────────────┘
       │
       ▼
┌─────────────┐
│   RUNNING   │  ← Container actively running
└─────────────┘
       │
   ┌───┴───┐
   ▼       ▼
┌─────────┐ ┌─────────┐
│ PAUSED  │ │ STOPPED │ ← Processes frozen  ← Container stopped but exists
└─────────┘ └─────────┘
       │         │
       └───┬─────┘
           ▼
    ┌─────────────┐
    │   REMOVED   │  ← Container deleted
    └─────────────┘
```
## Basic Docker Commands for Container Management


**Build images to demonstrates container managements**

```bash
nal/04-container-management/getting-started-app$ docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker build -t myapp:v1.0 .
[+] Building 12.5s (11/11) FINISHED              docker:default
 => [internal] load build definition from Dockerfile       0.1s
 => => transferring dockerfile: 149B                       0.0s
 => [internal] load metadata for docker.io/library/node:l  6.0s
 => [auth] library/node:pull token for registry-1.docker.  0.0s
 => [internal] load .dockerignore                          0.1s
 => => transferring context: 64B                           0.0s
 => [1/4] FROM docker.io/library/node:lts-alpine@sha256:7  3.4s
 => => resolve docker.io/library/node:lts-alpine@sha256:7  3.4s
 => [internal] load build context    
```
| Part | Type | Description |
|-----|------|-------------|
| `docker build` | Command | Tells Docker to build a new image from a Dockerfile |
| `-t` | Flag (tag) | Assigns a name and optional version tag to the image |
| `myapp:v1.0` | Tag Value | Image name = **myapp**, version/tag = **v1.0** |
| `.` | Path | Specifies the build context (current directory containing the Dockerfile and app files) |

```bash
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
myapp        v1.0      33a06792e235   48 minutes ago   389MB
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker run -d --name myapp-dev -p 3001:3000 myapp:v1.0
739cd5f4b3a81c45a52af949f6fdc3700e8d0cfe9aa85cdc9a2b5fdb404fc8b8
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker run -d --name myapp-prod -p 3002:3000 myapp:v1.0
ca29ec3683be888ecd0825db09a88fb61b64efaebf3a600cacbf42ffa5935ab4
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                                         NAMES
ca29ec3683be   myapp:v1.0   "docker-entrypoint.s…"   7 seconds ago    Up 6 seconds    0.0.0.0:3002->3000/tcp, [::]:3002->3000/tcp   myapp-prod
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   28 seconds ago   Up 27 seconds   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker stop myapp-prod
myapp-prod
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                         NAMES
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker start myapp-prod
myapp-prod
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                         NAMES
ca29ec3683be   myapp:v1.0   "docker-entrypoint.s…"   2 minutes ago   Up 4 seconds   0.0.0.0:3002->3000/tcp, [::]:3002->3000/tcp   myapp-prod
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker pause myapp-dev
myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS                  PORTS                                         NAMES
ca29ec3683be   myapp:v1.0   "docker-entrypoint.s…"   3 minutes ago   Up 35 seconds           0.0.0.0:3002->3000/tcp, [::]:3002->3000/tcp   myapp-prod
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   3 minutes ago   Up 3 minutes (Paused)   0.0.0.0:3001->3000/tcp                        myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker unpause myapp-dev
myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS              PORTS                                         NAMES
ca29ec3683be   myapp:v1.0   "docker-entrypoint.s…"   3 minutes ago   Up About a minute   0.0.0.0:3002->3000/tcp, [::]:3002->3000/tcp   myapp-prod
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes        0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learningteku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker stop myapp-prod
myapp-prod
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker rm myapp-prod
myapp-prod
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                         NAMES
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   myapp-dev
teku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ docker ps -a
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                         NAMES
739cd5f4b3a8   myapp:v1.0   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:3001->3000/tcp, [::]:3001->3000/tcp   myateku@DESKTOP-E6CA0FQ:~/docker-docs/docker-datacamp-learning-journal/04-container-management/getting-started-app$ rning-journal/04-con
```
| Command | Purpose |
|--------|---------|
| `docker images` | List all Docker images |
| `docker run -d --name NAME -p HOST:CONTAINER IMAGE` | Run a container in background |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop CONTAINER` | Stop a running container |
| `docker start CONTAINER` | Start a stopped container |
| `docker pause CONTAINER` | Pause a running container |
| `docker unpause CONTAINER` | Resume a paused container |
| `docker rm CONTAINER` | Remove a container |
---
[⬅ Previous: Day 3 Running Docker Containers](../03-running-docker-containers/) | [Next ➡ Day 5 Debugging Containers](../05-debugging-containers/)
