import { Search, Loader2 } from "lucide-react";
import { StatusState } from "../types";
import { StatusBanner } from "./StatusBanner";

interface Props {
  url: string;
  loading: boolean;
  status: StatusState;
  onUrlChange: (v: string) => void;
  onExtract: () => void;
}

export function UrlInput({ url, loading, status, onUrlChange, onExtract }: Props) {
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onExtract();
  };

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-card p-6 animate-fade-up">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-3">
        Post URL
      </p>

      <div className="flex gap-2.5">
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="https://www.linkedin.com/posts/username_..."
          spellCheck={false}
          autoComplete="off"
          className="
            flex-1 h-12 px-4 rounded-xl border border-border bg-canvas text-ink text-sm
            placeholder:text-stone-300 outline-none
            transition-all duration-150
            focus:border-brand-500 focus:bg-surface focus:ring-2 focus:ring-brand-100
          "
        />
        <button
          onClick={onExtract}
          disabled={loading}
          className="
            h-12 px-5 rounded-xl bg-brand-500 text-white text-sm font-semibold
            flex items-center gap-2 whitespace-nowrap shrink-0
            transition-all duration-150
            hover:bg-brand-600 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          "
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin-slow" />
          ) : (
            <Search size={16} strokeWidth={2.5} />
          )}
          {loading ? "Extracting…" : "Extract"}
        </button>
      </div>

