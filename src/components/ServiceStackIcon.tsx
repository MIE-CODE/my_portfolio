"use client";

import type { ReactNode } from "react";

type ServiceStackIconProps = {
  /** Icon component (returns SVG). */
  icon: () => ReactNode;
  label: string;
};

/** Normalized stack icon tile for service cards — mode-aware HUD / quest styling. */
export function ServiceStackIcon({ icon: Icon, label }: ServiceStackIconProps) {
  return (
    <div
      data-service-icon
      data-service-part
      className="service-icon"
      role="img"
      aria-label={label}
    >
      <div className="service-icon__glow" aria-hidden />
      <div className="service-icon__plate">
        <span className="service-icon__graphic">
          <Icon />
        </span>
      </div>
    </div>
  );
}
