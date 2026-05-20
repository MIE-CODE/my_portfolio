"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavList } from "./navlist";
import { MenuIcon } from "../svg";
import { ThemeToggle } from "./ThemeToggle";
import { useGsapMount } from "../hooks/useGsapReveal";

function Navbar(props: {
  isOpen: (event: boolean) => void;
  menuOpen?: boolean;
}) {
  const pathname = usePathname();
  const headerRef = useGsapMount({
    preset: "streamIn",
    duration: 0.7,
    stagger: 0.08,
    childSelector: "[data-nav-item]",
    ease: "power3.out",
  });

  const handleContactClick = () => {
    window.open("https://wa.link/ztm32r", "_blank", "noopener,noreferrer");
  };

  return (
    <header
      ref={headerRef as React.RefObject<HTMLElement>}
      className="site-navbar fixed inset-x-0 top-0 z-50 pointer-events-none"
      role="banner"
    >
      <div className="site-navbar__inner glass-effect pointer-events-auto mx-auto flex w-[calc(100%-1.25rem)] max-w-7xl items-center justify-between gap-2 rounded-xl px-3 py-2 sm:w-[calc(100%-2rem)] sm:px-4 sm:py-2.5 lg:px-6 lg:py-3">
      <Link
        data-nav-item
        href="/"
        className="flex items-center flex-shrink-0 opacity-0 min-h-11"
        aria-label="Home - Menya Israel Portfolio"
      >
        <span className="text-lg sm:text-xl font-bold gradient-text font-mono tracking-tight">
          MIE
        </span>
      </Link>
      <nav
        data-nav-item
        className="hidden lg:flex items-center gap-4 xl:gap-6 opacity-0"
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-3 xl:gap-5" role="list">
          <NavList pathname={pathname} />
        </ul>
        <ThemeToggle />
        <button
          data-nav-item
          onClick={handleContactClick}
          className="btn-secondary touch-target min-w-[100px] text-xs flex-shrink-0 opacity-0"
          aria-label="Contact via WhatsApp"
        >
          Contact
        </button>
      </nav>

      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => props.isOpen(true)}
          className="touch-target rounded-lg bg-muted-100/90 dark:bg-muted-800 border border-muted-300/80 dark:border-muted-700 transition-all duration-300 hover:bg-muted-50 dark:hover:bg-muted-700 shadow-[0_2px_10px_rgba(28,25,23,0.06)] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          aria-label="Open navigation menu"
          aria-expanded={props.menuOpen ?? false}
          aria-controls="mobile-nav-menu"
        >
          <MenuIcon />
        </button>
      </div>
      </div>
    </header>
  );
}

export default Navbar;
