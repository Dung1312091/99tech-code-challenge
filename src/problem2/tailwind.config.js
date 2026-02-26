/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Rajdhani", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-brand": "0 0 40px -8px rgb(var(--color-brand) / 0.35)",
        "glow-brand-sm": "0 0 20px -4px rgb(var(--color-brand) / 0.25)",
        "glow-focus": "0 0 0 3px rgb(var(--color-brand) / 0.2)",
        "inner-glow": "inset 0 1px 0 0 rgb(255 255 255 / 0.05)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in": "fade-in 150ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
      },
      colors: {
        surface: {
          primary: "rgb(var(--color-surface-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-surface-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-surface-tertiary) / <alpha-value>)",
          overlay: "rgb(var(--color-surface-overlay) / <alpha-value>)",
        },
        content: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-text-tertiary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--color-brand) / <alpha-value>)",
          hover: "rgb(var(--color-brand-hover) / <alpha-value>)",
          subtle: "rgb(var(--color-brand-subtle) / <alpha-value>)",
          muted: "rgb(var(--color-brand-muted) / <alpha-value>)",
        },
        line: {
          primary: "rgb(var(--color-border-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-border-secondary) / <alpha-value>)",
          focus: "rgb(var(--color-border-focus) / <alpha-value>)",
        },
        feedback: {
          error: "rgb(var(--color-error) / <alpha-value>)",
          success: "rgb(var(--color-success) / <alpha-value>)",
          warning: "rgb(var(--color-warning) / <alpha-value>)",
        },
        page: {
          from: "rgb(var(--color-page-from) / <alpha-value>)",
          via: "rgb(var(--color-page-via) / <alpha-value>)",
          to: "rgb(var(--color-page-to) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
