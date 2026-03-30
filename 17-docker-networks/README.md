# 17-docker-networks

## Day 17 Docker Networks

---

### Learning Objectives (Summary)

By the end of this day, you will understand:

1. **What Docker Networks Are** – How containers communicate with each other, the host, and external systems  
2. **Why Networking Is Important** – Enables multi-container applications and controlled communication  
3. **When to Use Networks** – For isolated containers, custom communication channels, and production-grade apps  
4. **How to Use Networks** – Commands to create, list, inspect, attach, and remove Docker networks  
5. **Practical Examples** – Creating networks, connecting containers, and inspecting network details  

---

### What are Docker Networks?

- Docker networks allow containers to **communicate** with each other, the host machine, and external systems.  
- They use **network drivers** to control traffic, isolation, and connectivity.  
- Containers can be connected at **creation time** or **after creation**.  
- Common network drivers include:  
  - **bridge** – Default driver, allows communication between containers and optional host exposure  
  - **host** – Container shares the host’s network stack  
  - **none** – Container is completely isolated  
  - **custom drivers** – For advanced use cases, e.g., overlay for swarm  

---

### Why Use Docker Networks?

- Containers are **isolated by default**; networks allow controlled communication.  
- Networks improve **security** by segmenting containers.  
- Supports **multi-container applications**, where services need to talk to each other.  
- Helps with **dynamic IP management** and **service discovery**.  

---

### When to Use Docker Networks

- Multi-container applications (web + API + database)  
- Containers that need **isolated communication channels**  
- Applications requiring **custom DNS or IP allocation**  
- Production deployments to **control access and prevent accidental exposure**  

---

### Key Commands

| Command | Purpose |
|---------|---------|
| `docker network ls` | List all networks on the host |
| `docker network create <network_name>` | Create a new network |
| `docker network rm <network_name>` | Remove a network |
| `docker run --network <network_name> <image>` | Attach container to a network at runtime |
| `docker network connect <network_name> <container>` | Connect an existing container to a network |
| `docker network disconnect <network_name> <container>` | Disconnect a container from a network |
| `docker network inspect <network_name>` | View detailed network configuration, IPs, and connected containers |

---

### Example Workflow

```bash
# Create a custom Docker network
docker network create mynetwork

# List all networks
docker network ls
# Example output:
# NETWORK ID     NAME        DRIVER    SCOPE
# 2edc5ae4838c   bridge      bridge    local
# a92988382711   host        host      local
# 5ff0febab98f   mynetwork   bridge    local
# 5464ed866dad   none        null      local

# Run a container attached to the network
docker run -d --name container-a --network mynetwork ubuntu sleep 3600

# Connect an existing container to the network
docker network connect mynetwork container-b

# Inspect network details
docker network inspect mynetwork
# Output includes container IPs, MAC addresses, and network driver info
```
---

[⬅ Previous: Day 16 Docker Networking](../16-docker-networking/) | [Next ➡ Day 18 Advanced Images](../18-advanced-images/)
