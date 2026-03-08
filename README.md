# docker-datacamp-learning-journal
A structured learning journal documenting my journey learning Docker through DataCamp. Covers Docker fundamentals, container management, image creation, networking, volumes, security, and Docker Compose with hands-on examples and organized daily documentation.

# Day 01 – Docker Introduction

## Table of Contents

- What is Docker
- Containers vs Virtual Machines
- Docker Architecture
- Checking Docker Installation

---

## What is Docker

Docker is a platform used to develop, ship, and run applications inside **containers**.

A container packages:

- application code
- libraries
- dependencies
- runtime

This ensures the application works the same on every machine.

---

## Containers vs Virtual Machines

| Feature | Containers | Virtual Machines |
|------|------|------|
| Startup Time | Seconds | Minutes |
| Size | Small | Large |
| Performance | Faster | Slower |
| OS | Share host OS | Full OS |

---

## Docker Architecture

Main components:

1. Docker Engine
2. Docker Images
3. Docker Containers
4. Docker Registry

Workflow:

Developer → Docker Image → Docker Container

---

## Basic Docker Commands

Check Docker version

```bash
docker --version
