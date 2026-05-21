"use client";

import { useRef, type ReactNode } from "react";
import { VersePaletteProvider } from "@/src/contexts/VersePaletteContext";
import { useTheme } from "@/src/contexts/ThemeContext";
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
  const { resolvedScheme, ready: themeReady } = useTheme();
  const scheme = themeReady ? resolvedScheme : "dark";

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
    <VersePaletteProvider scheme={scheme}>
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
                <div className="verse-space-bg absolute inset-0" />
                <div className="verse-space-glow absolute inset-0" />
              </>
            )}

            <div
              data-depth="0.55"
              className="verse-layer absolute left-[5%] top-[16%] hidden sm:block"
            >
              <div className="verse-hud-panel rounded-lg border px-3 py-2 font-mono text-[10px] backdrop-blur-sm">
                <p ref={hudZoneRef} className="verse-hud-panel__zone">
                  {zone.label}
                </p>
                <p
                  ref={hudPartRef}
                  className="verse-hud-panel__part mt-0.5 font-medium"
                >
                  {currentPart.name}
                </p>
                <p className="verse-hud-panel__tagline mt-0.5 text-[10px]">
                  {cinematicTagline}
                </p>
                <p className="verse-hud-panel__meta mt-0.5 text-[10px]">
                  Chamber {partIndex + 1}/3
                </p>
              </div>
            </div>

            <div className="verse-page-vignette absolute inset-0" />
          </div>
        </div>

        <div
          aria-hidden
          className="verse-content-scrim pointer-events-none fixed inset-0 z-[2]"
        />

        <p
          aria-hidden
          suppressHydrationWarning
          className="verse-chrome-hint pointer-events-none fixed bottom-5 left-1/2 z-[5] hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest sm:block"
        >
          {canvasMountedRef.current ? "JARVIS HUD" : null}
        </p>

        <div className="relative z-10">{children}</div>
      </div>
    </VersePaletteProvider>
  );
}
