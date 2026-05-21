import { resetScrollLock } from "@/src/lib/scrollLock";

/** Clear stale locks / inline styles so the document can scroll natively. */
export function ensureDocumentScrollable() {
  if (typeof document === "undefined") return;
  resetScrollLock();
  document.documentElement.style.scrollBehavior = "auto";
}
