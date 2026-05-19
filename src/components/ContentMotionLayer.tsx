"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import {
  refreshScrollMotion,
  useContentParallax,
} from "@/src/hooks/useContentParallax";

/** Wraps page content: route-aware parallax + ScrollTrigger refresh */
export function ContentMotionLayer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useContentParallax(ref, [pathname], {
    disabled: pathname === "/",
  });

  useEffect(() => {
    refreshScrollMotion();
    const t = window.setTimeout(refreshScrollMotion, 400);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div ref={ref} className="verse-content-layer relative">
      {children}
    </div>
  );
}
