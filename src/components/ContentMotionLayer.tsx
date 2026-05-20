"use client";

import { useRef, type ReactNode } from "react";

/** Page content wrapper — no scroll-linked motion (native scroll only). */
export function ContentMotionLayer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="verse-content-layer relative overflow-x-clip">
      {children}
    </div>
  );
}
