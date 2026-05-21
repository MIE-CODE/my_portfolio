"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { OrbitDock } from "./OrbitDock";
import { NAV_ORBIT_NODES, ORBIT_NODE_COUNT } from "../data/navOrbit";
import { NavRouteIcon } from "../svg/navIcons";

type NavOrbitProps = {
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onContact: () => void;
};

export function NavOrbit({
  pathname,
  open,
  onToggle,
  onContact,
}: NavOrbitProps) {
  const activeNode =
    NAV_ORBIT_NODES.find((n) => n.href === pathname) ?? NAV_ORBIT_NODES[0];

  return (
    <aside
      className="site-nav-orbit"
      aria-hidden={!open}
      aria-label="Command orbit navigation"
    >
      <div className="site-nav-orbit__field" aria-hidden>
        <span className="site-nav-orbit__ring site-nav-orbit__ring--outer" />
        <span className="site-nav-orbit__ring site-nav-orbit__ring--mid" />
      </div>

      <OrbitDock onContact={onContact} />

      <nav className="site-nav-orbit__nav" aria-label="Orbital routes">
        <ul
          className="site-nav-orbit__nodes"
          role="list"
          style={{ "--orbit-count": ORBIT_NODE_COUNT } as CSSProperties}
        >
          {NAV_ORBIT_NODES.map((node, index) => {
            const isActive = pathname === node.href;
            return (
              <li
                key={node.href}
                className="site-nav-orbit__item"
                style={{ "--node-i": index } as CSSProperties}
              >
                <Link
                  href={node.href}
                  className={`site-nav-orbit__node${isActive ? " site-nav-orbit__node--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={node.label}
                  title={node.label}
                >
                  <span className="site-nav-orbit__node-chip" aria-hidden>
                    <NavRouteIcon
                      id={node.icon}
                      className="site-nav-orbit__node-icon"
                    />
                  </span>
                  <span className="site-nav-orbit__node-label">
                    {node.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="site-nav-orbit__core rounded-full"
        onClick={onToggle}
        aria-label="Switch back to top navigation bar"
        aria-expanded={open}
      >
        <span className="site-nav-orbit__core-text font-mono font-bold gradient-text">
          MIE
        </span>
      </button>

      <p className="site-nav-orbit__telemetry hud-label" aria-live="polite">
        <span className="site-nav-orbit__telemetry-route font-mono">
          {activeNode.label}
        </span>
      </p>
    </aside>
  );
}
