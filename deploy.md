# Deployment guide

This project has two parts: a Vite React frontend in `frontend/` and an Express + Puppeteer backend in `backend/`. Deploy the backend first, then point the frontend to it via `VITE_API_BASE_URL`.

## Environment variables
- `PORT` (backend): port to listen on, default `3001`.
- `FRONTEND_URL` (backend): origin allowed by CORS, e.g. `https://your-frontend.com`.
- `VITE_API_BASE_URL` (frontend build time): full URL to the backend API, e.g. `https://your-backend.com/api`.

## Deploy the frontend to Vercel (static)
- Create a new project in Vercel, import this repository.
- Set Root Directory to `frontend`.
- Framework preset: Vite.
- Build Command: `npm install && npm run build`.
- Output Directory: `dist`.
- Environment Variable: `VITE_API_BASE_URL` pointing to your live backend (include the `/api` path).
- Deploy. The site will be served from Vercel’s CDN; all API calls will go to the backend URL you set.

## Deploy the backend to a real-time host or server
Works on Render, Railway, Fly.io, or any VPS that supports Node 18+ with Chromium deps.

- Install dependencies: `npm install --workspace=backend`.
- Build: `npm run build --workspace=backend`.
- Start: `npm run start --workspace=backend` (binds to `PORT`, defaults to 3001).
- Set env vars `PORT` and `FRONTEND_URL`.
- Expose the service publicly; confirm `GET /api/health` returns `{ ok: true }`.
