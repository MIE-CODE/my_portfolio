import type { ScrollProfile } from "@/src/config/verseSpaces";
import { getVerseSector } from "@/src/config/verseSpaces";
import type { GsapRevealPreset } from "@/src/hooks/useGsapReveal";

/** GSAP ease curves tuned for cinematic / HUD motion */
export const VERSE_EASE = {
  enter: "power3.out",
  orbit: "power2.inOut",
  snap: "back.out(1.4)",
  hud: "expo.out",
  smooth: "power2.out",
} as const;

const scrollToPreset: Record<ScrollProfile, GsapRevealPreset> = {
  warp: "warpIn",
  drift: "orbitIn",
  dive: "depthFade",
  orbit: "scanLeft",
  scan: "hudPanel",
  calm: "hudRise",
};

export function getPageHeaderPreset(pathname: string): GsapRevealPreset {
  return scrollToPreset[getVerseSector(pathname).scroll] ?? "hudRise";
}

/** Default reveal preset per page route for list/grid sections */
export function getSectionPreset(pathname: string): GsapRevealPreset {
  const scroll = getVerseSector(pathname).scroll;
  if (scroll === "dive") return "depthFade";
  if (scroll === "drift") return "orbitIn";
  if (scroll === "scan") return "streamIn";
  if (scroll === "orbit") return "scanLeft";
  return "hudRise";
}
