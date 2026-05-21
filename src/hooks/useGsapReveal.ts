"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { NATIVE_SCROLL_ONLY } from "@/src/lib/nativeScroll";
import { playOnView } from "@/src/lib/playOnView";

if (typeof window !== "undefined" && !NATIVE_SCROLL_ONLY) {
  gsap.registerPlugin(ScrollTrigger);
}

export type GsapRevealPreset =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "fadeLeft"
  | "hudRise"
  | "orbitIn"
  | "depthFade"
  | "scanLeft"
  | "dataPulse"
  | "hudPanel"
  | "warpIn"
  | "streamIn"
  | "smoothRise";

const presets: Record<
  GsapRevealPreset,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fadeUp: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  scaleIn: { from: { opacity: 0, scale: 0.92 }, to: { opacity: 1, scale: 1 } },
  fadeLeft: { from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
  hudRise: {
    from: { opacity: 0, y: 56, scale: 0.96, rotateZ: 2 },
    to: { opacity: 1, y: 0, scale: 1, rotateZ: 0 },
  },
  orbitIn: {
    from: { opacity: 0, x: 72, rotateZ: 6, scale: 0.94 },
    to: { opacity: 1, x: 0, rotateZ: 0, scale: 1 },
  },
  depthFade: {
    from: { opacity: 0, y: 80, scale: 0.88, filter: "blur(6px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  scanLeft: {
    from: { opacity: 0, x: -56, skewX: 4 },
    to: { opacity: 1, x: 0, skewX: 0 },
  },
  dataPulse: {
    from: { opacity: 0, scale: 0.82, y: 24 },
    to: { opacity: 1, scale: 1, y: 0 },
  },
  hudPanel: {
    from: { opacity: 0, y: 36, x: 28, rotateZ: -2 },
    to: { opacity: 1, y: 0, x: 0, rotateZ: 0 },
  },
  warpIn: {
    from: { opacity: 0, scale: 1.12, y: -28, rotateZ: -3 },
    to: { opacity: 1, scale: 1, y: 0, rotateZ: 0 },
  },
  streamIn: {
    from: { opacity: 0, x: 48, y: 16 },
    to: { opacity: 1, x: 0, y: 0 },
  },
  smoothRise: {
    from: { opacity: 0, y: 28, scale: 0.96 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
};

export interface GsapRevealOptions {
  preset?: GsapRevealPreset;
  duration?: number;
  delay?: number;
  stagger?: number | gsap.StaggerVars;
  childSelector?: string;
  start?: string;
  once?: boolean;
  /** 0–1 scroll-scrub parallax drift on the root element */
  parallax?: number;
  ease?: string;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyParallax(root: HTMLElement, depth: number) {
  if (depth <= 0 || NATIVE_SCROLL_ONLY) return;
  const y = depth * -64;
  gsap.fromTo(
    root,
    { y: y * -0.3 },
    {
      y,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5 + depth * 0.5,
      },
    },
  );
}

function runReveal(
  root: HTMLElement,
  options: GsapRevealOptions,
  scrollTrigger: boolean,
) {
  const {
    preset = "fadeUp",
    duration = 0.75,
    delay = 0,
    stagger = 0.1,
    childSelector = "[data-reveal-item]",
    start = "top 88%",
    once = true,
    parallax = 0,
    ease = VERSE_EASE.enter,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(root, { opacity: 1, clearProps: "transform,filter" });
    gsap.set(root.querySelectorAll(childSelector), {
      opacity: 1,
      clearProps: "transform,filter",
    });
    return () => {};
  }

  const { from, to } = presets[preset];
  const children = root.querySelectorAll(childSelector);
  const targets = children.length > 0 ? children : root;

  const tweenVars: gsap.TweenVars = {
    ...to,
    duration,
    delay,
    stagger: children.length > 0 ? stagger : 0,
    ease,
  };

  if (scrollTrigger) {
    tweenVars.scrollTrigger = { trigger: root, start, once };
    gsap.set(targets, from);
    gsap.to(targets, tweenVars);
  } else {
    gsap.fromTo(targets, from, tweenVars);
  }

  if (
    parallax > 0 &&
    !root.closest("[data-motion-home]") &&
    !root.parentElement?.closest("[data-parallax-depth]")
  ) {
    applyParallax(root, parallax);
  }

  return () => {};
}

export function useGsapReveal(options: GsapRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    preset = "fadeUp",
    duration = 0.75,
    delay = 0,
    stagger = 0.1,
    childSelector = "[data-reveal-item]",
    start = "top 88%",
    once = true,
    parallax = 0,
    ease = VERSE_EASE.enter,
  } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const opts = {
      preset,
      duration,
      delay,
      stagger,
      childSelector,
      start,
      once,
      parallax,
      ease,
    };

    if (NATIVE_SCROLL_ONLY) {
      let stopObserve: (() => void) | undefined;
      const ctx = gsap.context(() => {
        stopObserve = playOnView(root, () => {
          runReveal(root, opts, false);
        });
      }, root);
      return () => {
        stopObserve?.();
        ctx.revert();
      };
    }

    const ctx = gsap.context(() => runReveal(root, opts, true), root);
    return () => ctx.revert();
  }, [preset, duration, delay, stagger, childSelector, start, once, parallax, ease]);

  return ref;
}

export function useGsapMount(options: GsapRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    preset = "fadeUp",
    duration = 0.75,
    delay = 0,
    stagger = 0.1,
    childSelector = "[data-reveal-item]",
    parallax = 0,
    ease = VERSE_EASE.enter,
  } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(
      () =>
        runReveal(
          root,
          { preset, duration, delay, stagger, childSelector, parallax, ease },
          false,
        ),
      root,
    );
    return () => ctx.revert();
  }, [preset, duration, delay, stagger, childSelector, parallax, ease]);

  return ref;
}
