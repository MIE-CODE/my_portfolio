"use client";

import { useRef, type ReactNode } from "react";
import { VerseScreenHUD } from "@/src/components/verse/VerseScreenHUD";
import { VerseSpace3D } from "@/src/components/verse/VerseSpace3D";
import { useParallaxVerse } from "@/src/hooks/useParallaxVerse";

type ParallaxVerseProps = {
  children: ReactNode;
};

export function ParallaxVerse({ children }: ParallaxVerseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const hudPartRef = useRef<HTMLParagraphElement>(null);
  const hudZoneRef = useRef<HTMLParagraphElement>(null);
  const canvasMountedRef = useRef(false);

  const {
    zone,
    partIndex,
    mounted,
    use3d,
    verseQuality,
    verseTargetRef,
    currentPart,
    cinematicTagline,
  } = useParallaxVerse({
    root: rootRef,
    rig: rigRef,
    hudPart: hudPartRef,
    hudZone: hudZoneRef,
  });

  if (mounted && use3d) {
    canvasMountedRef.current = true;
  }

  const showCssSpace = !canvasMountedRef.current;

  return (
    <div ref={rootRef} className="parallax-verse relative isolate">
      {canvasMountedRef.current && (
        <>
          <VerseSpace3D
            targetRef={verseTargetRef}
            quality={verseQuality}
          />
          <VerseScreenHUD
            active
            zoneLabel={zone.label}
            tagline={cinematicTagline}
          />
        </>
      )}

      <div
        aria-hidden
        className="verse-chrome-layer pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <div ref={rigRef} className="verse-rig absolute inset-0">
          {showCssSpace && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-[#070a12] via-[#0c1019] to-[#0a0d14]" />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 110% 70% at 50% 20%, rgba(91,130,168,0.28) 0%, transparent 55%)",
                }}
              />
            </>
          )}

          <div
            data-depth="0.55"
            className="verse-layer absolute left-[5%] top-[16%] hidden sm:block"
          >
            <div className="verse-hud-panel rounded-lg border px-3 py-2 font-mono text-[10px] backdrop-blur-sm">
              <p ref={hudZoneRef} className="text-primary-300/90">
                {zone.label}
              </p>
              <p
                ref={hudPartRef}
                className="mt-0.5 font-medium text-white/90"
              >
                {currentPart.name}
              </p>
              <p className="mt-0.5 text-[10px] text-primary-400/80">
                {cinematicTagline}
              </p>
              <p className="mt-0.5 text-white/55">
                Chamber {partIndex + 1}/3
              </p>
            </div>
          </div>

          <div className="verse-page-vignette absolute inset-0" />
        </div>
      </div>

      <div aria-hidden className="verse-content-scrim pointer-events-none fixed inset-0 z-[2]" />

      <p
        aria-hidden
        suppressHydrationWarning
        className="verse-chrome-hint pointer-events-none fixed bottom-5 left-1/2 z-[5] hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest sm:block"
      >
        {canvasMountedRef.current
          ? "scroll ↔ strafe · scroll ↕ depth · JARVIS HUD"
          : "scroll ↔ strafe · scroll ↕ depth"}
      </p>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
