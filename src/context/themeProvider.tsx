import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { flushSync } from "react-dom";
import { ThemeContext, type Theme } from "./themeContext";

// Saved choice wins; otherwise follow the system preference.
// Mirrors the inline script in index.html that sets the class before first paint.
const getInitialTheme = (): Theme => {
  // Build-time prerender has no window; markup doesn't depend on the theme
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage unavailable (e.g. private mode) — fall through to system preference
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // Ignore — theme still applies for this session
    }

    const apply = () => {
      setTheme(newTheme);
      document.body.classList.toggle("dark-mode", newTheme === "dark");
    };

    // Circular reveal from the theme toggle via the View Transitions API;
    // plain swap where unsupported or when the user prefers reduced motion.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const btn = document.querySelector(".theme-toggle-btn");
    const rect = btn?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Suspend CSS color transitions so the new snapshot is final colors
    const root = document.documentElement;
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.finished.finally(() => root.classList.remove("theme-switching"));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // Transition skipped (e.g. tab hidden) — theme is already applied
      });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
