# Prisma Challenge Performance Demo

This repository contains a Next.js application with Prisma and PostgreSQL to demonstrate query optimization and indexing improvements.

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Data Seeding](#data-seeding)
6. [Running the Application](#running-the-application)
7. [Benchmark](#benchmark)
8. [Branching and Versioning](#branching-and-versioning)
9. [Next Steps](#next-steps)

---

## Overview
This project illustrates how to optimize an endpoint that retrieves users and their posts:

- **before/**: original version using `include` (N+1 queries) without any index
- **after/**: optimized version using `select`, a `Post.userId` index, and connection pool settings

It includes scripts for data seeding, benchmarking, and instructions to measure performance gains.

---

## Project Structure
```
prisma-challenge/
├── before/       # Original code
│   ├── pages/api/users.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── bench.js  # Benchmark script
│   └── prisma/seed.js  # Data seed script
├── after/        # Optimized code
│   ├── pages/api/users.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── bench.js  # Benchmark script
│   └── prisma/seed.js  # Data seed script
└── README.md     # This file
```

---

## Prerequisites
- Node.js (v16 or higher)
- npm or Yarn
- Docker (for running PostgreSQL locally)
- Git

---

## Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:<your-username>/prisma-challenge.git
   cd prisma-challenge
   ```
2. Start PostgreSQL with Docker:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies in both `before/` and `after/` directories:
   ```bash
   cd before && npm install
   cd ../after && npm install
   cd ..
   ```

---

## Data Seeding
Populate the database with 1,000 users and 10,000 posts in both `before` and `after`:

```bash
# In before/
npm run seed
# In after/
npm run seed
```

---

## Running the Application
Start the Next.js server:

```bash
# In before/
npm run dev
# In after/
npm run dev
```

---

## Benchmark
Use the `bench.js` script to measure latency and throughput:

```bash
# In before/
node bench.js
# In after/
node bench.js
```

Compare the `latency.average` and `requests.average` values to see performance improvements.

---

## Branching and Versioning
1. Tag the repository to compare states:
   ```bash
   git tag before-optimization
   # After optimizations
git tag after-optimization
git push --follow-tags
   ```
2. For additional features (e.g., caching), create a feature branch:
   ```bash
   git checkout -b feature/cache-endpoint
   ```

---

## Next Steps
- Implement in-memory or Redis caching
- Introduce PgBouncer for advanced connection pooling
- Integrate benchmarks into CI workflow
- Add monitoring and alerts (Prometheus/Datadog)

---

**Author**: Rodolfo Valentino

