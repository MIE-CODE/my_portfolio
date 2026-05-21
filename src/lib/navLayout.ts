export type NavLayout = "compact" | "deck";

export const NAV_LAYOUT_STORAGE_KEY = "app-nav-layout";
export const DEFAULT_NAV_LAYOUT: NavLayout = "compact";

export function readStoredNavLayout(): NavLayout {
  if (typeof window === "undefined") return DEFAULT_NAV_LAYOUT;
  try {
    const stored = localStorage.getItem(NAV_LAYOUT_STORAGE_KEY);
    return stored === "deck" ? "deck" : DEFAULT_NAV_LAYOUT;
  } catch {
    return DEFAULT_NAV_LAYOUT;
  }
}

export function persistNavLayout(layout: NavLayout): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NAV_LAYOUT_STORAGE_KEY, layout);
  } catch {
    /* ignore quota / private mode */
  }
}

export function applyNavLayoutDom(layout: NavLayout): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.navDeck =
    layout === "deck" ? "open" : "";
}
