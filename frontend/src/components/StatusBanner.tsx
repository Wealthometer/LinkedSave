import { AlertCircle, CheckCircle2, Loader2, Info } from "lucide-react";
import { StatusState } from "../types";

interface Props {
  status: StatusState;
}

const config = {
  idle:    { icon: null, className: "hidden" },
  loading: {
    icon: <Loader2 size={16} className="animate-spin-slow shrink-0" />,
