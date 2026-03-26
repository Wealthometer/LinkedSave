import { useState, useEffect } from "react";
import { ChevronDown, ShieldCheck, ShieldOff, Save, Trash2 } from "lucide-react";
import { getSessionStatus, saveSession, clearSession } from "../api";

export function SessionPanel() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [cookieCount, setCookieCount] = useState(0);
  const [cookieJson, setCookieJson] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSessionStatus()
      .then((s) => {
