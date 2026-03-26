import { useState } from "react";
import { Header } from "./components/Header";
import { UrlInput } from "./components/UrlInput";
import { MediaGrid } from "./components/MediaGrid";
import { SessionPanel } from "./components/SessionPanel";
import { HowToUse } from "./components/HowToUse";
import { extractMedia } from "./api";
import { MediaItem, StatusState } from "./types";

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });

  const handleExtract = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setStatus({ type: "error", message: "Please paste a LinkedIn post URL." });
      return;
    }
    if (!trimmed.includes("linkedin.com")) {
      setStatus({ type: "error", message: "URL must be from linkedin.com" });
      return;
    }

    setLoading(true);
    setMedia([]);
    setStatus({ type: "loading", message: "Extracting media — this may take a few seconds…" });

    try {
      const result = await extractMedia(trimmed);

      if (!result.success || result.media.length === 0) {
        setStatus({
          type: "error",
          message:
            result.message ||
            "No media found. Try adding session cookies for private posts.",
        });
        return;
      }

      setMedia(result.media);
      setStatus({
        type: "success",
        message: `Found ${result.media.length} media file${result.media.length > 1 ? "s" : ""}.`,
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Could not reach the backend. Make sure the server is running on port 3001.",
