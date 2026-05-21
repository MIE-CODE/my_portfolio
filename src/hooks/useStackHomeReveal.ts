"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Homepage stack — quick fade stagger after hero (no long slide delays). */
export function useStackHomeReveal(
  sectionRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("#skills-heading");
    const intro = section.querySelector<HTMLElement>("[data-stack-intro]");
    const categories = section.querySelectorAll<HTMLElement>("[data-stack-category]");
    const cards = section.querySelectorAll<HTMLElement>(
      "[data-stack-card], .stack-hud__module",
    );

    if (prefersReducedMotion()) {
      gsap.set(
        [heading, intro, ...Array.from(categories), ...Array.from(cards)].filter(Boolean),
        { autoAlpha: 1, clearProps: "all" },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const headerTargets = [heading, intro].filter(Boolean) as HTMLElement[];
      const cardTargets = Array.from(cards);

      gsap.set(headerTargets, { autoAlpha: 0, y: 12 });
      gsap.set(categories, { autoAlpha: 0, y: 10 });
      gsap.set(cardTargets, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({
        delay: 0.35,
        defaults: { ease: "power2.out", overwrite: "auto" },
      });

      if (headerTargets.length > 0) {
        tl.to(headerTargets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
        });
      }

      if (categories.length > 0) {
        tl.to(
          categories,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.05,
          },
          headerTargets.length > 0 ? "-=0.2" : 0,
        );
      }

      if (cardTargets.length > 0) {
        tl.to(
          cardTargets,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: { each: 0.022, from: "start" },
          },
          "-=0.12",
        );
      }

      tl.eventCallback("onComplete", () => {
        gsap.set([...headerTargets, ...Array.from(categories), ...cardTargets], {
          clearProps: "visibility,y",
        });
      });
    }, section);

    return () => ctx.revert();
  }, [enabled, sectionRef]);
}
