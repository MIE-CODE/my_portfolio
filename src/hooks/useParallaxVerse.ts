"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PathSample } from "@/src/components/verse/verseState";
import {
  verseTargetToWorld,
  worldSnapshotFromTarget,
} from "@/src/components/verse/verseState";
import type { VerseTarget } from "@/src/components/verse/verseState";
import { VERSE_LATERAL_MAX } from "@/src/components/verse/verseState";
import { flightDuration, routeToPathIndex } from "@/src/config/verseCameraPath";
import { refreshScrollMotion } from "@/src/hooks/useContentParallax";
import { getRouteViewpoint } from "@/src/config/verseCinematics";
import {
  CHAMBER_STEP_VW,
  detectLowPower,
  getVerseTransform,
  getVerseZone,
} from "@/src/config/verseMap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ParallaxVerseRefs = {
  root: React.RefObject<HTMLDivElement | null>;
  rig: React.RefObject<HTMLDivElement | null>;
  hudPart: React.RefObject<HTMLParagraphElement | null>;
  hudZone: React.RefObject<HTMLParagraphElement | null>;
};

type VerseVars = {
  panX: number;
  lateralPx: number;
  depthPx: number;
  scale: number;
  rotate: number;
};

const LATERAL_WHEEL_GAIN = 0.14;

type TravelState = {
  pathAnchor: number;
  viewAnchor: number;
  travelT: number;
  flightStart: PathSample | null;
  flightEnd: PathSample | null;
};

function applyVars(el: HTMLElement, v: VerseVars) {
  el.style.setProperty("--verse-pan-x", `${v.panX}vw`);
  el.style.setProperty("--verse-depth", `${v.depthPx}px`);
  el.style.setProperty("--verse-scale", String(v.scale));
  el.style.setProperty("--verse-rot", `${v.rotate}deg`);
}

function varsFromState(
  pathname: string,
  pathAnchor: number,
  chamber: number,
  scrollP: number,
  lateralPx: number,
  use3d: boolean,
): VerseVars {
  const zone = getVerseZone(pathname);
  const t = getVerseTransform(zone, chamber, scrollP);

  if (!use3d) {
    return {
      panX: t.panX,
      lateralPx,
      depthPx: t.depthPx,
      scale: t.scale,
      rotate: t.rotate,
    };
  }

  const c = Math.max(0, Math.min(2, chamber));
  const p = Math.max(0, Math.min(1, scrollP));
  const latNorm = lateralPx / VERSE_LATERAL_MAX;
  return {
    panX: pathAnchor * 2.2 + (c - 1) * CHAMBER_STEP_VW * 0.35 + latNorm * 5,
    lateralPx,
    depthPx: p * 32,
    scale: 1 + p * 0.015,
    rotate: (c - 1) * 0.25 + p * 0.4 + latNorm * 0.35,
  };
}

function buildTarget(
  pathname: string,
  chamber: number,
  scrollP: number,
  lateralPx: number,
  travel: TravelState,
): VerseTarget {
  const zone = getVerseZone(pathname);
  const v = varsFromState(pathname, travel.pathAnchor, chamber, scrollP, lateralPx, true);
  return {
    ...v,
    pathname,
    pathAnchor: travel.pathAnchor,
    viewAnchor: travel.viewAnchor,
    travelT: travel.travelT,
    flightStart: travel.flightStart,
    flightEnd: travel.flightEnd,
    routeIndex: zone.routeIndex,
    chamberIndex: chamber,
  };
}

function idleTravel(anchor: number): TravelState {
  return {
    pathAnchor: anchor,
    viewAnchor: anchor,
    travelT: 1,
    flightStart: null,
    flightEnd: null,
  };
}

function readPageScrollProgress() {
  const st = ScrollTrigger.getAll().find(
    (trigger) => trigger.trigger === document.documentElement,
  );
  return st?.progress ?? 0;
}

function settledSnapshot(
  pathname: string,
  targetIndex: number,
  chamber: number,
  scrollP: number,
  lateralPx: number,
): PathSample {
  const t = buildTarget(pathname, chamber, scrollP, lateralPx, idleTravel(targetIndex));
  return worldSnapshotFromTarget(t, targetIndex);
}

export function useParallaxVerse(refs: ParallaxVerseRefs) {
  const pathname = usePathname();
  const zone = getVerseZone(pathname);
  const initialAnchor = routeToPathIndex(pathname);

  const chamberRef = useRef(1);
  const scrollRef = useRef(0);
  const lateralRef = useRef(0);
  const travelRef = useRef<TravelState>(idleTravel(initialAnchor));
  const use3dRef = useRef(false);
  const varsRef = useRef<VerseVars>(
    varsFromState(pathname, initialAnchor, 1, 0, 0, false),
  );
  const verseTargetRef = useRef<VerseTarget>(
    buildTarget(pathname, 1, 0, 0, travelRef.current),
  );
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pathTweenRef = useRef<gsap.core.Tween | null>(null);
  const panLockRef = useRef(false);
  const flightGenRef = useRef(0);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const [mounted, setMounted] = useState(false);
  const [use3d, setUse3d] = useState(false);
  const [verseQuality, setVerseQuality] = useState<"full" | "low">("low");
  const lowPowerRef = useRef(true);
  use3dRef.current = use3d;

  const [partIndex, setPartIndex] = useState(1);
  const [canPanLeft, setCanPanLeft] = useState(true);
  const [canPanRight, setCanPanRight] = useState(true);
  const [cinematicTagline, setCinematicTagline] = useState(
    () => getRouteViewpoint(pathname).tagline,
  );

  const commitTarget = useCallback(
    (
      pathname: string,
      chamber: number,
      scrollP: number,
      lateralPx: number,
      travel: TravelState,
    ) => {
      travelRef.current = travel;
      lateralRef.current = lateralPx;
      verseTargetRef.current = buildTarget(
        pathname,
        chamber,
        scrollP,
        lateralPx,
        travel,
      );
      const nextTagline = verseTargetToWorld(verseTargetRef.current).tagline;
      setCinematicTagline((prev) => (prev === nextTagline ? prev : nextTagline));
    },
    [],
  );

  const pushVerseState = useCallback(
    (pathname: string, chamber: number, scrollP: number, lateralPx: number) => {
      const v = varsFromState(
        pathname,
        travelRef.current.pathAnchor,
        chamber,
        scrollP,
        lateralPx,
        use3dRef.current,
      );
      varsRef.current = v;
      const rig = refs.rig.current;
      if (rig) applyVars(rig, v);
      commitTarget(pathname, chamber, scrollP, lateralPx, travelRef.current);
    },
    [refs.rig, commitTarget],
  );

  const syncHud = useCallback(
    (chamber: number) => {
      const z = getVerseZone(pathnameRef.current);
      const part = z.parts[chamber];
      if (refs.hudPart.current) refs.hudPart.current.textContent = part.name;
      if (refs.hudZone.current) refs.hudZone.current.textContent = z.label;
      setCanPanLeft(chamber > 0);
      setCanPanRight(chamber < 2);
    },
    [refs],
  );

  const animateChamberScroll = useCallback(
    (pathname: string, chamber: number, scrollP: number, duration = 0.65) => {
      const target = varsFromState(
        pathname,
        travelRef.current.pathAnchor,
        chamber,
        scrollP,
        lateralRef.current,
        use3dRef.current,
      );

      tweenRef.current?.kill();
      const proxy = { ...varsRef.current };

      tweenRef.current = gsap.to(proxy, {
        panX: target.panX,
        lateralPx: target.lateralPx,
        depthPx: target.depthPx,
        scale: target.scale,
        rotate: target.rotate,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          varsRef.current = proxy;
          const rig = refs.rig.current;
          if (rig) applyVars(rig, proxy);
          commitTarget(
            pathname,
            chamber,
            scrollP,
            proxy.lateralPx,
            travelRef.current,
          );
        },
        onComplete: () => {
          panLockRef.current = false;
        },
      });
      if (duration === 0) panLockRef.current = false;
    },
    [refs.rig, commitTarget],
  );

  /** Fly from exact current camera position → destination (no intermediate stops) */
  const travelDirectTo = useCallback(
    (pathname: string, targetIndex: number, chamber: number, scrollP: number) => {
      if (
        travelRef.current.travelT >= 1 &&
        travelRef.current.pathAnchor === targetIndex
      ) {
        commitTarget(
          pathname,
          chamber,
          scrollP,
          lateralRef.current,
          idleTravel(targetIndex),
        );
        return;
      }

      const reduced = lowPowerRef.current;
      const flightStart = worldSnapshotFromTarget(verseTargetRef.current);
      const flightEnd = settledSnapshot(
        pathname,
        targetIndex,
        chamber,
        scrollP,
        lateralRef.current,
      );
      const dur = flightDuration(flightStart, flightEnd, reduced);

      pathTweenRef.current?.kill();
      const flightGen = ++flightGenRef.current;
      const proxy = { travelT: 0 };
      const viewAnchor = travelRef.current.pathAnchor;

      const leg: TravelState = {
        pathAnchor: targetIndex,
        viewAnchor,
        travelT: 0,
        flightStart,
        flightEnd,
      };

      pathnameRef.current = pathname;
      panLockRef.current = true;
      document.documentElement.dataset.verseFlying = "";
      commitTarget(pathname, chamber, scrollP, lateralRef.current, leg);

      pathTweenRef.current = gsap.to(proxy, {
        travelT: 1,
        duration: dur,
        ease: "power2.inOut",
        onUpdate: () => {
          commitTarget(pathname, chamber, scrollP, lateralRef.current, {
            ...leg,
            travelT: proxy.travelT,
          });
        },
        onComplete: () => {
          if (flightGen !== flightGenRef.current) return;
          const done = idleTravel(targetIndex);
          travelRef.current = done;
          commitTarget(pathname, chamber, scrollP, lateralRef.current, done);
          const v = varsFromState(
            pathname,
            targetIndex,
            chamber,
            scrollP,
            lateralRef.current,
            use3dRef.current,
          );
          varsRef.current = v;
          const rig = refs.rig.current;
          if (rig) applyVars(rig, v);
          panLockRef.current = false;
          delete document.documentElement.dataset.verseFlying;
          scrollRef.current = readPageScrollProgress();
          pushVerseState(
            pathname,
            chamber,
            scrollRef.current,
            lateralRef.current,
          );
          refreshScrollMotion();
        },
      });

      if (dur === 0) {
        if (flightGen !== flightGenRef.current) return;
        const done = idleTravel(targetIndex);
        travelRef.current = done;
        commitTarget(pathname, chamber, scrollP, lateralRef.current, done);
        const v = varsFromState(
          pathname,
          targetIndex,
          chamber,
          scrollP,
          lateralRef.current,
          use3dRef.current,
        );
        varsRef.current = v;
        const rig = refs.rig.current;
        if (rig) applyVars(rig, v);
        panLockRef.current = false;
        delete document.documentElement.dataset.verseFlying;
        scrollRef.current = readPageScrollProgress();
        pushVerseState(pathname, chamber, scrollRef.current, lateralRef.current);
        refreshScrollMotion();
      }
    },
    [commitTarget, refs.rig, pushVerseState],
  );

  const goToState = useCallback(
    (chamber: number, scrollP: number, duration?: number) => {
      chamberRef.current = chamber;
      scrollRef.current = scrollP;
      setPartIndex(chamber);
      syncHud(chamber);
      animateChamberScroll(pathnameRef.current, chamber, scrollP, duration);
    },
    [animateChamberScroll, syncHud],
  );

  useEffect(() => {
    const low = detectLowPower();
    lowPowerRef.current = low;
    setUse3d(!low);
    setVerseQuality(low ? "low" : "full");
    setMounted(true);
  }, []);

  const panHorizontal = useCallback(
    (dir: -1 | 1) => {
      if (panLockRef.current) return;
      const next = chamberRef.current + dir;
      if (next < 0 || next > 2) return;
      panLockRef.current = true;
      goToState(next, scrollRef.current, 0.55);
    },
    [goToState],
  );

  useLayoutEffect(() => {
    const root = refs.root.current;
    const rig = refs.rig.current;
    if (!root || !rig) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    commitTarget(pathnameRef.current, 1, 0, 0, travelRef.current);
    syncHud(1);

    if (reduced) return;

    let scrollRaf = 0;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (panLockRef.current) return;
        scrollRef.current = self.progress;
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          pushVerseState(
            pathnameRef.current,
            chamberRef.current,
            scrollRef.current,
            lateralRef.current,
          );
        });
      },
    });

    const onWheel = (e: WheelEvent) => {
      if (panLockRef.current) return;

      const dx = e.deltaX;
      const dy = e.deltaY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      // Horizontal scroll → smooth camera strafe
      if (absX > absY * 1.15 && absX > 12) {
        e.preventDefault();
        lateralRef.current = Math.max(
          -VERSE_LATERAL_MAX,
          Math.min(
            VERSE_LATERAL_MAX,
            lateralRef.current + dx * LATERAL_WHEEL_GAIN,
          ),
        );
        pushVerseState(
          pathnameRef.current,
          chamberRef.current,
          scrollRef.current,
          lateralRef.current,
        );
        return;
      }

      // Shift + vertical wheel → discrete chamber step
      if (e.shiftKey && absY > absX) {
        e.preventDefault();
        panHorizontal(dy > 0 ? 1 : -1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        panHorizontal(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        panHorizontal(1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      st.kill();
      tweenRef.current?.kill();
      pathTweenRef.current?.kill();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [refs, panHorizontal, syncHud, pushVerseState, commitTarget]);

  useEffect(() => {
    const targetIndex = routeToPathIndex(pathname);
    if (
      pathnameRef.current === pathname &&
      travelRef.current.travelT >= 1 &&
      travelRef.current.pathAnchor === targetIndex
    ) {
      return;
    }

    pathnameRef.current = pathname;
    chamberRef.current = 1;
    scrollRef.current = 0;
    lateralRef.current = 0;
    setPartIndex(1);
    syncHud(1);

    travelDirectTo(pathname, targetIndex, 1, 0);

    return () => {
      flightGenRef.current += 1;
      pathTweenRef.current?.kill();
    };
  }, [pathname, travelDirectTo, syncHud]);

  return {
    zone,
    partIndex,
    canPanLeft,
    canPanRight,
    mounted,
    use3d,
    verseQuality,
    verseTargetRef,
    cinematicTagline,
    panLeft: () => panHorizontal(-1),
    panRight: () => panHorizontal(1),
    currentPart: zone.parts[partIndex],
  };
}
