"use client";

import { useRef } from "react";
import { useTheme } from "@/src/contexts/ThemeContext";
import {
  TECH_STACK_CATEGORIES,
  getTechStackByCategory,
} from "@/src/data/techStack";
import { TechStackHUD } from "./TechStackHUD";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { useStackHomeReveal } from "../hooks/useStackHomeReveal";

type StackProps = {
  /** Home: dedicated silk timeline (no scroll trigger). */
  variant?: "scroll" | "home";
};

/** Gamify-style quest grid (home + scroll). */
function StackQuestGrid({ variant }: StackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isHome = variant === "home";

  useStackHomeReveal(sectionRef, isHome);

  const scrollRef = useGsapReveal({
    preset: "depthFade",
    stagger: 0.03,
    duration: 0.48,
    ease: "power2.out",
    childSelector: "[data-reveal-item]",
  });

  return (
    <section
      ref={(isHome ? sectionRef : scrollRef) as React.RefObject<HTMLElement>}
      id="skills"
      className={`section-padding scroll-mt-24 text-center${isHome ? " stack-home-reveal" : ""}`}
      aria-labelledby="skills-heading"
    >
      <h2
        {...(isHome ? {} : { "data-reveal-item": "" })}
        id="skills-heading"
        className={`text-2xl sm:text-3xl font-bold gradient-text font-display mb-4 sm:mb-6${isHome ? "" : " opacity-0"}`}
      >
        Tech Stack
      </h2>
      <p
        {...(isHome ? { "data-stack-intro": "" } : { "data-reveal-item": "" })}
        className={`text-sm text-muted-600 dark:text-muted-400 max-w-2xl mx-auto mb-8 sm:mb-10${isHome ? "" : " opacity-0"}`}
      >
        Full-stack delivery — frontend, Node.js backends, data stores, and the
        tooling teams use in production.
      </p>

      <div className="space-y-10 sm:space-y-12 text-left">
        {TECH_STACK_CATEGORIES.map((category) => {
          const items = getTechStackByCategory(category.id);
          if (items.length === 0) return null;

          return (
            <div key={category.id}>
              <h3
                {...(isHome ? { "data-stack-category": "" } : { "data-reveal-item": "" })}
                className={`font-display text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-500 dark:text-muted-400 mb-4 text-center${isHome ? "" : " opacity-0"}`}
              >
                {category.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
                {items.map((stack) => (
                  <article
                    key={stack.id}
                    {...(isHome ? { "data-stack-card": "" } : { "data-reveal-item": "" })}
                    className={`game-card p-2.5 sm:p-4 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300${isHome ? "" : " opacity-0"}`}
                    role="listitem"
                  >
                    <div className="text-primary-600 dark:text-primary-400 mb-2 sm:mb-3 [&>svg]:w-8 [&>svg]:h-10 sm:[&>svg]:w-10 sm:[&>svg]:h-12 mx-auto">
                      {stack.icon()}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-xs sm:text-sm font-semibold text-muted-900 dark:text-muted-50">
                        {stack.name}
                      </h4>
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] xs:text-xs text-muted-500 dark:text-muted-500 font-mono">
                          {stack.xp.toLocaleString()} XP
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const Stack = ({ variant = "scroll" }: StackProps) => {
  const { mode, ready } = useTheme();

  if (ready && mode === "tech") {
    return <TechStackHUD variant={variant} />;
  }

  return <StackQuestGrid variant={variant} />;
};
