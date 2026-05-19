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
    canPanLeft,
    canPanRight,
    mounted,
    use3d,
    verseQuality,
    verseTargetRef,
    panLeft,
    panRight,
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
    <div ref={rootRef} className="relative isolate">
      {canvasMountedRef.current && (
        <>
          <VerseSpace3D targetRef={verseTargetRef} quality={verseQuality} />
          <VerseScreenHUD
            active
            zoneLabel={zone.label}
            tagline={cinematicTagline}
          />
        </>
      )}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <div ref={rigRef} className="verse-rig absolute inset-0">
          {showCssSpace && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-muted-50 via-primary-50/25 to-muted-100 dark:from-[#070a12] dark:via-[#0c1019] dark:to-[#0a0d14]" />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 110% 70% at 50% 20%, rgba(91,130,168,0.22) 0%, transparent 55%)",
                }}
              />
            </>
          )}

          <div
            data-depth="0.55"
            className="verse-layer absolute left-[5%] top-[16%] hidden sm:block"
          >
            <div className="verse-hud-panel rounded-lg border px-3 py-2 font-mono text-[10px] backdrop-blur-sm">
              <p
                ref={hudZoneRef}
                className="text-primary-700/80 dark:text-primary-300/80"
              >
                {zone.label}
              </p>
              <p
                ref={hudPartRef}
                className="mt-0.5 font-medium text-muted-800 dark:text-white/85"
              >
                {currentPart.name}
              </p>
              <p className="mt-0.5 text-[10px] text-primary-600/80 dark:text-primary-400/70">
                {cinematicTagline}
              </p>
              <p className="mt-0.5 text-muted-600 dark:text-white/50">
                Chamber {partIndex + 1}/3
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-40 dark:opacity-55"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 35%, rgba(5,8,14,0.8) 100%)",
            }}
          />
        </div>
      </div>

      <div className="fixed left-2 top-1/2 z-[6] hidden -translate-y-1/2 sm:block">
        <button
          type="button"
          onClick={panLeft}
          disabled={!canPanLeft}
          aria-label="Pan verse left"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-300/50 bg-white/75 text-sm text-primary-700 shadow disabled:opacity-25 dark:border-primary-600/40 dark:bg-black/45 dark:text-primary-300"
        >
          ←
        </button>
      </div>
      <div className="fixed right-2 top-1/2 z-[6] hidden -translate-y-1/2 sm:block">
        <button
          type="button"
          onClick={panRight}
          disabled={!canPanRight}
          aria-label="Pan verse right"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-300/50 bg-white/75 text-sm text-primary-700 shadow disabled:opacity-25 dark:border-primary-600/40 dark:bg-black/45 dark:text-primary-300"
        >
          →
        </button>
      </div>

      <p
        aria-hidden
        suppressHydrationWarning
        className="pointer-events-none fixed bottom-5 left-1/2 z-[5] hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-primary-500/70 dark:text-primary-400/60 sm:block"
      >
        {canvasMountedRef.current
          ? "scroll ↔ strafe · scroll ↕ depth · JARVIS HUD"
          : "scroll ↔ strafe · scroll ↕ depth"}
      </p>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
