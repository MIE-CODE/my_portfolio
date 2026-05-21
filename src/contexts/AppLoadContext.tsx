"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_APP_MODE,
  getBootAppMode,
  type AppMode,
} from "@/src/lib/appMode";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";

type AppLoadContextValue = {
  /** True once the splash is done and the main app tree is mounted. */
  appReady: boolean;
};

const AppLoadContext = createContext<AppLoadContextValue>({ appReady: false });

export function useAppReady() {
  return useContext(AppLoadContext).appReady;
}

/**
 * App mounts immediately under a fixed splash overlay so document height and
 * native scroll work as soon as the page paints. Splash fades out after load.
 */
export function AppLoadProvider({ children }: { children: ReactNode }) {
  const [splashMode, setSplashMode] = useState<AppMode>(DEFAULT_APP_MODE);
  const [showSplash, setShowSplash] = useState(false);
  const isTech = splashMode === "tech";
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    setSplashMode(getBootAppMode());
    setShowSplash(true);
  }, []);

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 40 : 560;
    const t = window.setTimeout(() => setGone(true), ms);
    return () => clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (gone) ensureDocumentScrollable();
  }, [gone]);

  return (
    <AppLoadContext.Provider value={{ appReady: gone }}>
      <div {...(!gone ? { inert: true as const } : {})}>{children}</div>
      {showSplash && !gone && (
        <div
          className={`app-splash app-splash--${splashMode} pointer-events-none fixed inset-0 z-[9999] isolate min-h-dvh w-full overflow-hidden${exiting ? " app-splash--exiting" : ""}`}
          suppressHydrationWarning
          role="progressbar"
          aria-valuetext={isTech ? "Initializing HUD" : "Loading quest"}
          aria-busy={!exiting}
        >
          {isTech ? (
            <>
              <span className="app-splash__scan" aria-hidden />
              <div className="app-splash__frame" aria-hidden>
                <span className="app-splash__corner app-splash__corner--tl" />
                <span className="app-splash__corner app-splash__corner--tr" />
                <span className="app-splash__corner app-splash__corner--bl" />
                <span className="app-splash__corner app-splash__corner--br" />
              </div>
              <div className="app-splash__inner pointer-events-none">
                <div className="app-splash__mark" aria-hidden>
                  <span className="app-splash__mark-line" />
                  <span className="app-splash__mark-line app-splash__mark-line--delay" />
                </div>
                <p className="app-splash__tag type-label hud-label font-mono">
                  BOOT_SEQUENCE
                </p>
                <p className="app-splash__title font-mono">M_I_E_CODE</p>
                <div className="app-splash__loader app-splash__loader--hud" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className="app-splash__loader-seg"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="app-splash__inner pointer-events-none">
              <span className="app-splash__orb" aria-hidden />
              <p className="app-splash__title font-display gradient-text">MIE</p>
              <div className="app-splash__loader app-splash__loader--quest" aria-hidden>
                {Array.from({ length: 3 }, (_, i) => (
                  <span
                    key={i}
                    className="app-splash__loader-dot"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <div className="app-splash__xp" aria-hidden>
                <span className="app-splash__xp-fill" />
              </div>
            </div>
          )}
        </div>
      )}
    </AppLoadContext.Provider>
  );
}
