export type ColorMode = "light" | "dark";
export type ThemeId = "indigo" | "blue" | "emerald" | "amber" | "rose";

type AccentColors = {
  accent:      string;
  accentDim:   string;
  accentGlow:  string;
};

export type Theme = {
  id:     ThemeId;
  label:  string;
  swatch: string;
  light:  AccentColors;
  dark:   AccentColors;
};

export const themes: Theme[] = [
  {
    id: "indigo",
    label: "インディゴ",
    swatch: "#7c6af8",
    light: {
      accent:     "#5548cc",
      accentDim:  "rgba(85, 72, 204, 0.15)",
      accentGlow: "rgba(85, 72, 204, 0.08)",
    },
    dark: {
      accent:     "#8b7bf8",
      accentDim:  "rgba(139, 123, 248, 0.2)",
      accentGlow: "rgba(139, 123, 248, 0.12)",
    },
  },
  {
    id: "blue",
    label: "ブルー",
    swatch: "#3b82f6",
    light: {
      accent:     "#2563eb",
      accentDim:  "rgba(37, 99, 235, 0.15)",
      accentGlow: "rgba(37, 99, 235, 0.08)",
    },
    dark: {
      accent:     "#60a5fa",
      accentDim:  "rgba(96, 165, 250, 0.2)",
      accentGlow: "rgba(96, 165, 250, 0.12)",
    },
  },
  {
    id: "emerald",
    label: "エメラルド",
    swatch: "#10b981",
    light: {
      accent:     "#059669",
      accentDim:  "rgba(5, 150, 105, 0.15)",
      accentGlow: "rgba(5, 150, 105, 0.08)",
    },
    dark: {
      accent:     "#34d399",
      accentDim:  "rgba(52, 211, 153, 0.2)",
      accentGlow: "rgba(52, 211, 153, 0.12)",
    },
  },
  {
    id: "amber",
    label: "アンバー",
    swatch: "#f59e0b",
    light: {
      accent:     "#d97706",
      accentDim:  "rgba(217, 119, 6, 0.15)",
      accentGlow: "rgba(217, 119, 6, 0.08)",
    },
    dark: {
      accent:     "#fbbf24",
      accentDim:  "rgba(251, 191, 36, 0.2)",
      accentGlow: "rgba(251, 191, 36, 0.12)",
    },
  },
  {
    id: "rose",
    label: "ローズ",
    swatch: "#f43f5e",
    light: {
      accent:     "#e11d48",
      accentDim:  "rgba(225, 29, 72, 0.15)",
      accentGlow: "rgba(225, 29, 72, 0.08)",
    },
    dark: {
      accent:     "#fb7185",
      accentDim:  "rgba(251, 113, 133, 0.2)",
      accentGlow: "rgba(251, 113, 133, 0.12)",
    },
  },
];

export const defaultTheme = themes[0];

export function applyTheme(theme: Theme, mode: ColorMode) {
  const root   = document.documentElement;
  const colors = theme[mode];
  root.style.setProperty("--accent",      colors.accent);
  root.style.setProperty("--accent-dim",  colors.accentDim);
  root.style.setProperty("--accent-glow", colors.accentGlow);
}

type ColorModeVars = Record<string, string>;

const lightVars: ColorModeVars = {
  "--bg-base":       "#f6f6fb",
  "--bg-surface":    "#ffffff",
  "--bg-card":       "#ffffff",
  "--bg-elevated":   "#ededf7",
  "--border":        "#ddddf0",
  "--border-subtle": "#e8e8f6",
  "--text-primary":  "#1a1a2e",
  "--text-secondary":"#4a4a6a",
  "--text-muted":    "#9090b8",
  "--navbar-bg":     "rgba(246, 246, 251, 0.88)",
};

const darkVars: ColorModeVars = {
  "--bg-base":       "#0a0a0f",
  "--bg-surface":    "#12121a",
  "--bg-card":       "#1a1a26",
  "--bg-elevated":   "#22223a",
  "--border":        "#2a2a42",
  "--border-subtle": "#1e1e30",
  "--text-primary":  "#e8e8f0",
  "--text-secondary":"#8888aa",
  "--text-muted":    "#55556a",
  "--navbar-bg":     "rgba(10, 10, 15, 0.85)",
};

export const colorModeVars: Record<ColorMode, ColorModeVars> = {
  light: lightVars,
  dark:  darkVars,
};

export function applyColorMode(mode: ColorMode) {
  const root = document.documentElement;
  const vars = colorModeVars[mode];
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
  root.style.colorScheme = mode;
}
