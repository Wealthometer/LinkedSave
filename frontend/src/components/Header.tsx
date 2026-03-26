import { Download } from "lucide-react";

export function Header() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
            <Download size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl tracking-tight text-ink">
            Linked<span className="text-brand-500">Save</span>
          </span>
        </div>

        <span className="text-xs font-semibold tracking-widest uppercase text-brand-500 bg-brand-50 px-3 py-1.5 rounded-full">
          Free Tool
        </span>
      </div>
    </header>
  );
