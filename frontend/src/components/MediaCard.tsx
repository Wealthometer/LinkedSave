import { Download, Image, Video } from "lucide-react";
import { MediaItem } from "../types";
import { buildDownloadUrl } from "../api";

interface Props {
  item: MediaItem;
  animationDelay?: number;
}

export function MediaCard({ item, animationDelay = 0 }: Props) {
  const isVideo = item.type === "video";
  const ext = isVideo ? "mp4" : "jpg";
  const filename = `linkedin-${item.type}-${item.index}.${ext}`;
  const downloadUrl = buildDownloadUrl(item.fullUrl || item.url, filename);

  return (
    <div
      className="bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 animate-fade-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Thumbnail */}
        {isVideo ? (
