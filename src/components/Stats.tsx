"use client";
import { useGsapReveal } from "../hooks/useGsapReveal";

const stats = [
  { label: "Portfolio products", value: "8+", icon: "🎯" },
  { label: "Years experience", value: "5+", icon: "⏱️" },
  { label: "Stacks", value: "Next & Nuxt", icon: "🛠️" },
  { label: "Leadership", value: "CTO · Founder", icon: "🎖️" },
];

type StatsProps = {
  /** Hero: cards animated by home hero timeline (no scroll trigger). */
  variant?: "scroll" | "hero";
};

export const Stats = ({ variant = "scroll" }: StatsProps) => {
  const scrollRef = useGsapReveal({
    preset: "dataPulse",
    stagger: 0.12,
    duration: 0.65,
    ease: "expo.out",
  });

  return (
    <div
      ref={variant === "scroll" ? (scrollRef as React.RefObject<HTMLDivElement>) : undefined}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          {...(variant === "hero" ? { "data-hero-stat": "" } : { "data-reveal-item": "" })}
          className="game-card verse-hover-hud verse-scan-border text-center p-3 sm:p-4 opacity-0"
        >
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-muted-600 dark:text-muted-400 leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
