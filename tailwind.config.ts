import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0F",
        surface: "#141418",
        raised: "#1E1E26",
        border: "#22222C",
        "text-primary": "#F0EFE8",
        "text-muted": "#848494",
        "text-faint": "#3E3E50",
        accent: "#14B8A6",
        "accent-light": "#2DD4BF",
        secondary: "#F472B6",
        tertiary: "#FFB020",
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
