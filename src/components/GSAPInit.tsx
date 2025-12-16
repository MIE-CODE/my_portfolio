"use client";
import { useEffect } from "react";

export const GSAPInit = () => {
  useEffect(() => {
    // Initialize smooth scroll
    if (typeof window !== "undefined") {
      // Enable smooth scrolling
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return null;
};

