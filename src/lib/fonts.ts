import { Inter, JetBrains_Mono } from "next/font/google";

/** Self-hosted Inter — removes render-blocking Google Fonts CSS */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
