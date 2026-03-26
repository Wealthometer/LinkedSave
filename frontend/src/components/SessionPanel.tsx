import { useState, useEffect } from "react";
import { ChevronDown, ShieldCheck, ShieldOff, Save, Trash2 } from "lucide-react";
import { getSessionStatus, saveSession, clearSession } from "../api";

export function SessionPanel() {
  const [open, setOpen] = useState(false);
