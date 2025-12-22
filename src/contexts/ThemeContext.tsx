"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Resolve theme based on current setting
  const resolveTheme = (currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Apply theme to document
  const applyTheme = (themeToApply: "light" | "dark") => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", themeToApply === "dark");
      setResolvedTheme(themeToApply);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const initialTheme = savedTheme || "system";
      const initialResolved = resolveTheme(initialTheme);
      
      setThemeState(initialTheme);
      setResolvedTheme(initialResolved);
      applyTheme(initialResolved);
      setMounted(true);
    }
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Only update if theme is set to "system"
      if (theme === "system") {
        const newResolved = e.matches ? "dark" : "light";
        applyTheme(newResolved);
      }
    };

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, mounted]);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (!mounted) return;
    const newResolved = resolveTheme(theme);
    applyTheme(newResolved);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      if (newTheme === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", newTheme);
      }
    }
  };

  const toggleTheme = () => {
    // Cycle through: system -> light -> dark -> system
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
