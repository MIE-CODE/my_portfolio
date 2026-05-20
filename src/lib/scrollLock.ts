/**
 * Modal-only scroll lock. Uses a class so we never leave stale inline overflow.
 */
const LOCK_CLASS = "scroll-locked";

export function lockScroll() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add(LOCK_CLASS);
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove(LOCK_CLASS);
}

export function resetScrollLock() {
  unlockScroll();
}
