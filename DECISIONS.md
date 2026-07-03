# Engineering Decision Log

## 1. Why this stack?

I chose React + NestJS because:

- Strong TypeScript support across the full stack.
- Clear separation of concerns (Controllers, Services, Modules).
- Scalable and maintainable architecture.
- Familiar production tooling and vast community support.

---

## 2. Why PostgreSQL?

- Reliable and ACID compliant.
- Strong analytics capabilities out-of-the-box.
- Excellent indexing which will become critical as the feedbacks table grows.
- Easy aggregation queries for dashboard charts.

---

## 3. Why this structure?

Feature-first modular architecture (NestJS modules):

```text
feedback/
analytics/
health/
```

This improves maintainability and makes it much easier to onboard new engineers or later split into microservices if absolutely necessary.

---

## 4. Time trade-offs

Skipped:
- Email notifications
- Advanced RBAC and Authentication
- Kafka/Event-driven architecture

To focus on:
- Production quality and modularity
- Clean interfaces and responsive UI
- Data validation and error handling

---

## 5. One more week?

If I had one more week, I would add:

- SSO login for the admin portal.
- Real-time dashboards (WebSockets).
- Prometheus/Grafana metrics.
- Comprehensive end-to-end testing with Playwright.

---

## 6. Hardest challenge

Efficient analytics aggregation while keeping APIs simple. Balancing between heavy database queries for real-time analytics vs caching the dashboard summary.

---

## 7. AI tools used

- GitHub Copilot / Cursor
- Claude / ChatGPT

---

## 8. AI helped with

Generating boilerplate NextJS/NestJS configurations, writing Docker configurations, and improving the structure of READMEs.

---

## 9. Where I disagreed with AI

AI initially suggested over-engineering with microservices. I intentionally kept a modular monolith. A monolith is far more appropriate for early-stage products to maximize velocity and reduce operational complexity.

---

## 10. What breaks at 100k users?

Analytics aggregation queries (`SELECT count(*), avg(rating) FROM feedbacks`) will become slow as the table grows.

Solution:
- Implement Redis caching for the `/analytics/summary` endpoint.
- Add Read Replicas to offload read-heavy operations.
- Create Materialized Views for pre-aggregated dashboard data.

---

## 11. Assignment improvement

Adding explicit non-functional requirements (e.g., expected QPS or latency targets) would help candidates better prioritize architecture trade-offs.

---

## 12. Why Render + Neon + Vercel?

I chose this architecture because:

- All services provide generous free tiers.
- Docker-based deployment closely resembles production environments.
- Neon offers managed PostgreSQL with automatic backups and branching.
- Vercel provides excellent frontend performance and DX.
- The stack minimizes operational overhead while remaining scalable.

If traffic increased significantly, I would migrate:

Render → Kubernetes
Neon → Dedicated PostgreSQL cluster
Redis → Managed Redis
CDN → Cloudflare

---

## 13. Known Limitation

Render free instances spin down after inactivity, which causes a cold start of approximately 30–60 seconds.

For production workloads, I would upgrade to a dedicated instance or migrate to Fly.io/Kubernetes.
