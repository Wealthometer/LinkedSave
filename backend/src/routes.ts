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
