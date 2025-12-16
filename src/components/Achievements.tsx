"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const achievements = [
  { id: 1, name: "Code Master", icon: "💻", unlocked: true },
  { id: 2, name: "React Wizard", icon: "⚛️", unlocked: true },
  { id: 3, name: "Full Stack Hero", icon: "🚀", unlocked: true },
  { id: 4, name: "Bug Slayer", icon: "🐛", unlocked: true },
  { id: 5, name: "Performance Guru", icon: "⚡", unlocked: false },
  { id: 6, name: "Open Source", icon: "🌟", unlocked: false },
];

export const Achievements = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {achievements.map((achievement, index) => (
        <div
          key={achievement.id}
          className={`achievement-badge px-2 sm:px-3 py-1 sm:py-1.5 ${
            achievement.unlocked
              ? "text-accent-700 dark:text-accent-300 border-accent-300 dark:border-accent-700"
              : "opacity-40 grayscale"
          } ${
            isVisible
              ? `animate-fade-in-up opacity-100`
              : "opacity-0"
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <span className="text-base sm:text-lg">{achievement.icon}</span>
          <span className="text-[10px] xs:text-xs">{achievement.name}</span>
        </div>
      ))}
    </div>
  );
};
