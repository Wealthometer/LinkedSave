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
                <ShieldCheck size={14} className="text-success" />
                <span className="text-sm text-success font-medium">
                  Authenticated — {cookieCount} cookies active
                </span>
              </>
            ) : (
              <>
                <ShieldOff size={14} className="text-muted" />
                <span className="text-sm text-muted">
                  Not authenticated — public posts only
                </span>
              </>
            )}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="px-6 pb-6 border-t border-border">
          <p className="text-sm text-muted leading-relaxed mt-4 mb-3">
            Some LinkedIn posts require login to view. Export your cookies from LinkedIn
            using the{" "}
            <a
              href="https://cookie-editor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:underline"
            >
              Cookie-Editor
            </a>{" "}
            browser extension (Export → JSON), then paste the JSON below.
          </p>

          <textarea
            value={cookieJson}
            onChange={(e) => setCookieJson(e.target.value)}
            placeholder='[{"name":"li_at","value":"AQE...","domain":".linkedin.com",...}]'
            rows={5}
            className="
              w-full rounded-xl border border-border bg-canvas p-3
              font-mono text-xs text-ink resize-y outline-none
              transition-all duration-150
              focus:border-brand-500 focus:bg-surface focus:ring-2 focus:ring-brand-100
              mb-3
            "
          />

          {feedback && (
            <p
              className={`text-xs font-medium mb-3 ${
                feedback.toLowerCase().includes("error") || feedback.toLowerCase().includes("invalid")
                  ? "text-danger"
                  : "text-success"
              }`}
            >
              {feedback}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !cookieJson.trim()}
              className="
                flex items-center gap-1.5 px-4 py-2 rounded-lg
                bg-brand-500 text-white text-sm font-semibold
                hover:bg-brand-600 active:scale-95 transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
              "
            >
              <Save size={14} />
              {saving ? "Saving…" : "Save Session"}
            </button>

            {active && (
                onClick={handleClear}
                className="
                  border border-border bg-canvas text-ink text-sm font-semibold
                  hover:bg-border active:scale-95 transition-all duration-150
              >
            )}
  );
