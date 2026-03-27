# 13-docker-caching
## Day 13 Docker Caching

### By the end of this day, you should be able to:

- Understand what Docker caching is and why it exists  
- Learn how Docker reuses image layers to speed up builds  
- Write Dockerfiles to take advantage of caching for faster builds  
- Understand how file changes affect cache invalidation  

---

### What is Docker Caching?

- Docker builds images in **layers**.  
- Each instruction in a Dockerfile creates a new layer.  
- Layers that haven’t changed are **cached**, so Docker doesn’t rebuild them every time.  

**Example: Re-running a build with no changes**

- Every layer is reused if nothing has changed, which makes builds **much faster**.  

---

### When Docker Cache Changes

- If an instruction changes, Docker **invalidates the cache** for that layer and all layers after it.  
- Docker **cannot automatically detect** new versions of packages; it only looks at the instruction and the file contents.  

**Example: Only one instruction changes**
```dockerfile
FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3
COPY /app/pipeline.py /app/pipeline.py
```
| Command                                   | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `docker build -t myapp:v1.0 .`            | Build the Docker image                   |
| `docker build --no-cache -t myapp:v1.0 .` | Force rebuild all layers, ignoring cache |
| `docker history myapp:v1.0`               | View layers and see which are cached     |
| `docker system df`                        | Check image and layer sizes on disk      |

---

[⬅ Previous: Day 12 Docker Security](../12-docker-security/) | [Next ➡ Day 14 Docker Filesystem](../14-docker-filesystem/)
