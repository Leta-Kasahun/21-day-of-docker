# 03-running-docker-containers
## Day 3 Running Docker Containers

### Goal of Day 3
- Understand what **containers** are.
- Learn how to **run, start and lists container**.
- Practice **basic Docker commands** and interactive containers.

---

##  What are Docker Containers?

- A **container** is a **lightweight, standalone, executable package**.
- It contains:
  - Application code
  - Runtime environment
  - Libraries and dependencies
  - System tools needed to run the app
- Containers **share the host OS kernel** but are isolated from each other.
- Containers are **portable, fast, and consistent** across environments.

---

## Practical Docker Commands

### Step 1 – Test Docker Installation
```bash
teku@DESKTOP-E6CA0FQ:~$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.
---
```
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
