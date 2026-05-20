"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VERSE_EASE } from "@/src/config/verseMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useExperienceTimelineMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const rail = root.querySelector<HTMLElement>(".experience-timeline__rail");
    const items = gsap.utils.toArray<HTMLElement>("[data-exp-item]", root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 639px)").matches;
    if (reduced) {
      gsap.set([rail, ...items].filter(Boolean), {
        opacity: 1,
        clearProps: "transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (rail) {
        gsap.set(rail, { scaleY: 0, transformOrigin: "top center" });
      }
      gsap.set(items, { opacity: 0, y: 28, x: narrow ? 0 : -16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 84%",
          once: true,
        },
      });

      if (rail) {
        tl.to(rail, {
          scaleY: 1,
          duration: 0.85,
          ease: VERSE_EASE.smooth,
        });
      }

      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.11,
          ease: VERSE_EASE.enter,
        },
        rail ? "-=0.5" : 0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
