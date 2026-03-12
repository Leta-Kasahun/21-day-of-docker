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

### 1️⃣ List Containers

**List running containers:**

```bash
docker ps
```
---
[⬅ Previous: Day 3 Running Docker Containers](../03-running-docker-containers/) | [Next ➡ Day 5 Debugging Containers](../05-debugging-containers/)
