export interface MediaItem {
  type: "image" | "video";
  url: string;
  fullUrl: string;
  quality?: string;
  index: number;
}

export interface ExtractResponse {
  success: boolean;
  media: MediaItem[];
  title?: string;
  message?: string;
  error?: string;
}

export interface SessionStatusResponse {
  active: boolean;
  count: number;
}

export type StatusType = "idle" | "loading" | "success" | "error";

export interface StatusState {
  type: StatusType;
  message: string;
}
