"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavList } from "./navlist";
import { NavOrbit } from "./NavOrbit";
import { MenuIcon } from "../svg";
import { ModeToggle } from "./ModeToggle";
import {
  applyNavLayoutDom,
  persistNavLayout,
  readStoredNavLayout,
  type NavLayout,
} from "../lib/navLayout";

function Navbar(props: {
  isOpen: (event: boolean) => void;
  menuOpen?: boolean;
}) {
  const pathname = usePathname();
  const [deckOpen, setDeckOpen] = useState(false);

  const setNavLayout = useCallback((layout: NavLayout) => {
    const open = layout === "deck";
    setDeckOpen(open);
    persistNavLayout(layout);
    applyNavLayoutDom(layout);
  }, []);

  useEffect(() => {
    setNavLayout(readStoredNavLayout());
  }, [setNavLayout]);

  const closeDeck = useCallback(() => setNavLayout("compact"), [setNavLayout]);
  const toggleDeck = useCallback(
    () => setNavLayout(deckOpen ? "compact" : "deck"),
    [deckOpen, setNavLayout],
  );

  useEffect(() => {
    if (!deckOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDeck();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deckOpen, closeDeck]);

  const handleContactClick = () => {
    window.open("https://wa.link/ztm32r", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header
        className={`site-navbar fixed inset-x-0 top-0 z-50${deckOpen ? " site-navbar--orbit" : ""}`}
        role="banner"
        suppressHydrationWarning
      >
        {/* Compact top bar */}
        <div
          className="site-navbar__inner glass-effect pointer-events-auto mx-auto flex w-[calc(100%-1.25rem)] max-w-7xl items-center justify-between gap-2 rounded-xl px-3 py-2 sm:w-[calc(100%-2rem)] sm:px-4 sm:py-2.5 lg:px-6 lg:py-3"
          aria-hidden={deckOpen}
        >
          <button
            type="button"
            onClick={toggleDeck}
            className={`site-navbar__brand site-navbar__brand--beacon flex min-h-11 flex-shrink-0 items-center${deckOpen ? "" : " site-navbar__brand--idle"}`}
            aria-label="Deploy command orbit navigation"
            aria-expanded={deckOpen}
          >
            <span className="font-mono text-lg font-bold tracking-tight gradient-text sm:text-xl">
              MIE
            </span>
          </button>

          <nav
            className="hidden items-center gap-4 lg:flex xl:gap-6"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-3 xl:gap-5" role="list">
              <NavList pathname={pathname} />
            </ul>
            <ModeToggle />
            <button
              type="button"
              onClick={handleContactClick}
              className="btn-secondary touch-target min-w-[100px] flex-shrink-0 text-xs"
              aria-label="Contact via WhatsApp"
            >
              Contact
            </button>
          </nav>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <ModeToggle />
            <button
              type="button"
              onClick={() => props.isOpen(true)}
              className="touch-target rounded-lg border border-muted-300/80 bg-muted-100/90 shadow-[0_2px_10px_rgba(28,25,23,0.06)] transition-all duration-300 hover:bg-muted-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-muted-700 dark:bg-muted-800 dark:hover:bg-muted-700"
              aria-label="Open navigation menu"
              aria-expanded={props.menuOpen ?? false}
              aria-controls="mobile-nav-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <NavOrbit
          pathname={pathname}
          open={deckOpen}
          onToggle={toggleDeck}
          onContact={handleContactClick}
        />
      </header>
    </>
  );
}

export default Navbar;
