# 01-docker-introduction
## Day 1 Docker Learning

### Useful Links
- [Docker Official Docs](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Cheat Sheet](https://dockerlabs.collabnix.com/docker/cheatsheet/)
---

# What is Docker?

- Docker is an **OS-level virtualization platform**, also called **containerization**, that allows applications to run in isolated environments called **containers**.  
Unlike traditional virtual machines, Docker containers **share the host OS kernel** rather than running a full guest OS, which makes them:
- Docker is a **platform for containerization**, which means it allows you to package an application along with **all its dependencies, libraries, and environment** into a single unit called a **container**.

Think of it like a **portable box** that contains everything your app needs to run—so it will work the same way **on your computer, on a colleague’s laptop, or on a server in the cloud**.

**Key idea:**  
Instead of installing software directly on your computer and worrying about versions or conflicts, you just run it inside a container.

---

## What problems does Docker solve?

Docker solves **common issues in software development and deployment**:

### a) Environment differences

- **Problem:** “It works on my machine”  
  Different computers have different OS versions, installed libraries, or dependencies, which cause apps to break when moving from one machine to another.  
- **Docker solution:** The container **includes everything the app needs**, so it behaves the same everywhere.

### b) Complex deployments

- **Problem:** Setting up servers and environments is slow and error-prone.  
- **Docker solution:** Containers are **self-contained and portable**, so deployment becomes simple and consistent.

### c) Resource inefficiency

- **Problem:** Traditional virtual machines are heavy and consume a lot of resources because each VM runs a full OS.  
- **Docker solution:** Containers **share the host OS kernel**, making them **lightweight, fast, and able to run multiple containers** on the same hardware.

---

##  How does Docker solve these problems?

- **Isolation:** Each container runs separately, so apps don’t interfere with each other.  
- **Portability:** Move containers across computers or cloud environments without changes.  
- **Consistency:** Same container → same app behavior on any machine.  
- **Efficiency:** Lightweight containers let you run more apps on less hardware compared to VMs.

---

##  What happens when you use Docker?

1. You **create a Docker image**, which is a blueprint of your app + environment.  
2. You **run a container** from this image.  
3. The container is **isolated, has everything it needs**, and behaves the same wherever it runs.  
4. You can **stop, restart, or delete containers** without affecting your host system.  
5. You can **share the image** via Docker Hub or a private registry, so others can run it instantly.
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
