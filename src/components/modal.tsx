"use client";
import React, { useEffect } from "react";
import { CloseIcon } from "../svg";
import { NavList } from "./navlist";

export const Modal = (props: {
  isOpen: (event: boolean) => void;
  modal: boolean;
}) => {
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

  if (!props.modal) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-muted-900/80 dark:bg-muted-950/80 backdrop-blur-sm flex items-start justify-end animate-fade-in"
      onClick={() => props.isOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav
        onClick={(e) => e.stopPropagation()}
        className="h-full w-[70%] bg-white dark:bg-muted-800/95 backdrop-blur-xl border-l border-muted-200 dark:border-muted-700 flex flex-col animate-slide-down"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => props.isOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-muted-100 dark:bg-muted-800 border border-muted-300 dark:border-muted-700 hover:bg-muted-200 dark:hover:bg-muted-700 transition-all duration-300"
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
