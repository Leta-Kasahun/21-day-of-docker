# 01-docker-introduction
## Day 1 Docker Learning

### Useful Links
- [Docker Official Docs](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Cheat Sheet](https://dockerlabs.collabnix.com/docker/cheatsheet/)

---

# What is Docker?

Docker is an **OS-level virtualization platform**, also called **containerization**, that allows applications to run in isolated environments called **containers**.  
Unlike traditional virtual machines, Docker containers **share the host OS kernel** rather than running a full guest OS, which makes them:

- **Lightweight** – uses fewer resources than VMs.  
- **Fast** – starts almost instantly.  
- **Portable** – can run on any system with Docker installed.  
- **Isolated** – each container has its own environment, preventing conflicts between apps.  

Docker solves common development and deployment problems:  

- **"It works on my machine" issues** – containers include all dependencies and configurations.  
- **Complex deployments** – standardizes app environments across development, testing, and production.  
- **Resource inefficiency** – allows running multiple applications on the same host efficiently.

---
**When we need Docker:**  
- To **develop and test** applications in consistent environments.  
- To **deploy applications** quickly across different systems or cloud providers.  
- To **scale applications** efficiently without worrying about underlying OS differences.  

## Docker Platform

- Packages applications and dependencies into **containers**.  
- Containers are **isolated, lightweight, and portable**.  
- Supports **development, testing, and production** workflows consistently.

## Docker Components

---

## 1. Docker Engine
The **Docker Engine** is the core component that enables Docker to run containers on a system.  
It follows a **client-server architecture** and is responsible for **building, running, and managing Docker containers**.

- **Docker Daemon (`dockerd`)**  
  - Runs in the background and listens for Docker API requests.  
  - Manages Docker objects such as **images, containers, networks, and volumes**.  

- **Docker Client (`docker CLI`)**  
  - Communicates with the Docker Daemon via a REST API.  
  - Provides commands to **build, run, stop, or remove containers**.  
  - Example commands: `docker run`, `docker build`, `docker pull`.

---

## 2. Docker Image
- A **read-only template** used to create containers.  
- Contains:
  - Application code  
  - Dependencies  
  - Runtime environment  
- Can be **built from scratch** or based on an existing image.  
- Built using a **Dockerfile**, making image creation automated and repeatable.

---

## 3. Docker Container
- A **runnable instance of a Docker Image**.  
- Encapsulates the application and its environment in a **portable, isolated unit**.  
- Containers can be **started, stopped, moved, or removed** easily.  
- Containers solve the **“It works on my machine”** problem by ensuring consistency across environments.

---

## 4. Dockerfile
- A **text file with step-by-step instructions** to build a Docker Image.  
- Defines:
  - Base image  
  - Application code  
  - Dependencies  
  - Commands to execute inside the container  

---

## 5. Docker Registry
- A **storage and distribution system** for Docker images.  
- Can be **public or private**.  
- Allows sharing, storing, and versioning of images for reuse across multiple systems.

---

## 6. Docker Hub
- A **cloud-based public Docker registry**.  
- Features:
  - Search, find, and download container images.  
  - Upload and share your own images with the community or privately.  
- Acts as the default registry for Docker, simplifying **image distribution and collaboration**.
## Docker Desktop  
- All-in-one application for Mac, Windows, or Linux.  
- Includes Docker daemon, client, Docker Compose, Kubernetes, and credential management.
  

---

### Docker Objects

- **Images** – Read-only templates used to create containers. Can be built with a `Dockerfile`.  
- **Containers** – Runnable instances of images. Can be **started, stopped, moved, or removed**.  
- **Networks** – Connect containers together or to external networks.  
- **Volumes** – Persist data outside containers.
---

[⬅ Previous: Overview](../README.md) | [Next ➡ Day 2 Docker Installation](../02-docker-installation/)
