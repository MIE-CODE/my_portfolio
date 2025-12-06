"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const stats = [
  { label: "Projects", value: "20+", icon: "🎯" },
  { label: "Years Exp", value: "5+", icon: "⏱️" },
  { label: "Technologies", value: "15+", icon: "🛠️" },
  { label: "Happy Clients", value: "10+", icon: "😊" },
];

export const Stats = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`game-card text-center ${
            isVisible
              ? `animate-fade-in-up opacity-100`
              : "opacity-0"
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.value}</div>
          <div className="text-xs text-muted-600 dark:text-muted-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
