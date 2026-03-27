# 11-dockerfile-commands
## Day 11 Dockerfile Commands

### By the end of this day, you should be able to:  
- Understand the **CMD instruction** and its purpose in Dockerfiles  
- Know **when containers stop** based on CMD  
- Learn to run **default commands at container startup**  
- Understand difference between **CMD and RUN**  
- Override CMD during `docker run`  
- Learn **typical usages** like running scripts, applications, or databases  

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
