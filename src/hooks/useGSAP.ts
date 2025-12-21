"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  animationFn: (ctx: gsap.Context) => void | gsap.core.Tween | gsap.core.Timeline,
  dependencies: unknown[] = []
) => {
  const context = useRef<gsap.Context | null>(null);
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current) return;

    context.current = gsap.context(() => {
      animationFn(context.current!);
    }, scope.current);

    return () => {
      context.current?.revert();
    };
  }, [animationFn, dependencies]);

  return scope;
};


