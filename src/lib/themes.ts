export type ThemeKey = "zinc" | "ocean" | "forest" | "sunset" | "violet" | "rose";

export type ThemeVars = {
  background: string; foreground: string;
  card: string; "card-foreground": string;
  primary: string; "primary-foreground": string;
  secondary: string; "secondary-foreground": string;
  muted: string; "muted-foreground": string;
  accent: string; "accent-foreground": string;
  border: string; input: string; ring: string;
  radius: string;
};

export type ThemeDef = {
  key: ThemeKey;
  label: string;
  preview: { bg: string; primary: string; muted: string };
  light: ThemeVars;
  dark: ThemeVars;
};

export const THEMES: ThemeDef[] = [
  {
    key: "zinc",
    label: "Zinc",
    preview: { bg: "#ffffff", primary: "#18181b", muted: "#f4f4f5" },
    light: {
      background: "oklch(1 0 0)", foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)", "card-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.205 0 0)", "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)", "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)", "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)", "accent-foreground": "oklch(0.205 0 0)",
      border: "oklch(0.922 0 0)", input: "oklch(0.922 0 0)", ring: "oklch(0.708 0 0)",
      radius: "0.625rem",
    },
    dark: {
      background: "oklch(0.18 0 0)", foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)", "card-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.922 0 0)", "primary-foreground": "oklch(0.205 0 0)",
      secondary: "oklch(0.269 0 0)", "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)", "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)", "accent-foreground": "oklch(0.985 0 0)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.556 0 0)",
      radius: "0.625rem",
    },
  },
  {
    key: "ocean",
    label: "Ocean",
    preview: { bg: "#f0f7ff", primary: "#1d6fa4", muted: "#ddeeff" },
    light: {
      background: "oklch(0.98 0.008 240)", foreground: "oklch(0.15 0.03 240)",
      card: "oklch(0.995 0.004 240)", "card-foreground": "oklch(0.15 0.03 240)",
      primary: "oklch(0.48 0.18 262)", "primary-foreground": "oklch(0.98 0.01 262)",
      secondary: "oklch(0.93 0.02 240)", "secondary-foreground": "oklch(0.22 0.05 240)",
      muted: "oklch(0.94 0.014 240)", "muted-foreground": "oklch(0.52 0.05 240)",
      accent: "oklch(0.93 0.02 240)", "accent-foreground": "oklch(0.22 0.05 240)",
      border: "oklch(0.88 0.022 240)", input: "oklch(0.88 0.022 240)", ring: "oklch(0.48 0.18 262)",
      radius: "0.625rem",
    },
    dark: {
      background: "oklch(0.16 0.025 240)", foreground: "oklch(0.95 0.01 240)",
      card: "oklch(0.19 0.03 240)", "card-foreground": "oklch(0.95 0.01 240)",
      primary: "oklch(0.65 0.16 262)", "primary-foreground": "oklch(0.13 0.03 262)",
      secondary: "oklch(0.24 0.03 240)", "secondary-foreground": "oklch(0.92 0.01 240)",
      muted: "oklch(0.24 0.03 240)", "muted-foreground": "oklch(0.65 0.04 240)",
      accent: "oklch(0.24 0.03 240)", "accent-foreground": "oklch(0.92 0.01 240)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.65 0.16 262)",
      radius: "0.625rem",
    },
  },
  {
    key: "forest",
    label: "Forest",
    preview: { bg: "#f0fdf4", primary: "#166534", muted: "#dcfce7" },
    light: {
      background: "oklch(0.98 0.008 148)", foreground: "oklch(0.15 0.03 148)",
      card: "oklch(0.995 0.005 148)", "card-foreground": "oklch(0.15 0.03 148)",
      primary: "oklch(0.42 0.14 148)", "primary-foreground": "oklch(0.97 0.01 148)",
      secondary: "oklch(0.93 0.02 148)", "secondary-foreground": "oklch(0.22 0.05 148)",
      muted: "oklch(0.94 0.016 148)", "muted-foreground": "oklch(0.52 0.05 148)",
      accent: "oklch(0.93 0.02 148)", "accent-foreground": "oklch(0.22 0.05 148)",
      border: "oklch(0.87 0.025 148)", input: "oklch(0.87 0.025 148)", ring: "oklch(0.42 0.14 148)",
      radius: "0.5rem",
    },
    dark: {
      background: "oklch(0.16 0.02 148)", foreground: "oklch(0.95 0.01 148)",
      card: "oklch(0.19 0.025 148)", "card-foreground": "oklch(0.95 0.01 148)",
      primary: "oklch(0.65 0.14 148)", "primary-foreground": "oklch(0.12 0.03 148)",
      secondary: "oklch(0.24 0.03 148)", "secondary-foreground": "oklch(0.92 0.01 148)",
      muted: "oklch(0.24 0.03 148)", "muted-foreground": "oklch(0.63 0.05 148)",
      accent: "oklch(0.24 0.03 148)", "accent-foreground": "oklch(0.92 0.01 148)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.65 0.14 148)",
      radius: "0.5rem",
    },
  },
  {
    key: "sunset",
    label: "Sunset",
    preview: { bg: "#fffbeb", primary: "#b45309", muted: "#fef3c7" },
    light: {
      background: "oklch(0.99 0.008 80)", foreground: "oklch(0.16 0.04 50)",
      card: "oklch(0.995 0.005 80)", "card-foreground": "oklch(0.16 0.04 50)",
      primary: "oklch(0.55 0.18 42)", "primary-foreground": "oklch(0.98 0.01 42)",
      secondary: "oklch(0.94 0.025 75)", "secondary-foreground": "oklch(0.24 0.06 50)",
      muted: "oklch(0.95 0.018 75)", "muted-foreground": "oklch(0.52 0.06 50)",
      accent: "oklch(0.94 0.025 75)", "accent-foreground": "oklch(0.24 0.06 50)",
      border: "oklch(0.88 0.03 75)", input: "oklch(0.88 0.03 75)", ring: "oklch(0.55 0.18 42)",
      radius: "0.75rem",
    },
    dark: {
      background: "oklch(0.16 0.025 50)", foreground: "oklch(0.95 0.01 80)",
      card: "oklch(0.2 0.03 50)", "card-foreground": "oklch(0.95 0.01 80)",
      primary: "oklch(0.72 0.18 60)", "primary-foreground": "oklch(0.13 0.04 50)",
      secondary: "oklch(0.25 0.04 50)", "secondary-foreground": "oklch(0.92 0.01 80)",
      muted: "oklch(0.25 0.04 50)", "muted-foreground": "oklch(0.65 0.05 60)",
      accent: "oklch(0.25 0.04 50)", "accent-foreground": "oklch(0.92 0.01 80)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.72 0.18 60)",
      radius: "0.75rem",
    },
  },
  {
    key: "violet",
    label: "Violet",
    preview: { bg: "#faf5ff", primary: "#6d28d9", muted: "#f3e8ff" },
    light: {
      background: "oklch(0.985 0.007 295)", foreground: "oklch(0.15 0.035 295)",
      card: "oklch(0.995 0.004 295)", "card-foreground": "oklch(0.15 0.035 295)",
      primary: "oklch(0.5 0.22 292)", "primary-foreground": "oklch(0.98 0.01 292)",
      secondary: "oklch(0.94 0.022 295)", "secondary-foreground": "oklch(0.23 0.055 295)",
      muted: "oklch(0.94 0.016 295)", "muted-foreground": "oklch(0.52 0.05 295)",
      accent: "oklch(0.94 0.022 295)", "accent-foreground": "oklch(0.23 0.055 295)",
      border: "oklch(0.88 0.025 295)", input: "oklch(0.88 0.025 295)", ring: "oklch(0.5 0.22 292)",
      radius: "0.625rem",
    },
    dark: {
      background: "oklch(0.16 0.025 295)", foreground: "oklch(0.95 0.01 295)",
      card: "oklch(0.19 0.03 295)", "card-foreground": "oklch(0.95 0.01 295)",
      primary: "oklch(0.68 0.2 292)", "primary-foreground": "oklch(0.12 0.03 292)",
      secondary: "oklch(0.24 0.035 295)", "secondary-foreground": "oklch(0.92 0.01 295)",
      muted: "oklch(0.24 0.035 295)", "muted-foreground": "oklch(0.63 0.05 295)",
      accent: "oklch(0.24 0.035 295)", "accent-foreground": "oklch(0.92 0.01 295)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.68 0.2 292)",
      radius: "0.625rem",
    },
  },
  {
    key: "rose",
    label: "Rose",
    preview: { bg: "#fff1f2", primary: "#be123c", muted: "#ffe4e6" },
    light: {
      background: "oklch(0.99 0.007 10)", foreground: "oklch(0.15 0.04 10)",
      card: "oklch(0.995 0.004 10)", "card-foreground": "oklch(0.15 0.04 10)",
      primary: "oklch(0.48 0.2 12)", "primary-foreground": "oklch(0.98 0.01 12)",
      secondary: "oklch(0.94 0.022 10)", "secondary-foreground": "oklch(0.23 0.055 10)",
      muted: "oklch(0.95 0.016 10)", "muted-foreground": "oklch(0.52 0.05 10)",
      accent: "oklch(0.94 0.022 10)", "accent-foreground": "oklch(0.23 0.055 10)",
      border: "oklch(0.88 0.025 10)", input: "oklch(0.88 0.025 10)", ring: "oklch(0.48 0.2 12)",
      radius: "1rem",
    },
    dark: {
      background: "oklch(0.16 0.025 10)", foreground: "oklch(0.95 0.01 10)",
      card: "oklch(0.19 0.03 10)", "card-foreground": "oklch(0.95 0.01 10)",
      primary: "oklch(0.68 0.2 12)", "primary-foreground": "oklch(0.12 0.03 12)",
      secondary: "oklch(0.24 0.035 10)", "secondary-foreground": "oklch(0.92 0.01 10)",
      muted: "oklch(0.24 0.035 10)", "muted-foreground": "oklch(0.63 0.05 10)",
      accent: "oklch(0.24 0.035 10)", "accent-foreground": "oklch(0.92 0.01 10)",
      border: "oklch(1 0 0 / 10%)", input: "oklch(1 0 0 / 15%)", ring: "oklch(0.68 0.2 12)",
      radius: "1rem",
    },
  },
];

// Built-in fonts (pre-loaded via next/font — no external request needed)
export const BUILTIN_FONTS: { family: string; label: string; variable: string }[] = [
  { family: "Geist",             label: "Geist",         variable: "--font-geist-sans" },
  { family: "Plus Jakarta Sans", label: "Jakarta Sans",  variable: "--font-jakarta" },
  { family: "Geist Mono",        label: "Geist Mono",    variable: "--font-geist-mono" },
];

// Popular Google Fonts shown as quick-picks
export const GOOGLE_FONT_PRESETS = [
  "Inter", "Poppins", "DM Sans", "Roboto", "Nunito",
  "Raleway", "Space Grotesk", "Outfit", "Sora", "Playfair Display",
];

/** Returns the CSS font-family value for a given family name */
function fontFamilyCSS(family: string): string {
  if (!family || family === "Geist") return "var(--font-geist-sans)";
  const builtin = BUILTIN_FONTS.find(f => f.family === family);
  if (builtin) return `var(${builtin.variable})`;
  return `'${family}', sans-serif`;
}

/** Returns a Google Fonts stylesheet URL, or null for built-ins */
export function googleFontURL(family: string): string | null {
  if (!family || BUILTIN_FONTS.some(f => f.family === family)) return null;
  const encoded = family.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
}

export function buildThemeCSS(themeKey: ThemeKey, fontFamily: string): string {
  const theme = THEMES.find(t => t.key === themeKey) ?? THEMES[0];
  const fontCSS = fontFamilyCSS(fontFamily);

  const vars = (obj: ThemeVars) =>
    Object.entries(obj).map(([k, v]) => `--${k}: ${v};`).join("\n    ");

  return `
:root {
    ${vars(theme.light)}
    --font-sans: ${fontCSS};
  }
  .dark {
    ${vars(theme.dark)}
    --font-sans: ${fontCSS};
  }`.trim();
}

export const DEFAULT_THEME: ThemeKey = "zinc";
