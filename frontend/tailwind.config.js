/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'DM Serif Display'", "serif"],
      },
      colors: {
        brand: {
          50:  "#eef4ff",
          100: "#d9e7ff",
          500: "#0a66c2",
          600: "#0558a8",
          700: "#004d99",
        },
        surface: "#ffffff",
        canvas:  "#f5f4f1",
        border:  "#e2e0db",
        ink:     "#1a1a18",
        muted:   "#6b6960",
        success: "#057642",
        danger:  "#b91c1c",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,.07), 0 4px 16px rgba(0,0,0,.06)",
        "card-hover": "0 2px 8px rgba(0,0,0,.10), 0 8px 24px rgba(0,0,0,.09)",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease both",
        "spin-slow": "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
