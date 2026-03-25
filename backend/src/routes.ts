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
