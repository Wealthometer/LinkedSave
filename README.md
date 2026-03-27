# LinkedSave — LinkedIn Media Downloader

A full-stack media downloader built with **React + TypeScript + Tailwind** (frontend) and **Express + TypeScript + Puppeteer** (backend).

---

## Project Structure

```
linkedin-downloader/
├── package.json              ← root (monorepo scripts)
├── frontend/                 ← React + Vite + Tailwind
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── api.ts
│       ├── types.ts
│       ├── index.css
│       └── components/
│           ├── Header.tsx
│           ├── UrlInput.tsx
│           ├── StatusBanner.tsx
│           ├── MediaGrid.tsx
│           ├── MediaCard.tsx
│           ├── SessionPanel.tsx
│           └── HowToUse.tsx
└── backend/                  ← Express + TypeScript + Puppeteer
    ├── tsconfig.json
    └── src/
        ├── index.ts          ← server entry
        ├── routes.ts         ← API routes
        ├── scraper.ts        ← Puppeteer scraper
        └── types.ts          ← shared types
```

---

## Quick Start

### 1. Install all dependencies

```bash
# From the root of the project
npm install
cd frontend && npm install
cd ../backend && npm install
```

> Puppeteer will automatically download a Chromium build (~170 MB) on first install.

### 2. Run both frontend and backend together

```bash
# From the root
npm run dev
```

Or run them separately:

```bash
# Terminal 1 — Backend (http://localhost:3001)
cd backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd frontend
npm run dev
```

### 3. Open the app

Visit **http://localhost:5173** in your browser.

---

## How It Works

| Step | What happens |
|------|-------------|
| 1 | User pastes a LinkedIn post URL |
| 2 | Frontend POSTs to `/api/extract` |
| 3 | Backend launches headless Chromium (Puppeteer) and loads the page |
| 4 | DOM is scraped for `<img>` and `<video>` elements matching LinkedIn selectors |
| 5 | Media URLs returned to frontend — previews rendered in a grid |
| 6 | Download click calls `/api/download?url=...` which proxies the binary via Axios |

The Vite dev server proxies all `/api/*` requests to `http://localhost:3001`, so CORS is never an issue in dev.

---

## Session Cookies (Private Posts)

Some LinkedIn posts require authentication.

1. Log in to LinkedIn in your browser.
2. Install [Cookie-Editor](https://cookie-editor.com/) extension.
3. On linkedin.com, open Cookie-Editor → **Export → Export as JSON**.
4. In LinkedSave, expand **Session Cookies**, paste the JSON, click **Save Session**.

Cookies are stored in memory — they reset when the backend restarts.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/extract` | `{ url }` — scrape media from a LinkedIn post |
| `GET`  | `/api/download` | `?url=&filename=` — proxy-download a media file |
| `GET`  | `/api/session` | Check session status |
| `POST` | `/api/session` | `{ cookies }` — save LinkedIn cookies |
| `DELETE` | `/api/session` | Clear session |
| `GET`  | `/api/health` | Health check |

---

## Production Build

```bash
npm run build
```

- Frontend builds to `frontend/dist/`
- Backend compiles to `backend/dist/`

For production, serve the frontend static files from Express:

```ts
// Add to backend/src/index.ts
import path from "path";
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "../../frontend/dist/index.html")));
```

---

## Linux Server (Puppeteer deps)

```bash
sudo apt-get install -y libgbm-dev libxkbcommon-x11-0 libgtk-3-0 \
  libasound2 libx11-xcb1 libxss1 libnss3 libx11-6 libxcomposite1 \
  libxcursor1 libxdamage1 libxrandr2 libatk1.0-0 libcups2
```

---

## Legal Notice

This tool is for personal use only. Respect LinkedIn's Terms of Service and content creators' rights.
