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
        setActive(s.active);
        setCookieCount(s.count);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!cookieJson.trim()) return;
    setSaving(true);
    setFeedback("");
    try {
      const res = await saveSession(cookieJson.trim());
      setActive(true);
      setFeedback(res.message);
      const parsed = JSON.parse(cookieJson.trim());
      setCookieCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch (err) {
      setFeedback("Invalid JSON or server error. Check cookie format.");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    await clearSession();
    setActive(false);
    setCookieCount(0);
    setCookieJson("");
    setFeedback("Session cleared.");
  };

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-card overflow-hidden animate-fade-up animate-delay-200">
      {/* Trigger row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-canvas transition-colors duration-150"
      >
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-1">
            Session Cookies
            <span className="ml-2 normal-case tracking-normal font-normal text-muted/70">
              (Optional)
            </span>
          </p>
          <div className="flex items-center gap-2">
            {active ? (
              <>
