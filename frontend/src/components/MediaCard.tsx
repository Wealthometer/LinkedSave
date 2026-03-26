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
      <div className="relative bg-stone-100 aspect-video overflow-hidden">
        {isVideo ? (
          <video
            src={item.fullUrl || item.url}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
        ) : (
          <img
            src={item.fullUrl || item.url}
            alt={`LinkedIn media ${item.index}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />
        )}

        {/* Type badge overlay */}
        <div className="absolute top-2 left-2">
          <span
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider
              ${isVideo
                ? "bg-violet-600 text-white"
                : "bg-brand-500 text-white"
              }
            `}
          >
            {isVideo ? <Video size={10} /> : <Image size={10} />}
            {item.type}
          </span>
        </div>

        {item.quality && (
          <div className="absolute top-2 right-2">
            <span className="inline-block px-1.5 py-0.5 bg-black/50 text-white text-[10px] font-medium rounded">
              {item.quality}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <span className="text-xs text-muted font-medium">
          #{item.index}
        </span>
        <a
          href={downloadUrl}
          download={filename}
          className="
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            bg-success text-white text-xs font-semibold
            hover:bg-emerald-700 active:scale-95 transition-all duration-150
          "
        >
          <Download size={12} strokeWidth={2.5} />
