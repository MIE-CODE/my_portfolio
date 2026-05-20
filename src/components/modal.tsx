"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { lockScroll, unlockScroll } from "@/src/lib/scrollLock";
import { CloseIcon } from "../svg";
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
    if (!modal) return;
    lockScroll();
    closeBtnRef.current?.focus();
    return () => unlockScroll();
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
      className="fixed inset-0 z-50 bg-muted-900/50 dark:bg-muted-950/60 backdrop-blur-sm flex items-stretch justify-end opacity-0"
      onClick={() => isOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav
        id="mobile-nav-menu"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="mobile-nav-panel h-full w-[min(17.5rem,78vw)] sm:w-72 sm:max-w-xs shrink-0 bg-muted-100 dark:bg-muted-800/95 backdrop-blur-xl border-l border-muted-200 dark:border-muted-700 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-[-8px_0_32px_rgba(28,25,23,0.12)] dark:shadow-[-8px_0_32px_rgba(0,0,0,0.35)]"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-3 sm:p-5">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => isOpen(false)}
            className="touch-target rounded-full bg-muted-100/90 dark:bg-muted-800 border border-muted-300/80 dark:border-muted-700 hover:bg-muted-50 dark:hover:bg-muted-700 shadow-[0_2px_10px_rgba(28,25,23,0.06)] transition-all duration-300"
            aria-label="Close navigation menu"
          >
            <div className="text-muted-700 dark:text-muted-300 [&>svg]:w-6 [&>svg]:h-6">
              <CloseIcon />
            </div>
          </button>
        </div>
        <ul
          className="flex flex-col gap-0.5 px-4 sm:px-6 py-2 flex-1 overflow-y-auto"
          role="list"
        >
          <NavList isOpen={isOpen} />
        </ul>
      </nav>
    </div>
  );
};
