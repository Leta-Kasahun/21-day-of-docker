# 21-Full Application Deployment

## Day 21 – Full Application Deployment with Docker Compose

### By the end of this day, you should be able to:
- Deploy a multi-container application using Docker Compose  
- Configure volumes and networks for persistent and connected services  
- Apply security best practices (USER, WORKDIR, minimal permissions)  
- Troubleshoot service dependencies and startup order  

---

## Key Concepts
- Docker Compose for multi-service applications  
- Volumes and persistent storage across containers  
- Networking between services  
- Securing containers using best practices  
- Debugging and troubleshooting deployment issues  

---

## Example docker-compose.yml

```yaml
version: "3.9"
services:
  web:
    build: ./app
    ports:
      - "8080:8080"
    volumes:
      - app-data:/app/data
    networks:
      - appnet
    user: "1000:1000"
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: appdb
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - appnet

volumes:
  app-data:
  db-data:

networks:
  appnet:
```

---

## Commands

```bash
# Start full application
docker-compose up -d

# Stop and remove containers
docker-compose down

# View logs
docker-compose logs -f

# List volumes
docker volume ls
```

---

## Congratulations! 🎉

You have completed the Docker DataCamp Learning Journal!  
By now, you have learned:
- Docker containers, images, and Dockerfiles  
- Security best practices (USER, WORKDIR)  
- Networking and volume management  
- Advanced image builds and multi-stage builds  
- Multi-container orchestration with Docker Compose  

![Congratulations](https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

---

## Navigation

[⬅ Previous: Day 20 Docker Compose](../20-docker-compose/) | [🏁 End of Docker Journal](../README.md)
