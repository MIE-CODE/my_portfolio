/**
 * Modal-only: lock background scroll without touching html overflow
 * (locking both html+body breaks scroll restore on iOS).
 */
const LOCK_CLASS = "scroll-locked";

let lockCount = 0;

export function lockScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount === 1) {
    document.body.classList.add(LOCK_CLASS);
  }
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.classList.remove(LOCK_CLASS);
  }
}

export function resetScrollLock() {
  if (typeof document === "undefined") return;
  lockCount = 0;
  document.documentElement.classList.remove(LOCK_CLASS);
  document.body.classList.remove(LOCK_CLASS);
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
}
