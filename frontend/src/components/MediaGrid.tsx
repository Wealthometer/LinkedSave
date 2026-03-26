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
