import { Router, Request, Response } from "express";
import axios from "axios";
import { LinkedInScraper } from "./scraper";
import {
  ExtractRequest,
  ExtractResponse,
  SessionRequest,
  SessionResponse,
  SessionStatusResponse,
  LinkedInCookie,
} from "./types";

export const router = Router();

let sessionCookies: LinkedInCookie[] = [];

// GET /api/health
router.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// POST /api/extract
router.post(
  "/extract",
  async (req: Request<object, ExtractResponse, ExtractRequest>, res: Response<ExtractResponse>) => {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ success: false, media: [], error: "url is required" });
    }

    if (!url.includes("linkedin.com")) {
      return res
        .status(400)
        .json({ success: false, media: [], error: "URL must be from linkedin.com" });
    }

    const scraper = new LinkedInScraper();

    try {
      const { media, title } = await scraper.extractMedia(url, sessionCookies);

      if (media.length === 0) {
        return res.json({
          success: false,
          media: [],
          title,
          message:
            "No media found. The post may require authentication — add your LinkedIn session cookies.",
        });
      }

      return res.json({ success: true, media, title });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("[extract] Error:", message);
      return res.status(500).json({ success: false, media: [], error: message });
    }
  }
);

// GET /api/download  (proxy download)
router.get("/download", async (req: Request, res: Response) => {
  const { url, filename } = req.query as { url?: string; filename?: string };

  if (!url) return res.status(400).json({ error: "url query param is required" });

  try {
    const response = await axios.get<NodeJS.ReadableStream>(decodeURIComponent(url), {
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Referer: "https://www.linkedin.com/",
      },
      timeout: 30_000,
    });

    const contentType =
      (response.headers["content-type"] as string) || "application/octet-stream";
    const ext = contentType.includes("video") ? "mp4" : "jpg";
    const safeFilename = (filename || `linkedin-media-${Date.now()}.${ext}`).replace(
      /[^\w._-]/g,
      "_"
    );

    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    if (response.headers["content-length"]) {
      res.setHeader("Content-Length", response.headers["content-length"] as string);
    }

    response.data.pipe(res);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[download] Error:", message);
    res.status(500).json({ error: "Download failed: " + message });
  }
});

// Session endpoints
router.post(
  "/session",
  (req: Request<object, SessionResponse, SessionRequest>, res: Response<SessionResponse>) => {
    const { cookies } = req.body;
    if (!Array.isArray(cookies) || cookies.length === 0) {
      return res.status(400).json({ message: "", error: "cookies array is required" });
    }
    sessionCookies = cookies;
