# 18-advanced-images

## Day 18 Advanced Images

---

### Learning Objectives (Summary)

By the end of this day, you will understand:

1. **What Docker Images Are** – Blueprints for containers containing applications, libraries, and dependencies  
2. **Why Image Optimization Matters** – Reduce size, improve security, simplify updates  
3. **When to Optimize Images** – For production, multi-container apps, and frequent updates  
4. **How to Optimize Images** – Split containers, use minimal base images, leverage caching layers  
5. **Practical Considerations** – Layer caching, image size inspection, and maintainability  

---

### What are Docker Images?

- Docker images are **read-only templates** used to create containers.  
- Each image contains **all required filesystem, applications, libraries, and dependencies** for the container.  
- Running `docker run <image>` creates a **container instance** with a writable layer on top of the image.  
- Images are **composed of layers**, each representing a Dockerfile instruction (`RUN`, `COPY`, `ADD`).  

> Docker images ensure consistency across environments and simplify deployments.  

---

### Why Optimize Docker Images?

- Large images are **hard to maintain**, **slow to deploy**, and **consume more bandwidth**.  
- Security risks increase if images contain unused or outdated software.  
- Updating a monolithic image requires **rebuilding and redeploying the entire image**, even for small changes.  
- Optimized images are **smaller, reusable, and easier to update**.  

---

### When to Optimize Docker Images

- Multi-container applications (e.g., web + API + database)  
- Images with frequent updates to a single component  
- Production deployments where **image size and security** are critical  
- Scenarios requiring **fast deployment and minimal resource usage**  

---

### How to Optimize Docker Images

- **Split services** into separate containers (database, web server, ETL/application)  
- **Use minimal base images** (e.g., `alpine`, `python:slim`)  
- **Leverage layer caching**: place frequently changing instructions last to avoid invalidating earlier layers  
- **Update components selectively** without rebuilding unrelated containers  

---

### Key Commands

| Command | Purpose |
|---------|---------|
| `docker images` | List images and view their size |
| `docker image inspect <image>` | Inspect image layers and metadata |
| `docker rmi <image>` | Remove an image |
| `docker build -t <name>:<tag> .` | Build an image from a Dockerfile |
| `docker history <image>` | Show layers and size of an image |

---

### Summary Table: Docker Image Optimization

| Concept | Why | When | Example |
|---------|-----|------|---------|
| Split containers | Reduce size & improve maintainability | Multi-service applications | Separate DB, web server, ETL |
| Minimal base image | Smaller images, faster deployment | Production | `alpine` or `python:slim` |
| Layer caching | Faster rebuilds | Frequent code changes | COPY requirements first, app code last |
| Reusable components | Easier updates and security | Large projects | Update ETL container without touching DB |

---


- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)  



---

[⬅ Previous: Day 17 Docker Networks](../17-docker-networks/) | [Next ➡ Day 19 Multistage Builds](../19-multistage-builds/)
