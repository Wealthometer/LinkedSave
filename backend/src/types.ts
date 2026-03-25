// Shared types used by both frontend and backend

export interface MediaItem {
  type: "image" | "video";
  url: string;
  fullUrl: string;
  quality?: string;
  index: number;
}

