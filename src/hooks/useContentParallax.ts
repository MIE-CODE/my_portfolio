"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Skip nested `[data-parallax-depth]` when a parent already has it (avoids duplicate scrub). */
function topLevelParallaxEls(root: HTMLElement): HTMLElement[] {
  const els = root.querySelectorAll<HTMLElement>(
    "[data-parallax-depth]:not([data-motion-home] [data-parallax-depth])",
  );

  return Array.from(els).filter((el) => {
    if (el.closest("[data-motion-home]")) return false;
    if (el.matches("#main-content[data-motion-home]")) return false;
    const parentParallax = el.parentElement?.closest("[data-parallax-depth]");
    return !parentParallax;
  });
}

let refreshRaf = 0;

/**
 * Debounced ScrollTrigger refresh — coalesces route-change bursts into one layout pass.
 */
/** True while the verse camera is mid-route (see useParallaxVerse). */
export function isVerseFlying() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.verseFlying != null;
}

export function refreshScrollMotion() {
  if (typeof window === "undefined") return;
  if (isVerseFlying()) return;
  if (refreshRaf) cancelAnimationFrame(refreshRaf);
  refreshRaf = requestAnimationFrame(() => {
    refreshRaf = 0;
    ScrollTrigger.refresh();
  });
}

/**
 * Scroll-scrubbed parallax for top-level `[data-parallax-depth]` inside `root`.
 * Skips home page and `[data-motion-home]` to avoid fighting verse scroll.
 */
export function useContentParallax(
  rootRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
  options?: { disabled?: boolean },
) {
  useEffect(() => {
    if (options?.disabled) return;

    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const filtered = topLevelParallaxEls(root);
    if (filtered.length === 0) return;

    const ctx = gsap.context(() => {
      filtered.forEach((el) => {
        const depth = Math.min(
          1,
          Math.max(0, parseFloat(el.dataset.parallaxDepth ?? "0.25")),
        );
        const y = depth * -48;
        const x = depth * 8 * (el.dataset.parallaxAxis === "x" ? 1 : 0);

        gsap.fromTo(
          el,
          { y: -y * 0.25, x: -x * 0.25 },
          {
            y,
            x,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
    // deps is intentionally caller-driven (e.g. pathname); spread cannot be statically verified.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, options?.disabled, ...deps]);
}
