"use client";

import { useTheme } from "@/src/contexts/ThemeContext";

export const ModeToggle = () => {
  const { mode, toggleMode } = useTheme();
  const isTech = mode === "tech";

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="mode-toggle touch-target"
      aria-label={isTech ? "gamify mode" : "Tech mode"}
      title={isTech ? "Gamify mode" : "Tech / JARVIS mode"}
      aria-pressed={isTech}
    >
      <span className="mode-toggle__track" aria-hidden>
        <span
          className={`mode-toggle__thumb${isTech ? " mode-toggle__thumb--tech" : ""}`}
        />
      </span>
      <span className="mode-toggle__labels font-mono">
        <span className={isTech ? "mode-toggle__label--active" : ""}>TECH</span>
        <span className={!isTech ? "mode-toggle__label--active" : ""}>
          PLAY
        </span>
      </span>
    </button>
  );
};
