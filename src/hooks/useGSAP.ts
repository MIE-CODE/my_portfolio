"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  animationFn: (
    ctx: gsap.Context,
  ) => void | gsap.core.Tween | gsap.core.Timeline,
  dependencies: unknown[] = [],
) => {
  const scope = useRef<HTMLElement>(null);
  const animationRef = useRef(animationFn);
  animationRef.current = animationFn;

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context((context) => {
      animationRef.current(context);
    }, scope.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scope;
};
