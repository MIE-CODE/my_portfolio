"use client";
import React from "react";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="scroll-smooth">{children}</div>;
};
