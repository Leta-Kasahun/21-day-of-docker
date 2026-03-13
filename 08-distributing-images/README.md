## 08-distributing-images
## Day 8 Distributing Images

### By the end of this day, you should be able to:

- Understand how to share Docker images across systems
- Learn how to push images to Docker Hub or private registries
- Pull images from remote repositories
- Tag images correctly for distribution
- Understand versioning and naming conventions for images

---

### What is Image Distribution?

Docker images can be shared between developers, servers, or CI/CD pipelines by **pushing to remote registries**.  
This allows consistent environments across different machines without rebuilding from scratch.

---
## Docker Image Distribution Methods

Docker images can be shared between systems in **two main ways**:

1. **Using Docker registries (Docker Hub, private registry)**
2. **Using exported image files (.tar)**

Both methods are used in real-world environments depending on network access, security, and deployment requirements.

---

# 1 Docker Pull

### What it does
Downloads an image from a **remote registry** (like Docker Hub) to your local machine.

### Why it is used
Allows developers and servers to **get the same application environment quickly**.

### When to use
- Setting up a new environment
- Deploying applications on a new server
- Running official images like Node, PostgreSQL, or Redis

### Real-world example
A developer pulls an image from Docker Hub instead of building the application manually.

---

# 2 Docker Push

### What it does
Uploads your **local Docker image** to a remote registry.

### Why it is used
So other developers, servers, or CI/CD pipelines can download and run the same image.

### When to use
- Sharing applications with your team
- Deploying applications to cloud servers
- Publishing images to Docker Hub

### Real-world example
A team builds an image locally and pushes it so production servers can pull it.

---

# 3 Docker Tag

### What it does
Creates a **new name or version label** for an image.

### Why it is used
Helps manage **versions of applications**.

### When to use
- Before pushing images to a registry
- When creating multiple versions of an application

### Real-world example
A project may have:

- app:v1.0
- app:v2.0
- app:latest

---

# 4 Docker Save

### What it does
Exports a Docker image into a **.tar file**.

### Why it is used
Allows transferring images **without using a registry**.

### When to use
- Offline environments
- Secure networks without internet access
- Moving images between servers manually

### Real-world example
A company server without internet receives the image through a USB drive.

---

# 5 Docker Load

### What it does
Imports a Docker image from a **.tar file** back into Docker.

### Why it is used
Restores an image that was exported using `docker save`.

### When to use
- Installing images in offline environments
- Deploying applications in isolated networks

---

# Real World Image Distribution Workflow

### Method 1: Using Docker Hub (Most Common)

Developer machine:

1. Build image
2. Tag image
3. Push image

Production server:

4. Pull image
5. Run container

---

### Method 2: Offline Distribution

Machine A:

1. Save image to `.tar`

Transfer file manually.

Machine B:

2. Load image
3. Run container

---

# Summary Table

| Command | Purpose | Real World Use |
|-------|--------|--------|
| docker pull | Download image from registry | Deploy apps from Docker Hub |
| docker push | Upload image to registry | Share images with teams |
| docker tag | Add name/version to image | Version control |
| docker save | Export image to `.tar` file | Offline transfer |
| docker load | Import image from `.tar` | Install image offline |

---

# Key Idea

Docker images must be **distributed** so that:

- Developers
- CI/CD pipelines
- Cloud servers
- Production environments

can run **exactly the same application environment** without rebuilding the software.
---

[⬅ Previous: Day 7 Managing Docker Images](../07-managing-docker-images/) | [Next ➡ Day 9 Writing Dockerfiles](../09-writing-dockerfiles/)
