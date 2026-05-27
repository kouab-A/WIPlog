"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  themes, defaultTheme, applyTheme, applyColorMode,
  type Theme, type ThemeId, type ColorMode,
} from "@/lib/themes";

type ThemeContextValue = {
  theme:           Theme;
  setThemeId:      (id: ThemeId) => void;
  colorMode:       ColorMode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme:           defaultTheme,
  setThemeId:      () => {},
  colorMode:       "light",
  toggleColorMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const ACCENT_KEY = "wiplog-theme";
const MODE_KEY   = "wiplog-color-mode";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme,     setTheme]     = useState<Theme>(defaultTheme);
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  useEffect(() => {
    const savedAccent  = localStorage.getItem(ACCENT_KEY) as ThemeId | null;
    const initialTheme = (savedAccent && themes.find((t) => t.id === savedAccent)) ?? defaultTheme;

    const savedMode    = localStorage.getItem(MODE_KEY) as ColorMode | null;
    const initialMode: ColorMode = savedMode === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    setColorMode(initialMode);
    applyColorMode(initialMode);
    applyTheme(initialTheme, initialMode);
  }, []);

  const setThemeId = (id: ThemeId) => {
    const found = themes.find((t) => t.id === id);
    if (!found) return;
    setTheme(found);
    applyTheme(found, colorMode);
    localStorage.setItem(ACCENT_KEY, id);
  };

  const toggleColorMode = () => {
    const next: ColorMode = colorMode === "light" ? "dark" : "light";
    setColorMode(next);
    applyColorMode(next);
    applyTheme(theme, next);   // ← アクセントもモードに合わせて再適用
    localStorage.setItem(MODE_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeId, colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
