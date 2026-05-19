"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavList } from "./navlist";
import { MenuIcon } from "../svg";
import { ThemeToggle } from "./ThemeToggle";
import { useGsapMount } from "../hooks/useGsapReveal";

function Navbar(props: { isOpen: (event: boolean) => void }) {
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
      className="sticky top-4 z-50 glass-effect rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2.5 lg:px-6 lg:py-3 flex items-center justify-between max-w-7xl mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)]"
      role="banner"
      data-parallax-depth="0.05"
    >
      <Link
        data-nav-item
        href="/"
        className="flex items-center flex-shrink-0 opacity-0"
        aria-label="Home - Menya Israel Portfolio"
      >
        <span className="text-lg sm:text-xl font-bold gradient-text font-mono tracking-tight">
          MIE
        </span>
      </Link>
      <nav data-nav-item className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 opacity-0" aria-label="Main navigation">
        <ul className="flex items-center gap-3 lg:gap-4 xl:gap-6" role="list">
          <NavList pathname={pathname} />
        </ul>
        <ThemeToggle />
        <button
          data-nav-item
          onClick={handleContactClick}
          className="btn-secondary min-w-[90px] md:min-w-[100px] lg:min-w-[120px] h-8 md:h-9 text-[10px] md:text-xs flex-shrink-0 opacity-0"
          aria-label="Contact via WhatsApp"
        >
          Contact
        </button>
      </nav>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => props.isOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/90 dark:bg-muted-800 border border-muted-200/95 dark:border-muted-700 transition-all duration-300 hover:bg-white dark:hover:bg-muted-700 shadow-[0_2px_10px_rgba(28,25,23,0.06)] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
