"use client";

import { useEffect } from "react";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";
import { NATIVE_SCROLL_ONLY } from "@/src/lib/nativeScroll";

/** Keeps document scroll native — no GSAP scroll plugins or smooth-scroll overrides. */
export const GSAPInit = () => {
  useEffect(() => {
    ensureDocumentScrollable();
    if (!NATIVE_SCROLL_ONLY) return;
    document.documentElement.style.scrollBehavior = "auto";
  }, []);

  return null;
};
