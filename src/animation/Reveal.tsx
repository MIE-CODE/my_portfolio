"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}
    >
      {children}
    </div>
  );
};
