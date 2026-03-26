import { Download } from "lucide-react";
import { MediaItem } from "../types";
import { MediaCard } from "./MediaCard";
import { buildDownloadUrl } from "../api";

interface Props {
  media: MediaItem[];
}
