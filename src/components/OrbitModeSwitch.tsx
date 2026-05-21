"use client";

import { useTheme } from "@/src/contexts/ThemeContext";
import { NavPlayModeIcon, NavTechModeIcon } from "../svg/navIcons";

export function OrbitModeSwitch() {
  const { mode, setMode } = useTheme();
  const isTech = mode === "tech";

  return (
    <div className="orbit-mode" role="group" aria-label="Interface mode">
      <div className="orbit-mode__track">
        <span
          className={`orbit-mode__glide${isTech ? " orbit-mode__glide--tech" : " orbit-mode__glide--play"}`}
          aria-hidden
        />
        <button
          type="button"
          className={`orbit-mode__seg${isTech ? " orbit-mode__seg--on" : ""}`}
          onClick={() => setMode("tech")}
          aria-pressed={isTech}
          aria-label="Tech mode — HUD interface"
          title="Tech / HUD"
        >
          <NavTechModeIcon className="orbit-mode__icon" />
          <span className="orbit-mode__label font-mono">Tech</span>
        </button>
        <button
          type="button"
          className={`orbit-mode__seg${!isTech ? " orbit-mode__seg--on" : ""}`}
          onClick={() => setMode("gamify")}
          aria-pressed={!isTech}
          aria-label="Play mode — quest interface"
          title="Gamify / Play"
        >
          <NavPlayModeIcon className="orbit-mode__icon" />
          <span className="orbit-mode__label font-mono">Play</span>
        </button>
      </div>
    </div>
  );
}
