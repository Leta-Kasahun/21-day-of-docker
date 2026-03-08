# 02-docker-installation
## Day 2 Docker Installation

By the end of this day, you should be able to:

- Install Docker on your system
- Start and manage the Docker service
- Run your first Docker container
- Verify that Docker is working correctly

---

# Day 2 – Docker Installation

## Overview

Docker can be installed on different operating systems:

- **Linux (Ubuntu, Debian, Fedora, etc.)** – Install Docker Engine directly.
- **macOS** – Install Docker Desktop.
- **Windows** – Install Docker Desktop and run containers using **WSL2 (Windows Subsystem for Linux)**.

The following guide is **specifically for Windows users using WSL2 with Ubuntu LTS**.

---

# Install Docker on Windows using WSL2

## Step 1 – Install Ubuntu LTS

1. Open **Microsoft Store**.
2. Search for **Ubuntu**.
3. Install a **stable LTS version**:

Recommended options:
- **Ubuntu 22.04 LTS**
- **Ubuntu 24.04 LTS**

After installation:

1. Click **Open**.
2. Ubuntu will launch for the first time.
3. Create a **username** and **password**.

Now you have a **Linux environment running inside Windows using WSL2**.

---

## Step 2 – Install Docker Desktop

1. Go to the Docker website:

https://www.docker.com/products/docker-desktop/

2. Download **Docker Desktop for Windows**.
3. Run the installer.

During installation make sure this option is enabled:

✔ **Use WSL2 instead of Hyper-V**

Finish installation and restart your computer if required.

---

## Step 3 – Enable WSL Integration

Open **Docker Desktop**.

Go to:

Settings → Resources → WSL Integration

Enable integration for:

✔ Ubuntu

Click **Apply & Restart**.

---

## Step 4 – Update Ubuntu and Install Dependencies

Open the **Ubuntu terminal** and update packages:

```bash
sudo apt update
sudo apt upgrade -y
```
### Install Required Dependencies
Install the required packages:

```bash
sudo apt install ca-certificates curl gnupg -y
```
Verify Docker Installation

Check if Docker is installed and view its version:
```bash
docker --version
```
Example output:
```bash
Docker version 26.x.x
```
Run Your First Container

Run a test container to verify Docker is working:
```bash
docker run hello-world
```
Expected output:

Hello from Docker!
This message shows that your installation appears to be working correctly.
---

[⬅ Previous: Day 1 Docker Learning](../01-docker-introduction/) | [Next ➡ Day 3 Running Docker Containers](../03-running-docker-containers/)
