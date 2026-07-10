"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";

type AppLoadContextValue = {
  /** True once the splash is done and the main app tree is mounted. */
  appReady: boolean;
};

const AppLoadContext = createContext<AppLoadContextValue>({ appReady: false });

export function useAppReady() {
  return useContext(AppLoadContext).appReady;
}

const BOOT_SPLASH_ID = "app-splash-boot";

function getBootSplash(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.getElementById(BOOT_SPLASH_ID);
}

/**
 * Splash HTML lives in root layout (first paint, before React).
 * This provider only drives exit timing and removes the boot overlay.
 */
export function AppLoadProvider({ children }: { children: ReactNode }) {
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.classList.add("splash-pending");
    const boot = getBootSplash();
    if (!boot) return;
    const tech = document.documentElement.dataset.mode === "tech";
    boot.setAttribute(
      "aria-valuetext",
      tech ? "Initializing HUD" : "Loading quest",
    );
  }, []);

  // React 18 warns on inert={boolean}; set the DOM property instead.
  useLayoutEffect(() => {
    const node = shellRef.current;
    if (node) node.inert = !gone;
  }, [gone]);

  useEffect(() => {
    const markLoaded = () => setWindowLoaded(true);
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      markLoaded();
      return;
    }
    window.addEventListener("load", markLoaded, { once: true });
    document.addEventListener("DOMContentLoaded", markLoaded, { once: true });
    const t = window.setTimeout(markLoaded, 4000);
    return () => {
      window.removeEventListener("load", markLoaded);
      document.removeEventListener("DOMContentLoaded", markLoaded);
      clearTimeout(t);
    };
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
    }, 8000);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [gone]);

  useEffect(() => {
    if (!exiting) return;
    const boot = getBootSplash();
    boot?.classList.add("app-splash--exiting");
    boot?.setAttribute("aria-busy", "false");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ms = reduced ? 40 : 560;
    const t = window.setTimeout(() => setGone(true), ms);
    return () => clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (!gone) return;
    getBootSplash()?.remove();
    document.documentElement.classList.remove("splash-pending");
    ensureDocumentScrollable();
  }, [gone]);

  return (
    <AppLoadContext.Provider value={{ appReady: gone }}>
      <div ref={shellRef}>{children}</div>
    </AppLoadContext.Provider>
  );
}
