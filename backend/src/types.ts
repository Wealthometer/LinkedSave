// Shared types used by both frontend and backend

export interface MediaItem {
  type: "image" | "video";
  url: string;
  fullUrl: string;
  quality?: string;
  index: number;
}

export interface ExtractRequest {
  url: string;
}

export interface ExtractResponse {
  success: boolean;
  media: MediaItem[];
  title?: string;
  message?: string;
  error?: string;
}

export interface SessionRequest {
  cookies: LinkedInCookie[];
}

export interface SessionResponse {
  message: string;
  error?: string;
}

