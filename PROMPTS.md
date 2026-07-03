# AI Collaboration Log

This project was built with the assistance of AI tools to accelerate development and ensure high code quality.

## Tools Used
- **Claude / ChatGPT:** For architectural discussions, code generation, and README structuring.
- **Cursor (AI IDE):** For inline code completion, refactoring, and debugging.

---

## Prompt 1: Project Scaffolding

**Prompt:**
> "Generate a NestJS boilerplate using Prisma for PostgreSQL and set up a basic Docker compose file with Postgres and Redis."

### Why I used it
To skip the mundane setup of scaffolding the base project, configuring Prisma, and writing the standard `docker-compose.yml`. This allowed me to immediately focus on the business logic and API design.

---

## Prompt 2: React Dashboard Component

**Prompt:**
> "Create a React component using Recharts to display a pie chart for feedback category distribution. Include TailwindCSS styling."

### What I changed
The AI generated a functional component, but the styling was generic. I modified the Tailwind classes to match the design system of the application, added custom tooltips, and integrated it with React Query to fetch live data from my backend.

---

## Example Where I Disagreed With AI

**AI Suggestion:**
> "You should implement a microservice architecture where the Feedback Service and the Analytics Service communicate over RabbitMQ."

**My Decision:**
I completely rejected this suggestion. I chose a **Modular Monolith** architecture instead. 

**Reasoning:**
- **Faster Delivery:** Setting up RabbitMQ, service discovery, and managing distributed data consistency would have wasted hours on infrastructure instead of delivering value.
- **Lower Complexity:** A monolith is vastly easier to deploy, monitor, and debug, which is crucial for early-stage or machine-test projects.
- **Better Maintainability:** NestJS provides excellent modularity. If the `Analytics` logic ever becomes a bottleneck, it is already encapsulated in its own module and can be extracted into a microservice *later*. Premature optimization kills velocity.
