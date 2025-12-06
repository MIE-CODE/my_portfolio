"use client";
import { ThemeProvider } from "../contexts/ThemeContext";

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

