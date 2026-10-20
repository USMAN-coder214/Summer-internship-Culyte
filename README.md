# Build-Pro — Construction Management System

**A full-stack construction project management application developed during the Culyte internship.** Build-Pro provides a central workspace for tracking projects, workers, tasks, materials, and expenses.

[**Live Application**](https://construction-build-pro.netlify.app/) · [**Backend API**](https://culyte-construction-api.vercel.app/) · [**Source Code**](https://github.com/USMAN-coder214/Summer-internship-Culyte)

> **Project status:** Deployed internship demonstration. This is a learning/portfolio project, not a production-grade service-level commitment. The free database hosting tier may pause during inactivity.

## Overview

Construction work often involves keeping project details, worker assignments, material usage, and expenses in separate places. Build-Pro brings these workflows together in a web-based dashboard with authenticated access and a persistent MySQL database.

## Features

- **Authentication:** Account sign-up/sign-in and JWT-based protected API routes.
- **Dashboard:** View project information and activity in one place.
- **Projects & companies:** Manage construction projects and associated company information.
- **Workers:** Maintain worker records and associate workers with projects.
- **Tasks:** Track tasks for individual projects.
- **Materials:** Organize material categories, materials, and project material assignments.
- **Expenses:** Record and update expenses associated with projects.
- **Responsive interface:** React-based UI styled with Tailwind CSS.

## Technology stack

| Layer                | Technologies                            | Hosting |
| -------------------- | --------------------------------------- | ------- |
| Frontend             | React, Vite, Tailwind CSS, React Router | Netlify |
| Backend              | Node.js, Express.js                     | Vercel  |
| Database             | MySQL                                   | Aiven   |
| ORM                  | Sequelize                               | —       |
| Authentication       | JWT, bcryptjs                           | —       |
| Client-side requests | Axios                                   | —       |
| Package manager      | pnpm                                    | —       |

## Architecture

```text
Browser
  |
  v
Netlify (React + Vite)
  |  HTTPS requests to /api/*
  v
Vercel (Express REST API)
  |  Sequelize + mysql2 over TLS
  v
Aiven (MySQL)
```

The frontend reads its API base URL from `VITE_API_BASE_URL`. The backend reads the database connection string and signing secret from server-side environment variables.

## Repository structure

```text
Summer-internship-Culyte/
├── Backend/
│   └── Week-6/              # Express API, Sequelize models and migrations
├── Week-7/
│   └── build-pro/           # React/Vite frontend
├── week-1/                  # Earlier internship exercises
├── week-2/
├── week-3/
├── week-4/
├── week-5/
├── week-6/
└── README.md
```

The repository preserves both the internship learning work and the final deployed application.

## Run locally

### Requirements

- Node.js and pnpm
- MySQL server (for example, a local MySQL installation)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/USMAN-coder214/Summer-internship-Culyte.git
cd Summer-internship-Culyte
```

### 2. Configure the backend

```bash
cd Backend/Week-6
pnpm install
```

Create `Backend/Week-6/.env` with values for your own local database:

```dotenv
DATABASE_URL=mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/YOUR_DATABASE
JWT_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET
PORT=5000
NODE_ENV=development
```

Create the MySQL database named in `DATABASE_URL`, then apply the existing Sequelize migrations from the backend directory:

```bash
pnpm exec sequelize-cli db:migrate
```

Start the backend:

```bash
pnpm dev
```

By default, the API runs at `http://localhost:5000`; its routes are served under `/api`.

### 3. Configure the frontend

From the repository root:

```bash
cd Week-7/build-pro
pnpm install
```

Create `Week-7/build-pro/.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
pnpm dev
```

Open the local address shown by Vite in your terminal.

> If starting from an empty database, sign up through the application to create an account. Do not commit `.env` files or use the public demo credentials for your own installation.

## Deployment

- **Netlify:** Deploy `Week-7/build-pro` as the Vite frontend. Set `VITE_API_BASE_URL=https://culyte-construction-api.vercel.app/api` and rebuild after changing it.
- **Vercel:** Deploy `Backend/Week-6` as the Express backend. Set `DATABASE_URL` and `JWT_SECRET` in the backend's environment settings.
- **Aiven MySQL:** Use the configured MySQL instance over TLS with certificate verification. Keep the database URL, password, and TLS configuration private.

The deployed backend has an informational root endpoint at [`/`](https://culyte-construction-api.vercel.app/). A successful response here indicates that Express started; actual database connectivity should be verified with an authenticated API operation.

## Demonstration

**[Open Build-Pro](https://construction-build-pro.netlify.app/)**

Use the sign-up or login screen to access the application. Request demo credentials from the project maintainer if required; credentials are intentionally not published in this README.

### Screenshots

Add real application screenshots after creating a `docs/screenshots/` directory:

- `docs/screenshots/login.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/projects.png`
- `docs/screenshots/materials.png`
- `docs/screenshots/expenses.png`

For example, once a screenshot has been added:

```markdown
![Build-Pro dashboard](docs/screenshots/dashboard.png)
```

## Security notes

- Keep `.env` files, database connection strings, JWT secrets, and private keys out of Git.
- Use separate demo accounts and change demo passwords before making the project broadly accessible.
- Ensure authenticated users can only access data they are authorized to view.
- Free hosting tiers may sleep or pause and are best suited for evaluation rather than a business-critical workload.

## Internship context

This project demonstrates hands-on experience with React UI development, REST API design, relational database modeling, authentication, cloud deployment, and debugging real deployment issues.

**Developed as part of the Culyte internship program.**
