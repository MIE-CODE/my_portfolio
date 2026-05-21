/** Splash markup — rendered in root layout (first paint) and controlled by AppLoadProvider. */
export function AppSplashPanels() {
  return (
    <>
      <div className="app-splash__panel app-splash__panel--tech" data-splash-panel="tech">
        <span className="app-splash__scan" aria-hidden />
        <div className="app-splash__frame" aria-hidden>
          <span className="app-splash__corner app-splash__corner--tl" />
          <span className="app-splash__corner app-splash__corner--tr" />
          <span className="app-splash__corner app-splash__corner--bl" />
          <span className="app-splash__corner app-splash__corner--br" />
        </div>
        <div className="app-splash__inner pointer-events-none">
          <div className="app-splash__mark" aria-hidden>
            <span className="app-splash__mark-line" />
            <span className="app-splash__mark-line app-splash__mark-line--delay" />
          </div>
          <p className="app-splash__tag type-label hud-label font-mono">BOOT_SEQUENCE</p>
          <p className="app-splash__title font-mono">M_I_E_CODE</p>
          <div className="app-splash__loader app-splash__loader--hud" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="app-splash__loader-seg"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="app-splash__panel app-splash__panel--gamify" data-splash-panel="gamify">
        <div className="app-splash__inner pointer-events-none">
          <span className="app-splash__orb" aria-hidden />
          <p className="app-splash__title font-display gradient-text">MIE</p>
          <div className="app-splash__loader app-splash__loader--quest" aria-hidden>
            {Array.from({ length: 3 }, (_, i) => (
              <span
                key={i}
                className="app-splash__loader-dot"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <div className="app-splash__xp" aria-hidden>
            <span className="app-splash__xp-fill" />
          </div>
        </div>
      </div>
    </>
  );
}

export function AppSplashBoot() {
  return (
    <div
      id="app-splash-boot"
      className="app-splash pointer-events-none fixed inset-0 z-[9999] isolate min-h-dvh w-full overflow-hidden"
      style={{ backgroundColor: "rgb(var(--surface-bg, 15 10 26))" }}
      suppressHydrationWarning
      role="progressbar"
      aria-valuetext="Loading"
      aria-busy="true"
    >
      <AppSplashPanels />
    </div>
  );
}
