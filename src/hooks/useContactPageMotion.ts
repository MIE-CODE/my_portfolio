"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { playOnView } from "@/src/lib/playOnView";

export function useContactPageMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const strip = root.querySelector<HTMLElement>("[data-comms-strip]");
    const channels = gsap.utils.toArray<HTMLElement>("[data-comms-channel]", root);
    const telemetry = gsap.utils.toArray<HTMLElement>("[data-comms-telemetry]", root);
    const panel = root.querySelector<HTMLElement>("[data-comms-panel]");
    const fields = gsap.utils.toArray<HTMLElement>("[data-comms-field]", root);
    const actions = gsap.utils.toArray<HTMLElement>("[data-comms-action]", root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([strip, ...channels, ...telemetry, panel, ...fields, ...actions].filter(Boolean), {
        opacity: 1,
        clearProps: "transform,filter",
      });
      return;
    }

    let stopObserve: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (strip) gsap.set(strip, { opacity: 0, y: -20 });
      gsap.set(channels, { opacity: 0, x: -36, scale: 0.96 });
      gsap.set(telemetry, { opacity: 0, y: 12 });
      if (panel) gsap.set(panel, { opacity: 0, y: 48, scale: 0.94, rotateX: 4 });
      gsap.set(fields, { opacity: 0, y: 22 });
      gsap.set(actions, { opacity: 0, y: 16, scale: 0.92 });

      const play = () => {
        const tl = gsap.timeline();

        if (strip) {
          tl.to(strip, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: VERSE_EASE.hud,
          });
        }

        tl.to(
          channels,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: VERSE_EASE.enter,
          },
          strip ? "-=0.25" : 0,
        ).to(
          telemetry,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: VERSE_EASE.smooth,
          },
          "-=0.45",
        );

        if (panel) {
          tl.to(
            panel,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.85,
              ease: VERSE_EASE.hud,
            },
            "-=0.55",
          );
        }

        tl.to(
          fields,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: VERSE_EASE.smooth,
          },
          "-=0.5",
        ).to(
          actions,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: VERSE_EASE.snap,
          },
          "-=0.28",
        );
      };

      stopObserve = playOnView(root, play, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    }, root);

    return () => {
      stopObserve?.();
      ctx.revert();
    };
  }, []);

  return ref;
}
