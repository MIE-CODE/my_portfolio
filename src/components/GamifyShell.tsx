"use client";

import type { ReactNode } from "react";

/** Flat layout shell for gamify mode — no ParallaxVerse / WebGL. */
export function GamifyShell({ children }: { children: ReactNode }) {
  return (
    <div className="gamify-shell relative isolate min-h-dvh w-full">
      {children}
    </div>
  );
}
