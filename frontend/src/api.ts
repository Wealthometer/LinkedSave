import axios from "axios";
import { ExtractResponse, SessionStatusResponse } from "./types";

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || "/api";
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const extractMedia = (url: string): Promise<ExtractResponse> =>
