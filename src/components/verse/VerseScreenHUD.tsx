"use client";

import { useEffect, useState } from "react";
import { VERSE_TELEMETRY } from "@/src/config/verseTechSnippets";

type VerseScreenHUDProps = {
  tagline: string;
  zoneLabel: string;
  active: boolean;
};

const CODE_STREAM = `async function boot() {
  const gl = canvas.getContext('webgl2');
  const scene = new Scene();
  scene.fog = new Fog('#020408', 45, 320);
  renderer.setAnimationLoop(render);
}
// hydrate · route · gsap flight`;

export function VerseScreenHUD({ tagline, zoneLabel, active }: VerseScreenHUDProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2400);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active) return null;

  const telemetry = VERSE_TELEMETRY[tick % VERSE_TELEMETRY.length];

  return (
    <div className="verse-screen-hud pointer-events-none fixed inset-0 z-[2] hidden sm:block" aria-hidden>
      <div className="verse-hud-corner verse-hud-corner--tl" />
      <div className="verse-hud-corner verse-hud-corner--tr" />
      <div className="verse-hud-corner verse-hud-corner--bl" />
      <div className="verse-hud-corner verse-hud-corner--br" />

      <div className="verse-hud-scan" />

      <div className="verse-hud-grid" />

      <div className="verse-hud-rail verse-hud-rail--left">
        {["NEXT", "R3F", "TS", "EDGE", "MDX"].map((label, i) => (
          <span key={label} style={{ opacity: 0.25 + (i % 3) * 0.15 }}>
            {label}
          </span>
        ))}
      </div>

      <div className="verse-hud-rail verse-hud-rail--right">
        <span className="verse-hud-telemetry">{telemetry}</span>
        <span className="verse-hud-telemetry verse-hud-telemetry--dim">{zoneLabel}</span>
      </div>

      <div className="verse-hud-status">
        <span className="verse-hud-pulse" />
        <span>STARK·OS // {tagline}</span>
      </div>

      <div className="verse-hud-codecol">
        <pre>{CODE_STREAM}</pre>
      </div>
    </div>
  );
}
