"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { NATIVE_SCROLL_ONLY } from "@/src/lib/nativeScroll";
import { playOnView } from "@/src/lib/playOnView";

if (typeof window !== "undefined" && !NATIVE_SCROLL_ONLY) {
  gsap.registerPlugin(ScrollTrigger);
}

export function useServicesCardMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root.querySelectorAll("[data-service-card], [data-service-part], [data-service-tag], [data-service-icon]"), {
        opacity: 1,
        clearProps: "transform,filter",
      });
      return;
    }

    const cleanups: (() => void)[] = [];
    let stopObserve: (() => void) | undefined;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const parts = card.querySelectorAll<HTMLElement>(
          "[data-service-part], [data-service-tag]",
        );
        const icon = card.querySelector<HTMLElement>("[data-service-icon]");
        gsap.set(card, { opacity: 0, y: 20 });
        gsap.set(parts, { opacity: 0, y: 8 });
        if (icon) gsap.set(icon, { opacity: 0, rotate: -6 });
      });

      const playCards = () => {
        const tl = gsap.timeline(
          NATIVE_SCROLL_ONLY
            ? undefined
            : {
                scrollTrigger: {
                  trigger: root,
                  start: "top 85%",
                  once: true,
                },
              },
        );

        cards.forEach((card, i) => {
          const at = i * 0.045;
          const parts = card.querySelectorAll<HTMLElement>(
            "[data-service-part], [data-service-tag]",
          );
          const icon = card.querySelector<HTMLElement>("[data-service-icon]");

          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: VERSE_EASE.smooth,
            },
            at,
          )
            .to(
              parts,
              {
                opacity: 1,
                y: 0,
                duration: 0.32,
                stagger: 0.018,
                ease: VERSE_EASE.smooth,
              },
              at + 0.06,
            )
            .to(
              icon,
              {
                opacity: 1,
                rotate: 0,
                duration: 0.3,
                ease: VERSE_EASE.snap,
              },
              at + 0.05,
            );
        });
      };

      if (NATIVE_SCROLL_ONLY) {
        stopObserve = playOnView(root, playCards, {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.06,
        });
      } else {
        playCards();
      }

      cards.forEach((card) => {
        const surface = card.querySelector<HTMLElement>(".service-card__surface");
        const accent = card.querySelector<HTMLElement>(".service-card__accent");
        const icon = card.querySelector<HTMLElement>("[data-service-icon]");
        if (!surface) return;

        const onEnter = () => {
          gsap.to(surface, { y: -4, duration: 0.28, ease: VERSE_EASE.smooth });
          if (accent) gsap.to(accent, { scaleX: 1, duration: 0.3, ease: VERSE_EASE.smooth });
          if (icon) gsap.to(icon, { scale: 1.05, duration: 0.28, ease: VERSE_EASE.snap });
        };
        const onLeave = () => {
          gsap.to(surface, { y: 0, duration: 0.32, ease: VERSE_EASE.smooth });
          if (accent) gsap.to(accent, { scaleX: 0, duration: 0.25, ease: VERSE_EASE.smooth });
          if (icon) gsap.to(icon, { scale: 1, duration: 0.3, ease: VERSE_EASE.smooth });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }, root);

    return () => {
      stopObserve?.();
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return ref;
}
