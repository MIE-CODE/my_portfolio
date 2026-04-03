"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const stats = [
  { label: "Portfolio products", value: "8+", icon: "🎯" },
  { label: "Years experience", value: "5+", icon: "⏱️" },
  { label: "Stacks", value: "Next & Nuxt", icon: "🛠️" },
  { label: "Leadership", value: "CTO · Founder", icon: "🎖️" },
];

export const Stats = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`game-card text-center p-3 sm:p-4 ${
            isVisible
              ? `animate-fade-in-up opacity-100`
              : "opacity-0"
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.value}</div>
          <div className="text-[10px] xs:text-xs text-muted-600 dark:text-muted-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
