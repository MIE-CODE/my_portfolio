"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { resetScrollLock } from "@/src/lib/scrollLock";

type AppLoadContextValue = {
  /** True once the splash is done and the main app tree is mounted. */
  appReady: boolean;
};

const AppLoadContext = createContext<AppLoadContextValue>({ appReady: false });

export function useAppReady() {
  return useContext(AppLoadContext).appReady;
}

/**
 * While loading, only the splash is in the DOM. The full app (verse, nav, pages)
 * mounts after window load + a short minimum display, then the splash unmounts.
 */
export function AppLoadProvider({ children }: { children: ReactNode }) {
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onLoad = () => setWindowLoaded(true);
    if (document.readyState === "complete") {
      setWindowLoaded(true);
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setMinElapsed(true), 480);
    return () => clearTimeout(t);
  }, []);

  const canFinish = windowLoaded && minElapsed;

  useEffect(() => {
    if (!canFinish || exiting || gone) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setExiting(true));
    });
    return () => cancelAnimationFrame(id);
  }, [canFinish, exiting, gone]);

  useEffect(() => {
    if (gone) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      if (cancelled) return;
      setWindowLoaded(true);
      setMinElapsed(true);
      setExiting(true);
    }, 14000);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [gone]);

  useEffect(() => {
    if (!exiting) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 40 : 560;
    const t = window.setTimeout(() => setGone(true), ms);
    return () => clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (gone) resetScrollLock();
  }, [gone]);

  if (gone) {
    return (
      <AppLoadContext.Provider value={{ appReady: true }}>
        {children}
      </AppLoadContext.Provider>
    );
  }

  return (
    <AppLoadContext.Provider value={{ appReady: false }}>
      <div
        className={`app-splash fixed inset-0 z-[9999] isolate min-h-dvh w-full overflow-hidden${exiting ? " app-splash--exiting" : ""}`}
        role="progressbar"
        aria-valuetext="Loading portfolio"
        aria-busy={!exiting}
      >
        <div className="app-splash__inner">
          <div className="app-splash__mark" aria-hidden>
            <span className="app-splash__mark-line" />
            <span className="app-splash__mark-line app-splash__mark-line--delay" />
          </div>
          <p className="app-splash__title font-mono text-sm tracking-[0.35em] text-muted-800 dark:text-muted-100">
            M_I_E_CODE
          </p>
          <p className="app-splash__subtitle mt-2 text-xs text-muted-500 dark:text-muted-400">
            Loading scene & assets…
          </p>
        </div>
      </div>
    </AppLoadContext.Provider>
  );
}
