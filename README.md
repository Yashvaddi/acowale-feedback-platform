# Acowale CRM Machine Test by Yash Vaddi

## Live URLs

- **Frontend Application:** [https://acowale-feedback-platform-web.vercel.app](https://acowale-feedback-platform-web.vercel.app)
- **Backend API Docs (Swagger):** [https://acowale-feedback-platform.onrender.com/api/docs](https://acowale-feedback-platform.onrender.com/api/docs)
- **Health Check:** [https://acowale-feedback-platform.onrender.com/health](https://acowale-feedback-platform.onrender.com/health)

## Important Routes & Credentials

### Frontend Routes
- **Public Feedback Form:** `/`
- **Admin Login:** `/admin/login`
- **Admin Dashboard Overview:** `/admin/dashboard`
- **Admin Feedback List:** `/admin/feedback`

### Admin Login Credentials
To access the admin dashboard, use the seeded admin credentials:
- **Email:** `admin@acowale.com`
- **Password:** `admin123`

---

## Features

### Public Feedback Form
- Submit feedback with a responsive and accessible UI
- Category selection
- 1-5 Star Rating
- Form validation with Zod

### Admin Dashboard
- Total feedback count and Average Rating
- Category distribution with Pie Chart
- Search feedback by name/comment
- Filter feedbacks by category
- Recent submissions table with pagination
- Secure login and JWT-based authentication

---

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS
- React Query
- Recharts
- Zod + React Hook Form

**Backend:**
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis (For caching/rate limiting support)
- Winston logging
- Swagger

**Infrastructure:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)

---

## Architecture Diagram
*(See SYSTEM_DESIGN.md for detailed architecture and sequence diagrams)*

---

## Local Setup

1. Make sure you have Docker installed.
2. Run the application:

```bash
docker compose up -d
```

3. The frontend is available at `http://localhost:3000`
4. The backend is available at `http://localhost:5000`
5. Swagger API Docs available at `http://localhost:5000/api/docs`

---

## Environment Variables

An `.env.example` file is provided in the root directory.

### Where to add them in deployment platforms?
- **GitHub Actions:** Go to `Settings > Secrets and variables > Actions > Repository secrets` and add `DOCKER_USERNAME`, `DOCKER_PASSWORD`, etc.
- **Render (Backend):** Go to the Render Dashboard > your Web Service > `Environment` tab and add variables like `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, `REDIS_URL`.
- **Vercel (Frontend):** Go to Vercel Dashboard > your Project > `Settings > Environment Variables` and add `VITE_API_URL`.

---

## API Documentation

For the complete API documentation, refer to `API.md` and the Swagger UI available at `/api/docs` when running the application.

---

## Project Structure

```text
acowale-feedback-platform/
├── apps/
│   ├── api/                # NestJS Backend
│   └── web/                # React Frontend
├── .github/workflows/      # CI/CD Pipelines
├── README.md               # Main Entry Point
├── DECISIONS.md            # Engineering Decisions Log
├── TEACH_US.md             # Technical Essay
├── SYSTEM_DESIGN.md        # Architecture & System Design
├── API.md                  # API Documentation
├── PROMPTS.md              # AI Collaboration Log
├── CONTRIBUTING.md         # Contribution Guidelines
├── docker-compose.yml      # Local Docker setup
└── render.yaml             # Render infrastructure as code
```

---

## Development Journey

Why I chose this stack:
- **React + Tailwind**: Ensures rapid UI development with consistent styling and responsiveness.
- **NestJS + Prisma**: NestJS provides a scalable, enterprise-grade architecture. Prisma brings type safety directly to the database level.
- **Docker**: Containerization guarantees that the application runs identically on any environment.

---

## Future Improvements

- Implement Redis caching for analytics queries in the admin dashboard.
- Add email notifications on new feedback submission.
- End-to-End Testing with Playwright.
# acowale-feedback-platform
