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
      }, i * 700);
    });
  };

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-card p-6 animate-fade-up animate-delay-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-semibold text-ink">Media Found</h2>
          <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-500 text-white text-[11px] font-bold">
            {media.length}
          </span>
        </div>

        {media.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              border border-border bg-canvas text-ink text-xs font-semibold
              hover:bg-border active:scale-95 transition-all duration-150
