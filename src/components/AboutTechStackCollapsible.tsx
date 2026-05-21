"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import {
  ABOUT_STACK_PREVIEW_IDS,
  TECH_STACK_CATEGORIES,
  TECH_STACK_ITEMS,
  getTechStackByCategory,
} from "@/src/data/techStack";
import { VERSE_EASE } from "@/src/config/verseMotion";

const previewItems = TECH_STACK_ITEMS.filter((item) =>
  ABOUT_STACK_PREVIEW_IDS.includes(item.id),
);

function StackTag({ name, preview }: { name: string; preview?: boolean }) {
  return (
    <span
      data-about-tag
      {...(preview ? { "data-about-tag-preview": "" } : {})}
      className="inline-block rounded-md border border-muted-300/80 dark:border-muted-600/60 bg-muted-100/95 dark:bg-muted-900/85 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-700 dark:text-muted-300 opacity-0"
    >
      {name}
    </span>
  );
}

export function AboutTechStackCollapsible() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const total = TECH_STACK_ITEMS.length;
  const hiddenCount = total - previewItems.length;

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tags = panelRef.current.querySelectorAll<HTMLElement>("[data-about-tag-expanded]");
    if (!tags.length) return;

    if (reduced) {
      gsap.set(tags, { opacity: 1, clearProps: "transform" });
      return;
    }

    gsap.fromTo(
      tags,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.012,
        ease: VERSE_EASE.smooth,
        clearProps: "transform",
      },
    );
  }, [open]);

  return (
    <section aria-labelledby="about-stack-heading">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3
          id="about-stack-heading"
          data-about-aside-head
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 opacity-0"
        >
          Tools & stacks
        </h3>
        <span className="font-mono text-[10px] tabular-nums text-muted-400 dark:text-muted-500">
          {total} tools
        </span>
      </div>

      <ul className="mb-3 flex flex-wrap gap-2" aria-label="Core stack highlights">
        {previewItems.map((item) => (
          <li key={item.id}>
            <StackTag name={item.name} preview />
          </li>
        ))}
      </ul>

      <div
        ref={panelRef}
        id={panelId}
        className={`about-stack-panel${open ? " about-stack-panel--open" : ""}`}
        aria-hidden={!open}
        hidden={!open}
      >
        <div className="about-stack-panel__inner space-y-4">
          {TECH_STACK_CATEGORIES.map((category) => {
            const items = getTechStackByCategory(category.id);
            if (items.length === 0) return null;

            return (
              <div key={category.id}>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-400 dark:text-muted-500">
                  {category.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <span
                        data-about-tag-expanded
                        className="inline-block rounded-md border border-muted-300/80 dark:border-muted-600/60 bg-muted-100/95 dark:bg-muted-900/85 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-700 dark:text-muted-300"
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="about-stack-toggle touch-target mt-1 w-full sm:w-auto"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="about-stack-toggle__label font-mono text-[11px] uppercase tracking-wider">
          {open ? "Show less" : `View full stack (+${hiddenCount} more)`}
        </span>
        <span
          className={`about-stack-toggle__chevron${open ? " about-stack-toggle__chevron--open" : ""}`}
          aria-hidden
        />
      </button>
    </section>
  );
}
