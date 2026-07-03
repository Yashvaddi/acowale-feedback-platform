# System Design

## High-Level Architecture

The platform uses a Modular Monolith architecture, deployed on cloud platforms for scalability and low maintenance.

```text
[Vercel] -> Frontend (React + Vite)
     ↓ (HTTP/REST)
[Render] -> Backend (NestJS API in Docker)
     ↓ (TCP)
[Neon] -> Database (PostgreSQL)
```

### Components
- **Client Application:** A React SPA hosted on Vercel. Communicates with the backend via REST APIs.
- **API Server:** A NestJS monolithic API running in a Docker container on Render. Handles business logic, authentication, and database interaction.
- **Database:** A fully managed PostgreSQL database hosted on Neon, providing high availability and point-in-time recovery.
- **Cache (Optional/Future):** Redis can be used for session management and caching heavy analytics queries.

---

## Database Schema

The core entities are `User` (for Admins) and `Feedback`.

### `User` Table
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `passwordHash`: String
- `role`: Enum (ADMIN)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `Feedback` Table
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String
- `category`: Enum (PRODUCT, SERVICE, SUPPORT, OTHER)
- `rating`: Integer (1-5)
- `comment`: Text
- `createdAt`: DateTime

---

## API Flow

### Feedback Submission (Public)
1. User submits feedback on the frontend (`/`).
2. React app validates data using Zod.
3. POST request sent to `/api/v1/feedback`.
4. NestJS controller receives request, DTO validates the payload.
5. Service layer saves the feedback via Prisma to PostgreSQL.
6. Returns `201 Created` to the client.

### Admin Dashboard (Protected)
1. Admin logs in at `/admin/login`.
2. Backend validates credentials and returns a JWT token.
3. React app stores the token and redirects to `/admin/dashboard`.
4. Dashboard fetches analytics (`GET /api/v1/admin/dashboard/stats`) and paginated feedbacks (`GET /api/v1/admin/feedback`) including the JWT in the `Authorization: Bearer <token>` header.
5. NestJS `JwtAuthGuard` validates the token before processing the requests.

---

## Scaling Strategy

As the platform grows, the system is designed to scale gracefully:

1. **Database Indexing:** Ensure indexes exist on frequently queried columns like `category`, `createdAt`, and `rating`.
2. **Caching:** Integrate Redis to cache the dashboard analytics endpoint since aggregate queries (`COUNT`, `AVG`) become expensive with large datasets.
3. **Horizontal Scaling:** The backend is stateless (thanks to JWTs), so it can easily be horizontally scaled by adding more containers behind a load balancer.
4. **Read Replicas:** If the database load increases, we can introduce read replicas for the admin dashboard queries, separating them from the public write-heavy feedback submissions.

---

## Security Considerations

- **Authentication:** JWT-based authentication for admin routes.
- **Input Validation:** Zod on the frontend and Class-Validator on the backend to prevent malicious input and SQL injection (handled via Prisma).
- **CORS:** Configured to only allow requests from the designated frontend URL in production.
- **Rate Limiting:** Can be enabled using NestJS Throttler backed by Redis to prevent spamming the feedback submission endpoint.
- **Environment Secrets:** Secrets like `JWT_SECRET` and `DATABASE_URL` are strictly kept in environment variables and never committed to source control.

---

## Future Architecture

If the system requires handling massive scale (e.g., millions of requests), we could transition to an event-driven microservices architecture:
- Introduce Kafka/RabbitMQ to queue incoming feedback submissions.
- Spin off an asynchronous `Analytics Service` that aggregates data in real-time or via materialized views in PostgreSQL.
