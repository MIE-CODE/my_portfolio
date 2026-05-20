import type { Config } from "tailwindcss";

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
      colors: {
        primary: {
          50: "#f2f6fb",
          100: "#e4edf6",
          200: "#cddceb",
          300: "#a8c0d9",
          400: "#7d9fc0",
          500: "#5b82a8",
          600: "#456d94",
          700: "#3a5c80",
          800: "#334d6b",
          900: "#2c4058",
        },
        accent: {
          50: "#faf7f2",
          100: "#f3ebe0",
          200: "#e6d5c4",
          300: "#d4b99e",
          400: "#c19a75",
          500: "#b38256",
          600: "#9d6d48",
          700: "#835a3e",
          800: "#6c4c38",
          900: "#594030",
        },
        muted: {
          50: "#ebe6de",
          100: "#e2dcd2",
          200: "#d4cdc2",
          300: "#c4bcb0",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #5b82a8 0%, #456d94 55%, #3a5c80 100%)",
        "gradient-text": "linear-gradient(135deg, #5b82a8 0%, #456d94 45%, #334d6b 100%)",
        "gradient-soft": "linear-gradient(135deg, #5b82a8 0%, #456d94 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
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
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

