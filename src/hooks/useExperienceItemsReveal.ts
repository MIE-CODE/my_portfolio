"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { playOnView } from "@/src/lib/playOnView";

const ITEM_DELAYS = [0.04, 0.04, 0.04, 0.4];

export function useExperienceItemsReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-exp-item]", root);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set(items, { opacity: 1, clearProps: "transform,filter" });
      return;
    }

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 28, scale: 0.96 });

        cleanups.push(
          playOnView(
            item,
            () => {
              gsap.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.65,
                delay: ITEM_DELAYS[index] ?? index * 0.04,
                ease: VERSE_EASE.smooth,
                overwrite: "auto",
              });
            },
            {
              rootMargin: "0px 0px -10% 0px",
              threshold: 0.18,
              immediate: false,
            },
          ),
        );
      });
    }, root);

    return () => {
      cleanups.forEach((stop) => stop());
      ctx.revert();
    };
  }, []);

  return ref;
}
