import { AlertCircle, CheckCircle2, Loader2, Info } from "lucide-react";
import { StatusState } from "../types";

interface Props {
  status: StatusState;
}

const config = {
  idle:    { icon: null, className: "hidden" },
  loading: {
    icon: <Loader2 size={16} className="animate-spin-slow shrink-0" />,
    className: "flex bg-brand-50 text-brand-500 border border-brand-100",
  },
  success: {
    icon: <CheckCircle2 size={16} className="shrink-0" />,
    className: "flex bg-emerald-50 text-success border border-emerald-100",
  },
  error: {
    icon: <AlertCircle size={16} className="shrink-0" />,
    className: "flex bg-red-50 text-danger border border-red-100",
  },
};

export function StatusBanner({ status }: Props) {
  const { icon, className } = config[status.type];
  if (status.type === "idle") return null;

  return (
