"use client";

import { NavWhatsAppIcon } from "../svg/navIcons";
import { OrbitModeSwitch } from "./OrbitModeSwitch";

type OrbitDockProps = {
  onContact: () => void;
};

export function OrbitDock({ onContact }: OrbitDockProps) {
  return (
    <div className="site-nav-orbit__controls">
      <OrbitModeSwitch />

      <button
        type="button"
        className="site-nav-orbit__contact"
        onClick={onContact}
        aria-label="Contact via WhatsApp"
        title="WhatsApp"
      >
        <NavWhatsAppIcon />
      </button>
    </div>
  );
}
