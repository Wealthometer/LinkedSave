const steps = [
  {
    num: 1,
    text: "Open a LinkedIn post that contains images or a video.",
  },
  {
    num: 2,
    text: "Copy the post URL from your browser's address bar.",
  },
  {
    num: 3,
    text: 'Paste the URL in the field above and click "Extract".',
  },
  {
    num: 4,
    text: "Click the Download button on any media item to save it.",
  },
  {
    num: 5,
    text: "For private or login-only posts, add your session cookies via the panel above.",
  },
];

export function HowToUse() {
  return (
    <div className="bg-surface border border-border rounded-2xl shadow-card p-6 animate-fade-up animate-delay-300">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-4">
        How to Use
      </p>
      <ol className="space-y-0">
        {steps.map((step, i) => (
          <li
            key={step.num}
            className={`flex gap-4 py-3 text-sm text-muted leading-relaxed ${
              i < steps.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="w-6 h-6 shrink-0 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
              {step.num}
            </span>
