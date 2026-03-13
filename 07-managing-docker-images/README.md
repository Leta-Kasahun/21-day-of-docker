# 07-managing-docker-images
## Day 7 Managing Docker Images

### By the end of this day, you should be able to:

- Understand what Docker images are
- List and inspect Docker images
- Tag images for version control
- Remove unused images
- Manage images efficiently in development and production

---

## What are Docker Images?

A **Docker image** is a **read-only template** used to create containers.

It contains everything needed to run an application:

- Application code
- Runtime (Node.js, Python, Java, etc.)
- System libraries
- Dependencies
- Environment configuration

Containers are **instances of images**.

Example:

One image → Multiple containers

---

## Basic Image Management Commands


```bash
teku@DESKTOP-E6CA0FQ:~$ docker pull node:20-alpine
20-alpine: Pulling from library/node
589002ba0eae: Pull complete
ed2fdcee5269: Pull complete
7ad115895a6a: Pull complete
9d10d4687fae: Pull complete
Digest: sha256:b88333c42c23fbd91596ebd7fd10de239cedab9617de04142dde7315e3bc0afa
Status: Downloaded newer image for node:20-alpine
docker.io/library/node:20-alpine
teku@DESKTOP-E6CA0FQ:~$ docker images
REPOSITORY   TAG         IMAGE ID       CREATED       SIZE
node         20-alpine   6757e50d3b6b   6 days ago    136MB
postgres     latest      52ea5ef23f82   2 weeks ago   456MB
ubuntu       latest      bbdabce66f1b   4 weeks ago   78.1MB
teku@DESKTOP-E6CA0FQ:~$
```

- **docker pull node:20-alpine**  
  Downloads the **Node.js version 20 on Alpine Linux** image from Docker Hub to your local system.  
  - Each line like `589002ba0eae: Pull complete` represents a **layer of the image** being downloaded.  
  - The **Digest** is a unique SHA256 hash that ensures the image integrity.  
  - After the pull, the image is ready to be used to run containers.

- **docker images**  
  Lists all Docker images currently available locally.  
  - **REPOSITORY** – The name of the image (e.g., `node`).  
  - **TAG** – The version or variant of the image (e.g., `20-alpine`).  
  - **IMAGE ID** – A unique identifier for the image.  
  - **CREATED** – When the image was built or pulled.  
  - **SIZE** – Disk space used by the image.

### Example Breakdown

| Repository | Tag         | Image ID       | Created    | Size   |
|------------|------------|---------------|------------|-------|
| node       | 20-alpine  | 6757e50d3b6b  | 6 days ago | 136MB |
| postgres   | latest     | 52ea5ef23f82  | 2 weeks ago| 456MB |
| ubuntu     | latest     | bbdabce66f1b  | 4 weeks ago| 78.1MB |

**Key Points:**

- Pulled images are stored locally and can be used multiple times for containers.  
- Smaller images like `alpine` are preferred for lightweight and faster container startup.  
- Checking `docker images` helps to see which images are available before running or building containers.
  ```bash
  teku@DESKTOP-E6CA0FQ:~$ docker rmi node:20-alpine
Untagged: node:20-alpine
Untagged: node@sha256:b88333c42c23fbd91596ebd7fd10de239cedab9617de04142dde7315e3bc0afa
Deleted: sha256:6757e50d3b6babac896b5ba3e7acb5219351e6a111bf4dd19974c7b0bd694c1f
Deleted: sha256:b1202c0f2e129d702e73d80ff166691139f0b717fbc6dc1c482954337ed68e5d
Deleted: sha256:c95f5a26a8a839bfb1ffd0f2a106b1a00351c0aab26d87f85d509b5b2a128e4d
Deleted: sha256:2fa7329ba8e2b9163f2d4581b62ced097dcd53dd7b8c394af29a6b521d13b4bc
Deleted: sha256:989e799e634906e94dc9a5ee2ee26fc92ad260522990f26e707861a5f52bf64e
teku@DESKTOP-E6CA0FQ:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
postgres     latest    52ea5ef23f82   2 weeks ago   456MB
ubuntu       latest    bbdabce66f1b   4 weeks ago   78.1MB
teku@DESKTOP-E6CA0FQ:~$ docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] N
teku@DESKTOP-E6CA0FQ:~$ docker image prune -f
Total reclaimed space: 0B
  ```
### When to Use Docker Cleaning Commands & Understanding Dangling Images

---

#### **1. `docker system prune`**
**When to use:**
- You have stopped containers, temporary networks, or build caches that are no longer needed.  
- During development, when testing multiple containers/images, old resources accumulate.  

**Real-world effect:**
- Frees space safely without removing images your containers rely on.  
- Useful for everyday cleanup on a developer machine.

---

#### **2. `docker system prune -a`**
**When to use:**
- You want to **completely remove all unused images** in addition to stopped containers, networks, and cache.  
- When your disk space is limited and you don’t need old images.  

**Real-world effect:**
- More aggressive cleanup. Can break setups if you remove images that are still referenced in Dockerfiles or other projects.  
- Ideal for cleaning CI/CD servers, staging environments, or old projects.

---

#### **3. `docker system prune -f`**
**When to use:**
- You want to automate cleanup without typing `yes` each time.  
- Useful in scripts or CI/CD pipelines.

**Real-world effect:**
- Forces immediate deletion of unused objects.  
- Should be used carefully in production to avoid accidental removal.

---

#### **4. `docker rmi IMAGE`**
**When to use:**
- You want to remove a specific image (old version, unused, or testing image).  
- Useful when updating to a new version of an image to avoid confusion.

**Real-world effect:**
- Frees space for specific images only.  
- Requires stopping/removing containers using that image first.

---

#### **What are Dangling Images?**
- Dangling images are **untagged images** left over after building or updating images.  
- They are **not referenced by any container**.  
- Often occur during iterative builds (`docker build`) where old intermediate layers remain.  



| Command                  | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `docker system prune`    | Remove stopped containers, dangling images, unused networks, build cache |
| `docker system prune -a` | Remove all unused images and unused objects                              |
| `docker system prune -f` | Force prune without confirmation                                         |
| `docker rmi IMAGE`       | Remove specific image(s) by name or ID                                   |


---

[⬅ Previous: Day 6 Cleaning Containers](../06-cleaning-containers/) | [Next ➡ Day 8 Distributing Images](../08-distributing-images/)
