# Test Qalqul

## Overview

This project consists of three frontend applications built with React, TypeScript, and Vite, and a backend API built with NestJS. The backend uses a MySQL database. Docker is used to simplify deployment and development.

## Prerequisites

- **Docker**: Ensure Docker and Docker Compose are installed. You can download them from [Docker's official website](https://www.docker.com/products/docker-desktop).
- **Node.js**: Required for building and running the frontend and backend applications (usually installed with Docker).

## Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Elfomen/test_qalqul.git
cd test_qalqul
```

### 2. Build and Run the Application

Navigate to the root directory of the project and run the following command to build and start all services:

```bash
docker-compose up --build
```

This command will:

Build Docker images for the backend and each frontend application.
Start containers for the backend, frontends, and MySQL database.
Map ports for accessing the frontend applications and backend API.

### 3. Access the Applications

Task 1: http://localhost:3001
Task 2: http://localhost:3002
Mini Project: http://localhost:3003
Backend API: http://localhost:3000
Socket UEL: http://localhost:3008
