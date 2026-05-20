"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VERSE_EASE } from "@/src/config/verseMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useServicesCardMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);
    const parts = gsap.utils.toArray<HTMLElement>("[data-service-part]", root);
    const tags = gsap.utils.toArray<HTMLElement>("[data-service-tag]", root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([...cards, ...parts, ...tags], {
        opacity: 1,
        clearProps: "transform,filter",
      });
      return;
    }

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 52,
          x: i % 2 === 0 ? -28 : 28,
          scale: 0.94,
          rotate: i % 2 === 0 ? -0.6 : 0.6,
        });
      });
      gsap.set(parts, { opacity: 0, y: 16 });
      gsap.set(root.querySelectorAll("[data-service-icon]"), { rotate: -10 });
      gsap.set(tags, { opacity: 0, y: 10, scale: 0.88 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        stagger: { each: 0.11, from: "start" },
        ease: VERSE_EASE.enter,
      })
        .to(
          parts,
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.5,
            stagger: { each: 0.045, from: "start" },
            ease: VERSE_EASE.smooth,
          },
          "-=0.5",
        )
        .to(
          tags,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: { each: 0.03, from: "start" },
            ease: VERSE_EASE.snap,
          },
          "-=0.28",
        );

      cards.forEach((card) => {
        const surface = card.querySelector<HTMLElement>(".service-card__surface");
        const accent = card.querySelector<HTMLElement>(".service-card__accent");
        const icon = card.querySelector<HTMLElement>("[data-service-icon]");
        if (!surface) return;

        const onEnter = () => {
          gsap.to(surface, { y: -5, duration: 0.35, ease: VERSE_EASE.smooth });
          if (accent) gsap.to(accent, { scaleX: 1, duration: 0.4, ease: VERSE_EASE.smooth });
          if (icon) gsap.to(icon, { scale: 1.06, rotate: 0, duration: 0.35, ease: VERSE_EASE.snap });
        };
        const onLeave = () => {
          gsap.to(surface, { y: 0, duration: 0.45, ease: VERSE_EASE.smooth });
          if (accent) gsap.to(accent, { scaleX: 0, duration: 0.3, ease: VERSE_EASE.smooth });
          if (icon) gsap.to(icon, { scale: 1, duration: 0.4, ease: VERSE_EASE.smooth });
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
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return ref;
}
