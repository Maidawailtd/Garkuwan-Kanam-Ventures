# Garkuwan Kanam & Co Ventures

Industrial-grade digital platform for a heavy machinery and equipment supplier in Nigeria — trucks, mining equipment, and drilling motors with integrated Flutterwave checkout.

## Run & Operate

- `PORT=22565 BASE_PATH=/ pnpm --filter @workspace/gkc-ventures run dev` — run the frontend (port 22565)
- `PORT=8080 pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only, run once on new DB)
- `pnpm --filter @workspace/scripts run seed` — seed the database with product data
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19 + Vite 7, Tailwind CSS 4, Wouter (routing), Radix UI, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild

## Where things live

- Frontend: `artifacts/gkc-ventures/src/`
- API server: `artifacts/api-server/src/`
- Database schema: `lib/db/src/schema/`
- API spec (source of truth): `lib/api-spec/openapi.yaml`
- Generated hooks: `lib/api-client-react/src/generated/`
- Product images: `artifacts/gkc-ventures/public/attached_assets/generated_images/`
- Seed script: `scripts/src/seed-data.ts`

## Architecture decisions

- Replit path-based routing: frontend at `/` (port 22565), API at `/api` (port 8080). Browser requests to `/api/*` are proxied by Replit to port 8080.
- Image URLs stored as root-relative paths (e.g., `/attached_assets/generated_images/...`) — served from Vite's `public/` folder at base path `/`.
- The frontend and API server both require `PORT` env var to be passed explicitly in the workflow command.

## Gotchas

- Both `PORT` and `BASE_PATH` must be set when running the frontend dev server.
- `PORT=8080` must be set when running the API server dev workflow.
- After any new database setup, run `pnpm --filter @workspace/db run push` then `pnpm --filter @workspace/scripts run seed` in that order.
- The api-server dev script builds first (`esbuild`) then starts node. Build failures will crash the workflow.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
