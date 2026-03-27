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
