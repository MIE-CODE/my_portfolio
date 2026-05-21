export type AppMode = "tech" | "gamify";

export const APP_MODE_STORAGE_KEY = "app-mode";
export const DEFAULT_APP_MODE: AppMode = "gamify";

export function readStoredAppMode(): AppMode {
  if (typeof window === "undefined") return DEFAULT_APP_MODE;
  try {
    const stored = localStorage.getItem(APP_MODE_STORAGE_KEY);
    return stored === "tech" || stored === "gamify" ? stored : DEFAULT_APP_MODE;
  } catch {
    return DEFAULT_APP_MODE;
  }
}

export function persistAppMode(mode: AppMode): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(APP_MODE_STORAGE_KEY, mode);
  } catch {
    /* private mode / quota */
  }
}

/** Mode applied by the layout boot script before React hydrates. */
export function readAppModeFromDom(): AppMode | null {
  if (typeof document === "undefined") return null;
  const mode = document.documentElement.dataset.mode;
  return mode === "tech" || mode === "gamify" ? mode : null;
}

/** Splash + first paint: prefer boot script on <html>, then storage. */
export function getBootAppMode(): AppMode {
  return readAppModeFromDom() ?? readStoredAppMode();
}

export function applyAppModeDom(mode: AppMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.mode = mode;
}
