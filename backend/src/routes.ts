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
