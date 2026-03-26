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
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 space-y-4">
        {/* Hero */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-ink leading-tight mb-3">
            Download LinkedIn<br />
            <span className="text-brand-500">Photos & Videos</span>
          </h1>
          <p className="text-muted text-base max-w-md mx-auto leading-relaxed">
            Paste any LinkedIn post URL and save images or videos directly to your device.
          </p>
        </div>

        {/* URL input */}
        <UrlInput
          url={url}
          loading={loading}
          status={status}
          onUrlChange={setUrl}
          onExtract={handleExtract}
        />

        {/* Results */}
        {media.length > 0 && <MediaGrid media={media} />}

        {/* Session */}
        <SessionPanel />

        {/* Instructions */}
        <HowToUse />
      </main>

      <footer className="text-center py-6 px-4 border-t border-border text-xs text-muted">
        LinkedSave is an independent tool. Not affiliated with LinkedIn or Microsoft.
        &nbsp;·&nbsp; Use responsibly and respect content creator rights.
      </footer>
    </div>
  );
