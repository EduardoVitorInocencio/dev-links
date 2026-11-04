import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("devlinks-theme");

  if (saved === "dark" || saved === "light") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
    .matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("devlinks-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(current =>
      current === "dark" ? "light" : "dark"
    );
  }

  return { theme, toggleTheme };
}