"use client";
import { useEffect, useRef, RefObject } from "react";
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
  }, [animationFn,dependencies]);

  return scope;
};

export const useParallax = (
  elementRef: RefObject<HTMLElement>,
  speed: number = 0.5,
  trigger?: string
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: trigger || elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [elementRef, speed, trigger]);
};

export const useFadeInUp = (
  elementRef: RefObject<HTMLElement>,
  delay: number = 0,
  duration: number = 1
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [elementRef, delay, duration]);
};

export const useStaggerAnimation = (
  elements: RefObject<HTMLElement>[],
  stagger: number = 0.1
) => {
  useEffect(() => {
    const validElements = elements
      .map((ref) => ref.current)
      .filter((el) => el !== null) as HTMLElement[];

    if (validElements.length === 0) return;

    gsap.fromTo(
      validElements,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: validElements[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [elements, stagger]);
};

