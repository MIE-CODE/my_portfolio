"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";
import { lockScroll, unlockScroll } from "@/src/lib/scrollLock";
import { CloseIcon } from "../svg";
import { ModeToggle } from "./ModeToggle";
import { NavList } from "./navlist";

export const Modal = ({
  isOpen,
  modal,
}: {
  isOpen: (event: boolean) => void;
  modal: boolean;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modal) {
      ensureDocumentScrollable();
      return;
    }
    lockScroll();
    closeBtnRef.current?.focus();
    return () => {
      unlockScroll();
      ensureDocumentScrollable();
    };
  }, [modal]);

  useEffect(() => {
    if (!modal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") isOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal, isOpen]);

  useEffect(() => {
    if (!modal || !overlayRef.current || !panelRef.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set([overlayRef.current, panelRef.current], { opacity: 1, x: 0 });
      return;
    }

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { x: "100%" },
      { x: 0, duration: 0.35, ease: "power3.out" },
    );
  }, [modal]);

  if (!modal) return null;

  return (
    <div
      ref={overlayRef}
      className="mobile-nav-overlay fixed inset-0 z-50 flex items-stretch justify-end opacity-0"
      onClick={() => isOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav
        id="mobile-nav-menu"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="mobile-nav-panel glass-effect flex h-full max-h-dvh w-[min(18rem,88vw)] shrink-0 flex-col overflow-hidden border-l sm:w-72"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-panel__toolbar flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-5 sm:py-4">
          <span className="mobile-nav-panel__title text-sm font-semibold">
            Menu
          </span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => isOpen(false)}
              className="mobile-nav-close touch-target"
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <ul
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
          role="list"
        >
          <NavList isOpen={isOpen} />
        </ul>
      </nav>
    </div>
  );
};
