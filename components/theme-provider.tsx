"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Check if this is the first visit (no theme stored in localStorage)
    if (typeof window !== "undefined" && !localStorage.getItem("theme")) {
      // Check if user prefers dark mode
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        localStorage.setItem("theme", "dark");
      } else {
        // Default to light otherwise
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
