"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  applyAppModeDom,
  DEFAULT_APP_MODE,
  persistAppMode,
  readStoredAppMode,
  type AppMode,
} from "@/src/lib/appMode";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";

export type { AppMode } from "@/src/lib/appMode";

export type ColorScheme = "light" | "dark";

interface ThemeContextType {
  mode: AppMode;
  resolvedScheme: ColorScheme;
  /** False until client has read storage — keeps SSR and hydration aligned. */
  ready: boolean;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: DEFAULT_APP_MODE,
  resolvedScheme: "dark",
  ready: false,
  setMode: () => {},
  toggleMode: () => {},
});

function getSystemScheme(): ColorScheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyDom(mode: AppMode, scheme: ColorScheme) {
  applyAppModeDom(mode);
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", scheme === "dark");
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>(DEFAULT_APP_MODE);
  const [resolvedScheme, setResolvedScheme] = useState<ColorScheme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initialMode = readStoredAppMode();
    const initialScheme = getSystemScheme();
    setModeState(initialMode);
    setResolvedScheme(initialScheme);
    applyDom(initialMode, initialScheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDom(mode, resolvedScheme);
  }, [mode, resolvedScheme, ready]);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const scheme = mq.matches ? "dark" : "light";
      setResolvedScheme(scheme);
      applyDom(mode, scheme);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode, ready]);

  const setMode = useCallback((newMode: AppMode) => {
    setModeState((current) => {
      if (current === newMode) return current;
      if (typeof window !== "undefined") {
        persistAppMode(newMode);
        applyDom(newMode, getSystemScheme());
        ensureDocumentScrollable();
      }
      return newMode;
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "tech" ? "gamify" : "tech");
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider
      value={{ mode, resolvedScheme, ready, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
