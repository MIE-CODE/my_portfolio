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
      colors: {
        primary: {
          50: "#f5f7fa",
          100: "#e8ecf1",
          200: "#d1d9e3",
          300: "#a9b8c7",
          400: "#7a91a5",
          500: "#5a7288",
          600: "#475a6f",
          700: "#3b4a5c",
          800: "#34404d",
          900: "#2f3842",
        },
        accent: {
          50: "#faf8f5",
          100: "#f4f0e8",
          200: "#e8dfd1",
          300: "#d4c4b0",
          400: "#bda588",
          500: "#a68d6f",
          600: "#937a5f",
          700: "#7a6550",
          800: "#665445",
          900: "#56473c",
        },
        muted: {
          50: "#f1f3f5",
          100: "#e2e6ea",
          200: "#d1d6dc",
          300: "#b8c0c8",
          400: "#9ca5ae",
          500: "#7a8590",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #5a7288 0%, #a68d6f 100%)",
        "gradient-text": "linear-gradient(135deg, #5a7288 0%, #937a5f 50%, #868e96 100%)",
        "gradient-soft": "linear-gradient(135deg, #5a7288 0%, #a68d6f 100%)",
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

