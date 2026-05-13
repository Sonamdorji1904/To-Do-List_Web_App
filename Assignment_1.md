# DSO101 Assignment 1 — CI/CD: Continuous Integration and Continuous Deployment

**Course:** Bachelor's of Engineering in Software Engineering (SWE)  
**Module:** DSO101 — Continuous Integration and Continuous Deployment  
**Submission:** GitHub Repository — `To-Do-List_Web_App`

---

## Table of Contents

- [Step 0 — Prerequisite: Simple To-Do Web Application](#step-0--prerequisite-simple-to-do-web-application)
- [Part A — Deploying a Pre-Built Docker Image to Docker Hub](#part-a--deploying-a-pre-built-docker-image-to-docker-hub)
- [Part B — Automated Image Build and Deployment](#part-b--automated-image-build-and-deployment)

---

## Step 0 — Prerequisite: Simple To-Do Web Application

### Overview

A full-stack to-do list web application was built with the following components:

- **Frontend (FE):** UI for adding, editing, and deleting tasks
- **Backend (BE):** CRUD REST API
- **Database (DB):** Storage and persistence for tasks

### Repository Structure

```
/todo-app
  /frontend
    Dockerfile
    .env.production       # REACT_APP_API_URL=https://be-todo.onrender.com
  /backend
    Dockerfile
    .env.production       # DB_HOST, DB_USER, DB_PASSWORD, PORT, etc.
  render.yaml
```

### Environment Variables

**.env (Backend)**
```env
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
PORT=5000
```

**.env (Frontend)**
```env
REACT_APP_API_URL=http://localhost:5000
```

>`.env` files are **never committed to Git**. They are listed in `.gitignore`.

### Local Testing

The application was tested locally to confirm all environment variables were loaded correctly and that all CRUD operations (Create, Read, Update, Delete) functioned as expected before deployment.

**Screenshot — Local app running:**

![To-do](images/Screenshot%202026-05-13%20at%203.13.59 PM.png)

---

## Part A — Deploying a Pre-Built Docker Image to Docker Hub

### Step 1: Build and Push Docker Images

Docker images for the backend and frontend were built and pushed to Docker Hub using the student ID as the image tag.

**Backend Dockerfile (`/backend/Dockerfile`):**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Build and push commands:**

```bash
# Backend
docker build -t yourdockerhub/be-todo:02190108 ./backend
docker push yourdockerhub/be-todo:02190108

# Frontend
docker build -t yourdockerhub/fe-todo:02190108 ./frontend
docker push yourdockerhub/fe-todo:02190108
```

**Screenshot — Docker Hub showing pushed images:**

![Docker-img](images/fe-todo.png)

![Docker-img](images/be-todo.png)

---

### Step 2: Deploy on Render.com

#### Backend Service

1. Navigated to [render.com](https://render.com) and created a new **Web Service**
2. Selected **"Existing image from Docker Hub"**
3. Set image to: `sonamdorji2005/be-todo:02240362`
4. Configured the following environment variables in the Render dashboard:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://todo_db_upl1_user:ke27P2IlHpYcuImxRcnIDOFEptzU5m6z@dpg-d8116jdckfvc73dge4e0-a.singapore-postgres.render.com/todo_db_upl1` |
| `PORT` | `5000` |



#### Frontend Service

1. Created another **Web Service** on Render
2. Selected **"Existing image from Docker Hub"**
3. Set image to: `sonamdorji2005/fe-todo:02240362`
4. Configured the following environment variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://be-todo-02240362.onrender.com` |


---

#### Database

- Used Render's managed **PostgreSQL** service
- Database credentials were retrieved from the Render PostgreSQL dashboard and set as environment variables on the backend service


---

## Deployment

**Screenshot — Render service deployed:**
![render-img](images/render.png)
---

## Part B — Automated Image Build and Deployment

### Overview

In this part, the application was configured to **automatically build and deploy** a new Docker image every time a new commit is pushed to the GitHub repository, using Render's Git integration and a `render.yaml` blueprint file.

---
Configure `render.yaml`

A `render.yaml` file was created at the root of the repository to orchestrate the multi-service deployment:

```yaml
services:
  - type: web
    name: be-todo
    runtime: docker
    dockerfilePath: ./Backend/Dockerfile
    envVars:
      - key: DATABASE_URL
        value: postgresql://todo_db_upl1_user:ke27P2IlHpYcuImxRcnIDOFEptzU5m6z@dpg-d8116jdckfvc73dge4e0-a.singapore-postgres.render.com/todo_db_upl1
      - key: PORT
        value: 5000

  - type: web
    name: fe-todo
    runtime: docker
    dockerfilePath: ./Frontend/Dockerfile
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://be-todo.onrender.com
```

> The `render.yaml` file acts similarly to a `docker-compose.yml` — it defines and orchestrates all services for deployment.

**Screenshot — `render.yaml` in GitHub repository:**

![](images/github.png)

---


---

## References

- [Docker Documentation](https://docs.docker.com/)
- [Render Documentation](https://render.com/docs)
- [Deploying an Image on Render](https://render.com/docs/deploying-an-image)
- [Build and Push Docker Images](https://docs.docker.com/get-started/introduction/build-and-push-first-image/)
- [Render Environment Variables](https://render.com/docs/configure-environment-variables)
- [Render Blueprint Spec (render.yaml)](https://render.com/docs/blueprint-spec)
- [Publishing Docker Images via GitHub](https://docs.docker.com/guides/gha/)