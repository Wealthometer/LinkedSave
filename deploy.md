# Deployment guide

This project has two parts: a Vite React frontend in `frontend/` and an Express + Puppeteer backend in `backend/`. Deploy the backend first, then point the frontend to it via `VITE_API_BASE_URL`.

## Environment variables
- `PORT` (backend): port to listen on, default `3001`.
- `FRONTEND_URL` (backend): origin allowed by CORS, e.g. `https://your-frontend.com`.
- `VITE_API_BASE_URL` (frontend build time): full URL to the backend API, e.g. `https://your-backend.com/api`.

## Deploy the frontend to Vercel (static)
- Create a new project in Vercel, import this repository.
