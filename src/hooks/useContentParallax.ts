"use client";

import { useEffect, type RefObject } from "react";
import { NATIVE_SCROLL_ONLY } from "@/src/lib/nativeScroll";

/** No-op while native scroll is enforced (scrub parallax disabled). */
export function isVerseFlying() {
  return false;
}

/** No-op — avoids ScrollTrigger.refresh() jank on route changes. */
export function refreshScrollMotion() {}

/**
 * Scroll-scrubbed parallax disabled for native scrolling.
 */
export function useContentParallax(
  _rootRef?: RefObject<HTMLElement | null>,
  _deps?: unknown[],
  _options?: { disabled?: boolean },
) {
  void _rootRef;
  void _deps;
  void _options;
  useEffect(() => {
    if (NATIVE_SCROLL_ONLY) return;
  }, []);
}
