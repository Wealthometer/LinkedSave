import axios from "axios";
import { ExtractResponse, SessionStatusResponse } from "./types";

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || "/api";
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const extractMedia = (url: string): Promise<ExtractResponse> =>
  api.post<ExtractResponse>("/extract", { url }).then((r) => r.data);

export const getSessionStatus = (): Promise<SessionStatusResponse> =>
  api.get<SessionStatusResponse>("/session").then((r) => r.data);

export const saveSession = (cookiesJson: string): Promise<{ message: string }> => {
  const cookies = JSON.parse(cookiesJson);
  return api.post<{ message: string }>("/session", { cookies }).then((r) => r.data);
};

export const clearSession = (): Promise<{ message: string }> =>
  api.delete<{ message: string }>("/session").then((r) => r.data);

export const buildDownloadUrl = (url: string, filename: string): string => {
