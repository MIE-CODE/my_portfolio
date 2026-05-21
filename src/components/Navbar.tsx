"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavList } from "./navlist";
import { NavOrbit } from "./NavOrbit";
import { MenuIcon } from "../svg";
import { ModeToggle } from "./ModeToggle";
import { useIsMobileNav } from "@/src/hooks/useIsMobileNav";
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
  const isMobileNav = useIsMobileNav();
  const [deckOpen, setDeckOpen] = useState(false);

  const setNavLayout = useCallback((layout: NavLayout) => {
    const open = layout === "deck";
    setDeckOpen(open);
    persistNavLayout(layout);
    applyNavLayoutDom(layout);
  }, []);

  const closeDeck = useCallback(() => setNavLayout("compact"), [setNavLayout]);
  const toggleDeck = useCallback(
    () => setNavLayout(deckOpen ? "compact" : "deck"),
    [deckOpen, setNavLayout],
  );

  useEffect(() => {
    if (isMobileNav) {
      closeDeck();
      return;
    }
    setNavLayout(readStoredNavLayout());
  }, [isMobileNav, setNavLayout, closeDeck]);

  useEffect(() => {
    if (!deckOpen || isMobileNav) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDeck();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deckOpen, closeDeck, isMobileNav]);

  const handleContactClick = () => {
    window.open("https://wa.link/ztm32r", "_blank", "noopener,noreferrer");
  };

  const handleBrandClick = () => {
    if (isMobileNav) {
      props.isOpen(true);
      return;
    }
    toggleDeck();
  };

  return (
    <>
      <header
        className={`site-navbar fixed inset-x-0 top-0 z-50${deckOpen && !isMobileNav ? " site-navbar--orbit" : ""}`}
        role="banner"
        suppressHydrationWarning
      >
        <div
          className="site-navbar__inner glass-effect pointer-events-auto mx-auto flex w-[calc(100%-1.25rem)] max-w-7xl items-center justify-between gap-2 rounded-xl px-3 py-2 sm:w-[calc(100%-2rem)] sm:px-4 sm:py-2.5 lg:px-6 lg:py-3"
          aria-hidden={deckOpen && !isMobileNav}
        >
          <button
            type="button"
            onClick={handleBrandClick}
            className={`site-navbar__brand site-navbar__brand--beacon flex min-h-11 flex-shrink-0 items-center${deckOpen && !isMobileNav ? "" : " site-navbar__brand--idle"}`}
            aria-label={
              isMobileNav
                ? "Open navigation menu"
                : "Deploy command orbit navigation"
            }
            aria-expanded={isMobileNav ? (props.menuOpen ?? false) : deckOpen}
            aria-controls={isMobileNav ? "mobile-nav-menu" : undefined}
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
              className="mobile-nav-trigger touch-target"
              aria-label="Open navigation menu"
              aria-expanded={props.menuOpen ?? false}
              aria-controls="mobile-nav-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {!isMobileNav ? (
          <NavOrbit
            pathname={pathname}
            open={deckOpen}
            onToggle={toggleDeck}
            onContact={handleContactClick}
          />
        ) : null}
      </header>
    </>
  );
}

export default Navbar;
