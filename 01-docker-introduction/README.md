# 01-docker-introduction
## Day 1 Docker Learning

### Useful Links
- [Docker Official Docs](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Cheat Sheet](https://dockerlabs.collabnix.com/docker/cheatsheet/)

---

# What is Docker?

Docker is an open platform for developing, shipping, and running applications.  
It solves common problems in software development and deployment:

- **Environment differences** – "It works on my machine" issues disappear because containers package everything an application needs.  
- **Complex deployments** – Docker simplifies deployment by standardizing application environments.  
- **Resource inefficiency** – Containers are lightweight, allowing more workloads on the same hardware than traditional virtual machines.  

**When we need Docker:**  
- To **develop and test** applications in consistent environments.  
- To **deploy applications** quickly across different systems or cloud providers.  
- To **scale applications** efficiently without worrying about underlying OS differences.  

## Docker Platform

- Packages applications and dependencies into **containers**.  
- Containers are **isolated, lightweight, and portable**.  
- Supports **development, testing, and production** workflows consistently.

## Docker Components

### Docker Daemon (`dockerd`)  
- Runs in the background and manages Docker **containers, images, networks, and volumes**.  
- Handles requests from Docker clients.

### Docker Client (`docker`)  
- Command-line tool to interact with Docker daemon.  
- Examples: `docker run`, `docker build`, `docker pull`.

### Docker Desktop  
- All-in-one application for Mac, Windows, or Linux.  
- Includes Docker daemon, client, Docker Compose, Kubernetes, and credential management.

### Docker Registries

Docker registries store Docker images for sharing and reuse.  

- **Docker Hub** is the default public registry where you can **find, store, and share Docker images**.  
- **Private registries** can be used for internal projects or secure deployments.  
- Docker Hub and other registries allow **easy distribution of images** to any system running Docker.

### Docker Objects

- **Images** – Read-only templates used to create containers. Can be built with a `Dockerfile`.  
- **Containers** – Runnable instances of images. Can be **started, stopped, moved, or removed**.  
- **Networks** – Connect containers together or to external networks.  
- **Volumes** – Persist data outside containers.
---

[⬅ Previous: Overview](../README.md) | [Next ➡ Day 2 Docker Installation](../02-docker-installation/)
