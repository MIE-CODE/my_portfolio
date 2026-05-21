"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";
import { lockScroll, unlockScroll } from "@/src/lib/scrollLock";
import { CloseIcon } from "../svg";
import { NavList } from "./navlist";

const PANEL_OPEN_MS = 0.35;
const PANEL_CLOSE_MS = 0.3;
const OVERLAY_OPEN_MS = 0.25;
const OVERLAY_CLOSE_MS = 0.22;

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
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (modal) setIsRendered(true);
  }, [modal]);

  useEffect(() => {
    if (!isRendered) {
      unlockScroll();
      ensureDocumentScrollable();
      return;
    }
    lockScroll();
    if (modal) closeBtnRef.current?.focus();
    return () => unlockScroll();
  }, [isRendered, modal]);

  useEffect(() => {
    if (!modal || !isRendered) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") isOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal, isRendered, isOpen]);

  useEffect(() => {
    if (!isRendered) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.killTweensOf([overlay, panel]);

    if (modal) {
      if (reduced) {
        gsap.set([overlay, panel], { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: OVERLAY_OPEN_MS, ease: "power2.out" },
      );
      gsap.fromTo(
        panel,
        { x: "100%" },
        { x: 0, duration: PANEL_OPEN_MS, ease: "power3.out" },
      );
      return;
    }

    if (reduced) {
      setIsRendered(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setIsRendered(false),
    });
    tl.to(
      panel,
      { x: "100%", duration: PANEL_CLOSE_MS, ease: "power3.in" },
      0,
    );
    tl.to(
      overlay,
      { opacity: 0, duration: OVERLAY_CLOSE_MS, ease: "power2.in" },
      0,
    );
  }, [modal, isRendered]);

  if (!isRendered) return null;

  return (
    <div
      ref={overlayRef}
      className="mobile-nav-overlay fixed inset-0 z-50 flex items-stretch justify-end"
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
        <div className="mobile-nav-panel__toolbar flex shrink-0 items-center gap-3 border-b">
          <span className="mobile-nav-panel__title min-w-0 flex-1 truncate text-sm font-semibold">
            Menu
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => isOpen(false)}
            className="mobile-nav-close touch-target shrink-0"
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
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
