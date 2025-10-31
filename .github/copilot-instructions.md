# Copilot Instructions for touski Codebase

## Project Overview
- **Frontend:** Next.js app in the root (`app/`, `components/`, etc.)
- **Backend/Admin:** Directus instance in `touski-directus-admin/` (custom schema, Docker, scripts)
- **Data:** Custom schema in `touski-directus-admin/schema.json`, initialized/applied via scripts

## Key Workflows
- **Start Directus locally:**
  - Use `touski-directus-admin/start.sh` to initialize DB, apply schema, and launch Directus
  - Dockerfile provided for containerized runs (Node 22, port 8055)
- **Start Next.js frontend:**
  - `npm run dev` (or `yarn dev`, etc.) from project root
- **Schema changes:**
  - Edit `touski-directus-admin/schema.json`, then re-run `start.sh` to apply

## Conventions & Patterns
- **App structure:**
  - Next.js `app/` uses route groups (e.g., `(blogs)`, `(dashboard)`, etc.) for feature separation
  - Components organized by domain in `components/`
  - Data for UI in `data/` (JS modules)
- **Directus integration:**
  - All admin/backend logic and schema in `touski-directus-admin/`
  - Use `npx directus` commands for DB/schema management
- **Deployment:**
  - Next.js: Vercel (see README)
  - Directus: Docker (see Dockerfile), Railway config present

## Examples
- To add a new blog page: create a folder in `app/(blogs)/` and corresponding component in `components/blogs/`
- To update admin schema: edit `touski-directus-admin/schema.json` and run `start.sh`

## Tips for AI Agents
- Always check for custom scripts in `touski-directus-admin/` before running Directus commands
- Follow Next.js conventions for routing and component placement
- Reference `README.md` for frontend dev workflow; use `start.sh` for backend
- When in doubt, look for domain-specific folders (e.g., `shoplist`, `shopSingle`, `otherPages`) for feature boundaries

---
For more details, see `README.md` (frontend) and `touski-directus-admin/` scripts/configs (backend).
