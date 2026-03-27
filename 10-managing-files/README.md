# 10-managing-files
## Day 10 Managing Files in Docker Images

### By the end of this day, you should be able to:

- Understand how to copy files and folders into Docker images  
- Learn why copying from parent directories is not allowed  
- Use RUN instructions to download, unzip, and clean files efficiently  
- Keep Docker images small and optimized  

---

### Copying Files into an Image

The **COPY** instruction copies files from your host machine into the Docker image:

- **Downloads, unpacks, and removes** in one layer  
- Keeps the image **smaller and cleaner**

---

### Summary of Managing Files in Docker Images

| Action | Dockerfile Instruction | Notes |
|--------|----------------------|-------|
| Copy a file from host | `COPY <src-file> <dest>` | Copies file with optional new name |
| Copy a folder from host | `COPY <src-folder> <dest>` | Copies entire folder contents |
| Copy from parent directory | Not allowed | Must be inside build context |
| Download a file | `RUN curl <url> -o <dest>` | Download from internet during build |
| Unzip a file | `RUN unzip <zipfile> -d <dir>` | Extract downloaded archives |
| Clean up files | `RUN rm <file>` | Remove temporary files to reduce image size |
| Efficient download & cleanup | Combine into one `RUN` | Keeps image smaller and optimized |

---

[⬅ Previous: Day 9 Writing Dockerfiles](../09-writing-dockerfiles/) | [Next ➡ Day 11 Dockerfile Commands](../11-dockerfile-commands/)
