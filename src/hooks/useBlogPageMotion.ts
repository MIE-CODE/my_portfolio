"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { playOnView } from "@/src/lib/playOnView";

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
    if (reduced) {
      gsap.set([strip, ...sidebar, ...cards].filter(Boolean), {
        opacity: 1,
        clearProps: "transform,filter",
      });
      return;
    }

    let stopObserve: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (strip) gsap.set(strip, { opacity: 0, y: -18 });
      gsap.set(sidebar, { opacity: 0, x: -28 });
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.94 });

      const play = () => {
        const tl = gsap.timeline();

        if (strip) {
          tl.to(strip, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: VERSE_EASE.hud,
          });
        }

        tl.to(
          sidebar,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: VERSE_EASE.enter,
          },
          strip ? "-=0.2" : 0,
        ).to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: VERSE_EASE.enter,
          },
          "-=0.35",
        );
      };

      if (hasPlayed.current) {
        gsap.set(cards, { opacity: 0, y: 24, scale: 0.97 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: VERSE_EASE.enter,
        });
        return;
      }

      stopObserve = playOnView(
        root,
        () => {
          hasPlayed.current = true;
          play();
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
      );
    }, root);

    return () => {
      stopObserve?.();
      ctx.revert();
    };
  }, [refreshKey]);

  return ref;
}
