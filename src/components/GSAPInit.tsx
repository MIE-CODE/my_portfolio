"use client";
import { useEffect } from "react";

export const GSAPInit = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return null;
};

