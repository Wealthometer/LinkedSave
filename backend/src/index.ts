import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const rawFrontend = process.env.FRONTEND_URL || "http://localhost:5173";
const ALLOWED_ORIGIN = rawFrontend.trim().replace(/\/$/, "");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., health checks)
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");
      if (normalized === ALLOWED_ORIGIN) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "10mb" }));

app.use("/api", router);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("[unhandled]", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running at http://localhost:${PORT}\n`);
});

export default app;
