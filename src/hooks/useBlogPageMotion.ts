"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";

function showAll(
  strip: HTMLElement | null,
  sidebar: HTMLElement[],
  cards: HTMLElement[],
) {
  gsap.set([strip, ...sidebar, ...cards].filter(Boolean), {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    clearProps: "opacity,transform,filter",
  });
}

export function useBlogPageMotion(refreshKey?: string | number) {
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const strip = root.querySelector<HTMLElement>("[data-stream-strip]");
    const sidebar = gsap.utils.toArray<HTMLElement>("[data-stream-sidebar-part]", root);
    const cards = gsap.utils.toArray<HTMLElement>("[data-stream-card]", root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      showAll(strip, sidebar, cards);

      if (reduced) return;

      if (hasPlayed.current) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: VERSE_EASE.enter,
            overwrite: "auto",
          },
        );
        return;
      }

      hasPlayed.current = true;

      if (strip) gsap.set(strip, { opacity: 0, y: -14 });
      gsap.set(cards, { opacity: 0, y: 32, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: VERSE_EASE.enter, overwrite: "auto" },
      });

      if (strip) {
        tl.to(strip, { opacity: 1, y: 0, duration: 0.45, ease: VERSE_EASE.hud });
      }

      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
        },
        strip ? "-=0.15" : 0,
      );
    }, root);

    return () => ctx.revert();
  }, [refreshKey]);

  return ref;
}
