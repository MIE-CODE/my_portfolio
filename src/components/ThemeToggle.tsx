"use client";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === "system") {
      // Show system icon when in system mode
      return (
        <svg
          className="w-5 h-5 text-muted-700 dark:text-muted-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    return resolvedTheme === "dark" ? (
      <svg
        className="w-5 h-5 text-muted-700 dark:text-muted-300"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-muted-700 dark:text-muted-300"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    );
  };

  const getAriaLabel = () => {
    if (theme === "system") {
      return `Currently using system theme (${resolvedTheme}). Click to switch to light mode`;
    }
    return `Currently in ${theme} mode. Click to switch to ${theme === "dark" ? "light" : "dark"} mode`;
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted-200 dark:bg-muted-800 border border-muted-300 dark:border-muted-700 transition-all duration-300 hover:bg-muted-300 dark:hover:bg-muted-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
      aria-label={getAriaLabel()}
      title={theme === "system" ? `System (${resolvedTheme})` : theme === "dark" ? "Dark" : "Light"}
    >
      {getIcon()}
    </button>
  );
};

