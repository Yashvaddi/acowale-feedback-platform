# Contributing

Thank you for your interest in contributing to the Acowale Feedback Platform! 

## Local Setup

### 1. Install Dependencies
Navigate into both the `apps/web` and `apps/api` directories and install the dependencies:
```bash
cd apps/api
npm install
cd ../web
npm install
```

### 2. Environment Variables
Copy `.env.example` to the appropriate directories or use it as a reference to create `.env` in `apps/web` and the root folder for Docker.

### 3. Run the Application
The easiest way to run the entire stack locally is using Docker Compose:
```bash
docker compose up -d
```
Alternatively, you can run the services individually using `npm run dev` in both the `api` and `web` directories (ensure PostgreSQL and Redis are running locally).

---

## Branch Naming Convention

Please follow these conventions for branch names:
- `feature/<feature-name>` - for new features
- `bugfix/<bug-name>` - for bug fixes
- `hotfix/<issue-name>` - for urgent fixes in production
- `chore/<task-name>` - for maintenance tasks

---

## Commit Convention

We follow the Conventional Commits specification. This leads to more readable messages that are easy to follow.

Examples:
- `feat: add pagination to feedback list`
- `fix: resolve auth token expiration bug`
- `docs: update API documentation`
- `refactor: clean up dashboard component logic`
- `test: add unit tests for feedback service`
- `chore: update dependencies`

---

## Pull Request Process

1. Ensure all local tests and linting pass (`npm run lint` and `npm test`).
2. Create a Pull Request against the `main` branch.
3. Provide a clear description of the problem and the solution in the PR description.
4. Request a review from at least one core maintainer.
