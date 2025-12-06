"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavList } from "./navlist";
import { MenuIcon } from "../svg";
import { ThemeToggle } from "./ThemeToggle";

function Navbar(props: { isOpen: (event: boolean) => void }) {
  const pathname = usePathname();
  const handleContactClick = () => {
    window.open("https://wa.link/ztm32r", "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className="sticky top-4 z-50 glass-effect rounded-xl px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between max-w-7xl mx-auto w-[calc(100%-2rem)] animate-slide-down"
      role="banner"
    >
      <Link href="/" className="flex items-center animate-fade-in" aria-label="Home - Menya Israel Portfolio">
        <span className="text-xl font-bold gradient-text font-mono tracking-tight">
          MIE
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
        <ul className="flex items-center gap-6" role="list">
          <NavList pathname={pathname} />
        </ul>
        <ThemeToggle />
        <button
          onClick={handleContactClick}
          className="btn-secondary min-w-[120px] h-9 text-xs"
          aria-label="Contact via WhatsApp"
        >
          Contact
        </button>
      </nav>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => props.isOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted-200 dark:bg-muted-800 border border-muted-300 dark:border-muted-700 transition-all duration-300 hover:bg-muted-300 dark:hover:bg-muted-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
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
