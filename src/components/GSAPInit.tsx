"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NATIVE_SCROLL_ONLY } from "@/src/lib/nativeScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });
}

/** Registers GSAP plugins; keeps scroll native (no smooth-scroll on html). */
export const GSAPInit = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    if (NATIVE_SCROLL_ONLY) {
      ScrollTrigger.normalizeScroll(false);
    }
  }, []);

  return null;
};
