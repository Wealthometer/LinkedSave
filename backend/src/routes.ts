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
