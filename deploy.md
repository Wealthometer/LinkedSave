# Deployment guide

This project has two parts: a Vite React frontend in `frontend/` and an Express + Puppeteer backend in `backend/`. Deploy the backend first, then point the frontend to it via `VITE_API_BASE_URL`.

## Environment variables
