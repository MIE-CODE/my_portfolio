import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const scale = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => [
      n,
      `rgb(var(--${name}-${n}) / <alpha-value>)`,
    ]),
  ) as Record<number, string>;

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
      },
      borderRadius: {
        ui: "var(--radius-ui)",
        sharp: "var(--radius-sharp)",
        field: "var(--radius-field)",
        quest: "var(--radius-quest, 12px)",
      },
      colors: {
        primary: scale("primary"),
        accent: scale("accent"),
        muted: { ...scale("muted"), 950: "rgb(var(--muted-950) / <alpha-value>)" },
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        level: "rgb(var(--level-up) / <alpha-value>)",
        hud: {
          cyan: "rgb(var(--hud-cyan) / <alpha-value>)",
          gold: "rgb(var(--hud-gold) / <alpha-value>)",
          steel: "rgb(var(--hud-steel) / <alpha-value>)",
          danger: "rgb(var(--hud-danger) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, rgb(var(--gradient-primary-from)) 0%, rgb(var(--gradient-primary-via)) 55%, rgb(var(--gradient-primary-to)) 100%)",
        "gradient-text":
          "linear-gradient(135deg, rgb(var(--gradient-primary-from)) 0%, rgb(var(--gradient-primary-via)) 45%, rgb(var(--gradient-primary-to)) 100%)",
        "gradient-soft":
          "linear-gradient(135deg, rgb(var(--gradient-primary-from)) 0%, rgb(var(--gradient-primary-via)) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "scan-sweep": "scanSweep 6s ease-in-out infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scanSweep: {
          "0%": { top: "12%", opacity: "0" },
          "10%": { opacity: "0.65" },
          "90%": { opacity: "0.65" },
          "100%": { top: "88%", opacity: "0" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("tech", '[data-mode="tech"] &');
      addVariant("gamify", '[data-mode="gamify"] &');
    }),
  ],
};

export default config;
