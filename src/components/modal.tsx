"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CloseIcon } from "../svg";
import { NavList } from "./navlist";

export const Modal = (props: {
  isOpen: (event: boolean) => void;
  modal: boolean;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (props.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.modal]);

  useEffect(() => {
    if (!props.modal || !overlayRef.current || !panelRef.current) return;

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
  }, [props.modal]);

  if (!props.modal) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-muted-900/80 dark:bg-muted-950/80 backdrop-blur-sm flex items-start justify-end opacity-0"
      onClick={() => props.isOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-[70%] bg-white dark:bg-muted-800/95 backdrop-blur-xl border-l border-muted-200 dark:border-muted-700 flex flex-col"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => props.isOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/90 dark:bg-muted-800 border border-muted-200/95 dark:border-muted-700 hover:bg-white dark:hover:bg-muted-700 shadow-[0_2px_10px_rgba(28,25,23,0.06)] transition-all duration-300"
            aria-label="Close navigation menu"
          >
            <div className="text-muted-700 dark:text-muted-300 [&>svg]:w-6 [&>svg]:h-6">
              <CloseIcon />
            </div>
          </button>
        </div>
        <ul className="flex flex-col gap-6 px-8 py-4" role="list">
          <NavList isOpen={props.isOpen} />
        </ul>
      </nav>
    </div>
  );
};
