import { Search, Loader2 } from "lucide-react";
import { StatusState } from "../types";
import { StatusBanner } from "./StatusBanner";

interface Props {
  url: string;
  loading: boolean;
  status: StatusState;
  onUrlChange: (v: string) => void;
