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
