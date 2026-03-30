16-docker-networking
Day 16 Docker Networking
Learning Objectives (Summary)

By the end of this day, you will understand:

What Docker Networking Is – How containers communicate with each other, the host, and external networks
Why Networking Is Important – Enables containerized applications to interact and expose services
When to Use Networking – For multi-container apps, databases, web servers, or connecting to the internet
How to Use Networking – Docker network commands, inspecting networks, and connecting containers
Practical Examples – Creating custom networks, connecting containers, and exposing ports
What is Docker Networking?
Networking allows containers to communicate with each other, the host system, and external networks.
Containers can have IP addresses, and network communication is handled through ports and protocols.
Docker networks can be default bridge networks or custom networks, allowing isolation and scalability.
Communication types include:
Container-to-container (internal)
Container-to-host (host machine)
Container-to-external network (internet or other systems)
Key Networking Terms
Term	Meaning
Host	A computer running containers
Network	A group of hosts communicating together
Interface	Connection from a host to a network (Ethernet, WiFi, or virtual)
LAN	Local Area Network at a specific location
VLAN	Virtual LAN, software-defined network
IP Address	Numeric address for network identification (IPv4, IPv6)
TCP/UDP	Protocols for reliable/unreliable communication
Port	Endpoint for communication on a host (0–65535)
Application Protocols	HTTP/HTTPS (web), SMTP (email), SNMP (network management)
Why Use Docker Networking?
Containers are isolated by default; networking enables them to talk to each other.
Allows port mapping to expose container services to the host or external world.
Essential for multi-container applications, like web servers talking to databases.
Supports custom networks for controlled communication and enhanced security.
When to Use Docker Networking
Single-container apps that need to expose ports to the host
Multi-container applications (e.g., web + database)
Inter-container communication using custom bridge networks
Connecting containers to external services or internet
Development, staging, and production environments where networking patterns differ
Key Commands
Command	Purpose
docker network ls	List all networks
docker network inspect <network_name>	View details of a network
docker network create <network_name>	Create a new network
docker network rm <network_name>	Remove a network
docker run --network <network_name> <image>	Attach container to a network
docker ps	Verify container ports and network connections
docker exec -it <container> ip addr show	Check container IP addresses
Example Workflow
# Create a custom network
docker network create my-network

# Run a database container attached to the network
docker run -d --name my-db --network my-network postgres

# Run a web container on the same network
docker run -d --name my-web --network my-network -p 8080:80 nginx

# Inspect network details
docker network inspect my-network

# Verify connectivity between containers
docker exec -it my-web ping -c 3 my-db

# Remove network (optional)
docker network rm my-network

Official Docker Docs reference: https://docs.docker.com/network/

---

[⬅ Previous: Day 15 Docker Volumes](../15-docker-volumes/) | [Next ➡ Day 17 Docker Networks](../17-docker-networks/)
