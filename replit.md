# Bootcamp Treinos

## Overview
A full-stack fitness/workout API application with a Next.js frontend test page.

## Architecture

### Backend (Fastify API) — Port 8081
- Entry point: `src/index.ts`
- Framework: Fastify 5 with TypeScript
- Auth: better-auth
- Database: Prisma + PostgreSQL
- API Docs: `/docs` (Scalar/OpenAPI)
- Routes:
  - `GET /` — Health check
  - `GET /home/:date` — Home page data
  - `GET|PUT /me` — User training data
  - `GET /stats?from=&to=` — Workout stats
  - `GET|POST /workout-plans` — Workout plan management
  - `GET /workout-plans/:id` — Get a workout plan
  - `GET /workout-plans/:id/days/:dayId` — Get a workout day
  - `POST /workout-plans/:id/days/:dayId/sessions` — Start session
  - `PATCH /workout-plans/:id/days/:dayId/sessions/:sessionId` — Update session
  - `GET|POST /api/auth/*` — better-auth endpoints

### Frontend (Next.js) — Port 5000
- Location: `web/`
- Framework: Next.js 15 + React 19, TypeScript
- Purpose: Interactive API test page
- Proxy rewrites:
  - `/api/auth/*` → `http://localhost:8081/api/auth/*`
  - `/api/*` → `http://localhost:8081/*`

## Development Workflow
**Command:** `npm run dev:all`  
Starts backend on port 8081 (`PORT=8081 tsx --watch src/index.ts`) and Next.js on port 5000 in parallel.

## Key Config Files
- `package.json` — Root scripts and backend deps
- `web/package.json` — Next.js deps
- `web/next.config.ts` — Proxy rewrites
- `prisma/schema.prisma` — Database schema
- `.env` — Environment variables (PORT, DATABASE_URL, BETTER_AUTH_SECRET, etc.)

## Environment Variables
See `.env.example` for required vars:
- `PORT` — Backend port (default 8081)
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth secret
- `BETTER_AUTH_URL` — Auth base URL
- `GOOGLE_CLIENT_ID/SECRET` — OAuth (optional)
- `GOOGLE_GENERATIVE_AI_API_KEY` — AI features (optional)
