"use client";
import { useGsapReveal } from "../hooks/useGsapReveal";

const achievements = [
  { id: 1, name: "Product shipper", icon: "💻", unlocked: true },
  { id: 2, name: "React & Vue", icon: "⚛️", unlocked: true },
  { id: 3, name: "CTO track", icon: "🎯", unlocked: true },
  { id: 4, name: "Founder", icon: "🚀", unlocked: true },
  { id: 5, name: "Performance", icon: "⚡", unlocked: true },
  { id: 6, name: "Web3 curious", icon: "🌟", unlocked: true },
];

type AchievementsProps = {
  variant?: "scroll" | "hero";
};

export const Achievements = ({ variant = "scroll" }: AchievementsProps) => {
  const scrollRef = useGsapReveal({
    preset: "dataPulse",
    stagger: 0.08,
    duration: 0.55,
    ease: "power3.out",
  });

  return (
    <div
      ref={variant === "scroll" ? (scrollRef as React.RefObject<HTMLDivElement>) : undefined}
      className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
    >
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          {...(variant === "hero" ? { "data-hero-badge": "" } : { "data-reveal-item": "" })}
          className={`achievement-badge verse-hover-hud px-2 sm:px-3 py-1 sm:py-1.5 ${
            variant === "hero" ? "opacity-0" : "opacity-0"
          } ${
            achievement.unlocked
              ? "text-accent-700 dark:text-accent-300 border-accent-300 dark:border-accent-700"
              : "grayscale opacity-40"
          }`}
        >
          <span className="text-base sm:text-lg">{achievement.icon}</span>
          <span className="text-[10px] xs:text-xs">{achievement.name}</span>
        </div>
      ))}
    </div>
  );
};
