import puppeteer, { Browser, Page } from "puppeteer";
import { MediaItem, LinkedInCookie } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export class LinkedInScraper {
  private browser: Browser | null = null;

  async launch(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
      ],
    });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async createPage(cookies: LinkedInCookie[]): Promise<Page> {
    if (!this.browser) throw new Error("Browser not launched");

    const page = await this.browser.newPage();
    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 1280, height: 800 });

    // Stealth: mask webdriver flag
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    if (cookies.length > 0) {
      await page.setCookie(...cookies);
    }

    return page;
  }

  async extractMedia(
    url: string,
    cookies: LinkedInCookie[]
  ): Promise<{ media: MediaItem[]; title: string }> {
    await this.launch();
    const page = await this.createPage(cookies);

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30_000 });

      // Let lazy-loaded images settle
      await new Promise((r) => setTimeout(r, 2500));

      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollBy(0, 600));
      await new Promise((r) => setTimeout(r, 1000));

      const rawMedia = await page.evaluate((): Omit<MediaItem, "index">[] => {
        const results: Omit<MediaItem, "index">[] = [];

        const normalize = (url: string) => {
          try {
            const u = new URL(url);
            u.search = "";
            return u.toString();
          } catch {
            return url.split("?")[0];
          }
        };

        const isMediaHost = (src: string) => {
          try {
            const host = new URL(src).hostname;
            return host === "media.licdn.com" || host.endsWith(".media.licdn.com");
          } catch {
            return false;
          }
        };

        const isEmojiOrIcon = (src: string) =>
          /emoji|reaction|reactions|emoticon|like_|clap_|praise_|support|insightful|curious|comment|profile-displayphoto|ghost/.test(
            src
          );

        const addIfNew = (item: Omit<MediaItem, "index">) => {
          const key = normalize(item.fullUrl || item.url);
          if (!results.find((r) => normalize(r.fullUrl || r.url) === key && r.type === item.type)) {
            results.push(item);
          }
        };

        const collectImage = (img: HTMLImageElement) => {
          const src =
            img.getAttribute("src") ||
            img.getAttribute("data-delayed-url") ||
            img.getAttribute("data-src");
          if (!src || !src.startsWith("http")) return;
          if (!isMediaHost(src)) return;
          if (isEmojiOrIcon(src)) return;

          const width = img.naturalWidth || img.width || 0;
          const height = img.naturalHeight || img.height || 0;
          if (Math.max(width, height) < 200) return;
