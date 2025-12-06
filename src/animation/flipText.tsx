"use client";
import { ReactNode } from "react";

export const FlipIcons = ({ children }: { children: ReactNode }) => {
  return (
    <div className="transition-transform duration-300 hover:scale-110">
      {children}
    </div>
  );
};
