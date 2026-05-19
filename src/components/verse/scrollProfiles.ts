import gsap from "gsap";
import type { ScrollProfile } from "@/src/config/verseSpaces";

type ScrubOpts = { scrub: number; ease: "none" };

type ScrollCtx = {
  root: HTMLElement;
  camera: HTMLElement;
  scrollConfig: {
    trigger: HTMLElement;
    start: string;
    end: string;
    invalidateOnRefresh: boolean;
  };
  scrub: (v: number) => ScrubOpts;
};

export function applyScrollProfile(profile: ScrollProfile, ctx: ScrollCtx) {
  const { camera, scrollConfig, scrub } = ctx;

  const layer = (
    selector: string,
    vars: gsap.TweenVars & { scrubSpeed?: number },
  ) => {
    const { scrubSpeed = 1, ...tweenVars } = vars;
    gsap.to(selector, {
      ...tweenVars,
      ease: "none",
      scrollTrigger: { ...scrollConfig, ...scrub(scrubSpeed) },
    });
  };

  switch (profile) {
    case "warp":
      gsap.fromTo(
        camera,
        { scale: 1, y: 0, rotation: 0 },
        {
          scale: 1.22,
          y: -120,
          rotation: 0,
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(1.2) },
        },
      );
      layer("[data-verse='stars-far']", { yPercent: -35, scrubSpeed: 0.6 });
      layer("[data-verse='stars-near']", { yPercent: -80, scrubSpeed: 1 });
      layer("[data-verse='grid']", { yPercent: -55, rotationX: 12, scrubSpeed: 0.9 });
      layer("[data-verse='orb-a']", { yPercent: -90, xPercent: 12, scale: 1.15, scrubSpeed: 1.1 });
      layer("[data-verse='orb-b']", { yPercent: -50, xPercent: -18, scale: 1.08, scrubSpeed: 0.75 });
      layer("[data-verse='orb-c']", { yPercent: -120, xPercent: 8, scrubSpeed: 1.3 });
      layer("[data-verse='ring']", { rotation: 180, scale: 1.35, opacity: 0.5, scrubSpeed: 1 });
      layer("[data-verse='beam']", { scaleY: 1.8, opacity: 0.55, scrubSpeed: 0.85 });
      layer("[data-verse='ui-hud']", { y: -140, x: 40, rotation: 6, scrubSpeed: 1.15 });
      layer("[data-verse='ui-terminal']", { y: -220, x: -60, rotation: -10, scrubSpeed: 1.25 });
      layer("[data-verse='ui-card']", { y: -180, x: 80, rotation: 12, scrubSpeed: 1.05 });
      layer("[data-verse='ui-orbit']", { y: -260, scale: 1.2, rotation: -25, scrubSpeed: 1.35 });
      layer("[data-verse='ui-nodes']", { y: -100, x: -30, scrubSpeed: 0.95 });
      layer("[data-verse='vignette']", { opacity: 0.92, scrubSpeed: 0.5 });
      break;

    case "drift":
      gsap.fromTo(
        camera,
        { x: 0, y: 0 },
        {
          x: 80,
          y: -40,
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(1) },
        },
      );
      layer("[data-verse='stars-far']", { xPercent: -25, yPercent: -20, scrubSpeed: 0.7 });
      layer("[data-verse='stars-near']", { xPercent: -45, yPercent: -50, scrubSpeed: 1.1 });
      layer("[data-verse='grid']", { xPercent: -30, yPercent: -30, rotationZ: 8, scrubSpeed: 0.85 });
      layer("[data-verse='orb-a']", { xPercent: 40, yPercent: -60, scrubSpeed: 1 });
      layer("[data-verse='ring']", { rotation: 120, xPercent: 20, scrubSpeed: 0.9 });
      layer("[data-verse='ui-card']", { x: 120, y: -100, rotation: 8, scrubSpeed: 1.1 });
      layer("[data-verse='vignette']", { opacity: 0.85, scrubSpeed: 0.45 });
      break;

    case "dive":
      gsap.fromTo(
        camera,
        { scale: 1.05, y: 0 },
        {
          scale: 1.35,
          y: -200,
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(1.3) },
        },
      );
      layer("[data-verse='stars-near']", { yPercent: -120, scale: 1.2, scrubSpeed: 1.2 });
      layer("[data-verse='grid']", { yPercent: -90, rotationX: 22, scale: 1.1, scrubSpeed: 1 });
      layer("[data-verse='beam']", { scaleY: 2.4, opacity: 0.7, scrubSpeed: 0.8 });
      layer("[data-verse='orb-c']", { yPercent: -160, scale: 1.3, scrubSpeed: 1.25 });
      layer("[data-verse='ui-terminal']", { y: -300, opacity: 0.3, scrubSpeed: 1.2 });
      layer("[data-verse='vignette']", { opacity: 0.95, scrubSpeed: 0.55 });
      break;

    case "orbit":
      gsap.fromTo(
        camera,
        { rotation: 0, scale: 1 },
        {
          rotation: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(1) },
        },
      );
      layer("[data-verse='ring']", { rotation: 360, scale: 1.5, scrubSpeed: 1.1 });
      layer("[data-verse='orb-a']", { xPercent: 30, yPercent: -40, rotation: 45, scrubSpeed: 0.9 });
      layer("[data-verse='orb-b']", { xPercent: -25, yPercent: -70, scrubSpeed: 1 });
      layer("[data-verse='ui-orbit']", { rotation: 180, scale: 1.4, y: -180, scrubSpeed: 1.2 });
      layer("[data-verse='stars-far']", { rotation: 15, scrubSpeed: 0.65 });
      layer("[data-verse='vignette']", { opacity: 0.88, scrubSpeed: 0.5 });
      break;

    case "scan":
      gsap.fromTo(
        camera,
        { filter: "brightness(1)" },
        {
          filter: "brightness(1.08)",
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(0.9) },
        },
      );
      layer("[data-verse='beam']", { scaleY: 2.2, opacity: 0.75, xPercent: 15, scrubSpeed: 0.7 });
      layer("[data-verse='ui-hud']", { x: -80, y: -60, scrubSpeed: 1 });
      layer("[data-verse='ui-terminal']", { x: 100, y: -140, rotation: 5, scrubSpeed: 1.15 });
      layer("[data-verse='ui-nodes']", { y: -180, scale: 1.15, scrubSpeed: 1.05 });
      layer("[data-verse='grid']", { yPercent: -40, opacity: 0.6, scrubSpeed: 0.75 });
      layer("[data-verse='stars-near']", { yPercent: -60, scrubSpeed: 0.95 });
      layer("[data-verse='vignette']", { opacity: 0.9, scrubSpeed: 0.4 });
      break;

    case "calm":
    default:
      gsap.fromTo(
        camera,
        { y: 0 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: { ...scrollConfig, ...scrub(1.5) },
        },
      );
      layer("[data-verse='stars-far']", { yPercent: -15, scrubSpeed: 0.5 });
      layer("[data-verse='orb-b']", { yPercent: -25, scale: 1.05, scrubSpeed: 0.6 });
      layer("[data-verse='vignette']", { opacity: 0.75, scrubSpeed: 0.35 });
      break;
  }
}
