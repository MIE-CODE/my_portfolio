"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Homepage stack — fade-only stagger (no vertical slide). */
export function useStackHomeReveal(
  sectionRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("#skills-heading");
    const cards = section.querySelectorAll<HTMLElement>("[data-stack-item]");

    if (prefersReducedMotion()) {
      gsap.set([heading, ...Array.from(cards)].filter(Boolean), {
        autoAlpha: 1,
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = [heading, ...Array.from(cards)].filter(
        Boolean,
      ) as HTMLElement[];

      gsap.set(targets, { autoAlpha: 0 });

      const tl = gsap.timeline({
        delay: 1.28,
        defaults: {
          ease: "sine.out",
          overwrite: "auto",
        },
      });

      if (heading) {
        tl.to(heading, {
          autoAlpha: 1,
          duration: 1.05,
        });
      }

      if (cards.length > 0) {
        tl.to(
          cards,
          {
            autoAlpha: 1,
            duration: 1.2,
            stagger: {
              amount: 2.75,
              from: "start",
              ease: "sine.inOut",
            },
          },
          heading ? "-=0.65" : 0,
        );
      }

      tl.eventCallback("onComplete", () => {
        gsap.set(targets, { clearProps: "visibility" });
      });
    }, section);

    return () => ctx.revert();
  }, [enabled, sectionRef]);
}
