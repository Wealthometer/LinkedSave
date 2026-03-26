import { Download } from "lucide-react";
import { MediaItem } from "../types";
import { MediaCard } from "./MediaCard";
import { buildDownloadUrl } from "../api";

interface Props {
  media: MediaItem[];
}

export function MediaGrid({ media }: Props) {
  if (media.length === 0) return null;

  const handleDownloadAll = () => {
    media.forEach((item, i) => {
      setTimeout(() => {
        const ext = item.type === "video" ? "mp4" : "jpg";
        const filename = `linkedin-${item.type}-${item.index}.${ext}`;
        const url = buildDownloadUrl(item.fullUrl || item.url, filename);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
