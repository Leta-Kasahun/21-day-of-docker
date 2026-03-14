# 09-writing-dockerfiles
## Day 9 Writing Dockerfiles

### By the end of this day, you should be able to:

- Understand what a Dockerfile is
- Write a basic Dockerfile
- Learn common Dockerfile instructions
- Build Docker images using Dockerfiles
- Understand how applications are packaged into images

---

## What is a Dockerfile?

A **Dockerfile** is a text file that contains instructions used by Docker to **build a Docker image automatically**.

Instead of manually installing dependencies and configuring environments, a Dockerfile defines everything needed to run an application.

It ensures that applications run **the same way on any system**.

---

## Why Dockerfiles Are Important

Dockerfiles help developers:

- Automate environment setup
- Create consistent application environments
- Share application setups easily
- Deploy applications quickly

In real-world development, Dockerfiles are used to package applications with:

- Source code
- Dependencies
- Runtime environment
- Configuration

---

## Basic Dockerfile Structure

A Dockerfile is built using **instructions**. Each instruction creates a **layer** in the Docker image.

Example structure:

```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

---

[⬅ Previous: Day 8 Distributing Images](../08-distributing-images/) | [Next ➡ Day 10 Managing Files](../10-managing-files/)
