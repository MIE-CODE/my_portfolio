"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { useTheme } from "@/src/contexts/ThemeContext";
import { playOnView } from "@/src/lib/playOnView";

export function useAboutPageMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const { mode } = useTheme();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const isTech = mode === "tech";
    const heroSection = root.querySelector<HTMLElement>("[data-about-hero-section]");
    const heroIdentity = root.querySelector<HTMLElement>('[data-about-hero="identity"]');
    const heroBio = root.querySelector<HTMLElement>('[data-about-hero="bio"]');
    const timelineSection = root.querySelector<HTMLElement>("[data-about-timeline]");
    const timelineHead = root.querySelector<HTMLElement>("[data-about-timeline-head]");
    const timelineItems = gsap.utils.toArray<HTMLElement>("[data-about-role]", root);
    const aside = root.querySelector<HTMLElement>("[data-about-aside]");
    const asideHeads = gsap.utils.toArray<HTMLElement>("[data-about-aside-head]", root);
    const asidePanels = gsap.utils.toArray<HTMLElement>("[data-about-panel]", root);
    const stackTags = gsap.utils.toArray<HTMLElement>("[data-about-tag]", root);
    const callout = root.querySelector<HTMLElement>("[data-about-callout]");
    const footer = root.querySelector<HTMLElement>("[data-about-footer]");

    const allTargets = [
      heroIdentity,
      heroBio,
      timelineHead,
      ...timelineItems,
      ...asideHeads,
      ...asidePanels,
      ...stackTags,
      callout,
      footer,
    ].filter(Boolean) as HTMLElement[];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(allTargets, { opacity: 1, clearProps: "transform,filter" });
      return;
    }

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (heroSection && heroIdentity && heroBio) {
        gsap.set([heroIdentity, heroBio], { opacity: 0 });
        gsap.set(heroIdentity, { x: isTech ? -36 : -20, y: isTech ? 0 : 12 });
        gsap.set(heroBio, { y: 32, x: isTech ? 0 : 8 });

        cleanups.push(
          playOnView(
            heroSection,
            () => {
              const tl = gsap.timeline();
              tl.to(heroIdentity, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: isTech ? 0.7 : 0.65,
                ease: isTech ? VERSE_EASE.hud : VERSE_EASE.snap,
              }).to(
                heroBio,
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  duration: 0.75,
                  ease: VERSE_EASE.smooth,
                },
                "-=0.42",
              );
            },
            { rootMargin: "0px 0px -4% 0px", threshold: 0.02 },
          ),
        );
      }

      if (timelineSection && timelineItems.length > 0) {
        if (timelineHead) gsap.set(timelineHead, { opacity: 0, y: 18 });
        gsap.set(timelineItems, {
          opacity: 0,
          x: isTech ? -24 : 0,
          y: isTech ? 20 : 28,
          scale: isTech ? 1 : 0.96,
        });

        cleanups.push(
          playOnView(
            timelineSection,
            () => {
              const tl = gsap.timeline();
              if (timelineHead) {
                tl.to(timelineHead, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: VERSE_EASE.hud,
                });
              }
              tl.to(
                timelineItems,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.68,
                  stagger: 0.055,
                  ease: VERSE_EASE.enter,
                },
                timelineHead ? "-=0.28" : 0,
              );
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
          ),
        );
      }

      if (aside && (asidePanels.length > 0 || stackTags.length > 0)) {
        gsap.set(asideHeads, { opacity: 0, y: 14 });
        gsap.set(asidePanels, {
          opacity: 0,
          y: 26,
          scale: isTech ? 0.98 : 0.92,
        });
        gsap.set(stackTags, { opacity: 0, scale: 0.82, y: 8 });
        if (callout) gsap.set(callout, { opacity: 0, y: 20, scale: 0.97 });

        cleanups.push(
          playOnView(
            aside,
            () => {
              const tl = gsap.timeline();
              if (asideHeads.length > 0) {
                tl.to(asideHeads, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  stagger: 0.06,
                  ease: VERSE_EASE.hud,
                });
              }
              tl.to(
                asidePanels,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.62,
                  stagger: 0.05,
                  ease: isTech ? VERSE_EASE.enter : VERSE_EASE.snap,
                },
                asideHeads.length > 0 ? "-=0.22" : 0,
              );
              if (stackTags.length > 0) {
                tl.to(
                  stackTags,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.42,
                    stagger: 0.025,
                    ease: VERSE_EASE.snap,
                  },
                  "-=0.38",
                );
              }
              if (callout) {
                tl.to(
                  callout,
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.55,
                    ease: VERSE_EASE.smooth,
                  },
                  "-=0.2",
                );
              }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
          ),
        );
      }

      if (footer) {
        gsap.set(footer, { opacity: 0, y: 22 });
        cleanups.push(
          playOnView(
            footer,
            () => {
              gsap.to(footer, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: VERSE_EASE.smooth,
              });
            },
            { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
          ),
        );
      }
    }, root);

    return () => {
      cleanups.forEach((stop) => stop());
      ctx.revert();
    };
  }, [mode]);

  return ref;
}
