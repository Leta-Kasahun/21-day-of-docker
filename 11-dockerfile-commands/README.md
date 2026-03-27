# 11-dockerfile-commands
## Day 11 Dockerfile Commands

### By the end of this day, you should be able to:
- Write a Dockerfile using **best practices**  
- Use **CMD, WORKDIR, COPY, RUN, ENV, EXPOSE** effectively  
- Build and run a Python container  
- Override CMD at runtime  
- Check container behavior using Docker CLI  
---

## What is CMD in Dockerfiles?
- `CMD` specifies the **default command to run when the container starts**.  
- **Does not run at build time**, only at runtime.  
- **Does not increase image size** or build time.  
- Only the **last CMD in a Dockerfile is used**.  

---

## Typical Usage

1. **Run a single application**  
```dockerfile
CMD python3 my_pipeline.py
CMD postgres
```

#### 1. Build the image
```bash
docker build -t myapp:v1 .
```
#### 2. List Docker images
```bash
docker images
```

#### 3. Run the container
```bash
docker run -d --name myapp-container -p 8000:8000 myapp:v1
```
#### 4. Access the app in browser
#### http://localhost:8000

#### 5. Check running containers
```bash
docker ps
```

#### 6. Override CMD at runtime (optional)
```bash
docker run myapp:v1 echo "Hello World"
```
#### 7. Stop and remove container
```bash
docker stop myapp-container
docker rm myapp-container
```
| Command / Dockerfile           | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| `CMD python3 my_pipeline.py`   | Runs a Python script when container starts            |
| `CMD start.sh`                 | Starts a shell script that may run multiple processes |
| `docker run <image>`           | Runs container using the Dockerfile CMD               |
| `docker run <image> <command>` | Overrides default CMD at runtime                      |
| `docker ps`                    | Check if container is running                         |
| `docker stop <container>`      | Stop container (stops CMD process)                    |



---

[⬅ Previous: Day 10 Managing Files](../10-managing-files/) | [Next ➡ Day 12 Docker Security](../12-docker-security/)
