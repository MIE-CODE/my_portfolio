"use client";

import { useRef } from "react";
import {
  TECH_STACK_CATEGORIES,
  TECH_STACK_BAY_CODES,
  TECH_STACK_ITEMS,
  formatStackChannel,
  getStackModuleTier,
  getTechStackByCategory,
} from "@/src/data/techStack";
import { useStackHomeReveal } from "../hooks/useStackHomeReveal";

type TechStackHUDProps = {
  variant?: "scroll" | "home";
};

export function TechStackHUD({ variant = "home" }: TechStackHUDProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isHome = variant === "home";
  const moduleCount = TECH_STACK_ITEMS.length;

  useStackHomeReveal(sectionRef, isHome);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`stack-hud section-padding scroll-mt-24${isHome ? " stack-home-reveal" : ""}`}
      aria-labelledby="skills-heading"
    >
      <div className="stack-hud__registry mx-auto max-w-5xl">
        <header
          className={`stack-hud__header panel-surface verse-scan-border${isHome ? "" : " opacity-0"}`}
          {...(isHome ? {} : { "data-reveal-item": "" })}
        >
          <span className="stack-hud__corner stack-hud__corner--tl" aria-hidden />
          <span className="stack-hud__corner stack-hud__corner--tr" aria-hidden />
          <span className="stack-hud__corner stack-hud__corner--bl" aria-hidden />
          <span className="stack-hud__corner stack-hud__corner--br" aria-hidden />

          <div className="stack-hud__header-inner">
            <div>
              <p className="stack-hud__kicker type-label hud-label font-mono">
                Systems registry
              </p>
              <h2
                id="skills-heading"
                {...(isHome ? {} : { "data-reveal-item": "" })}
                className="stack-hud__title font-mono"
              >
                STACK_MODULES
              </h2>
              <p
                {...(isHome ? { "data-stack-intro": "" } : { "data-reveal-item": "" })}
                className={`stack-hud__intro mt-2 text-sm leading-relaxed text-muted-600 dark:text-muted-400 max-w-2xl${isHome ? "" : " opacity-0"}`}
              >
                Production-grade tooling across frontend, Node backends, data
                layers, and platform ops — mapped by deployment frequency and
                depth.
              </p>
            </div>
            <div className="stack-hud__status" aria-label="Registry online">
              <span className="stack-hud__pulse" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-600 dark:text-muted-300">
                {moduleCount} modules
              </span>
              <span className="stack-hud__status-tag font-mono">SYNC_OK</span>
            </div>
          </div>
        </header>

        <div className="stack-hud__bays space-y-5 sm:space-y-6">
          {TECH_STACK_CATEGORIES.map((category, bayIndex) => {
            const items = getTechStackByCategory(category.id);
            if (items.length === 0) return null;

            const bayCode = TECH_STACK_BAY_CODES[category.id];
            const bayNum = String(bayIndex + 1).padStart(2, "0");

            return (
              <article
                key={category.id}
                className={`stack-hud__bay panel-surface${isHome ? "" : " opacity-0"}`}
                {...(isHome ? { "data-stack-category": "" } : { "data-reveal-item": "" })}
              >
                <div className="stack-hud__bay-head">
                  <div className="stack-hud__bay-id">
                    <span className="stack-hud__bay-code font-mono">
                      {bayCode}-{bayNum}
                    </span>
                    <h3 className="stack-hud__bay-label font-mono">
                      {category.label}
                    </h3>
                  </div>
                  <span className="stack-hud__bay-count font-mono tabular-nums">
                    {items.length} units
                  </span>
                </div>

                <ul
                  className="stack-hud__modules"
                  role="list"
                  aria-label={category.label}
                >
                  {items.map((stack, modIndex) => {
                    const { tier, label, pips } = getStackModuleTier(stack.xp);
                    const channel = formatStackChannel(modIndex);
                    return (
                      <li key={stack.id} role="listitem">
                        <div
                          {...(isHome
                            ? { "data-stack-card": "" }
                            : { "data-reveal-item": "" })}
                          className={`stack-hud__module stack-hud__module--${tier}${isHome ? "" : " opacity-0"}`}
                        >
                          <div
                            className="stack-hud__icon-plate"
                            aria-hidden
                          >
                            <span className="stack-hud__icon">
                              {stack.icon()}
                            </span>
                          </div>
                          <div className="stack-hud__module-body min-w-0">
                            <div className="stack-hud__module-row">
                              <span className="stack-hud__module-name font-mono">
                                {stack.name}
                              </span>
                              <span
                                className={`stack-hud__tier stack-hud__tier--${tier} font-mono`}
                              >
                                {label}
                              </span>
                            </div>
                            <div className="stack-hud__module-meta">
                              <span className="stack-hud__channel font-mono">
                                {channel}
                              </span>
                              <span
                                className="stack-hud__pips"
                                aria-label={`${stack.name} signal ${label}`}
                              >
                                {Array.from({ length: 4 }, (_, i) => (
                                  <span
                                    key={i}
                                    className={`stack-hud__pip${i < pips ? " stack-hud__pip--lit" : ""}`}
                                    aria-hidden
                                  />
                                ))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
