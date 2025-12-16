"use client";
import { useEffect, useState } from "react";

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export const XPBar = ({ currentXP, maxXP, level }: XPBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calcPercentage = (currentXP / maxXP) * 100;
    setTimeout(() => {
      setPercentage(calcPercentage);
    }, 300);
  }, [currentXP, maxXP]);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="level-badge animate-bounce-in text-sm sm:text-base">{level}</div>
      <div className="flex-1">
        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{
              width: `${percentage}%`,
              transition: "width 1s ease-out 0.3s",
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] xs:text-xs text-muted-600 dark:text-muted-400 mt-1">
          <span>{currentXP} XP</span>
          <span>{maxXP} XP</span>
        </div>
      </div>
    </div>
  );
};
