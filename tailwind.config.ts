import type { Config } from "tailwindcss";
import { palette } from "./lib/palette";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: palette.bg,
        surface: palette.surface,
        raised: palette.raised,
        border: palette.border,
        "text-primary": palette.textPrimary,
        "text-dim": palette.textDim,
        "text-muted": palette.textMuted,
        "text-faint": palette.textFaint,
        accent: palette.accent,
        "accent-light": palette.accentLight,
        secondary: palette.secondary,
        tertiary: palette.tertiary,
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
