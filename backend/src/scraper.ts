import puppeteer, { Browser, Page } from "puppeteer";
import { MediaItem, LinkedInCookie } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
