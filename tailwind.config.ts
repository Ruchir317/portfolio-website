import type { Config } from "tailwindcss";
import { colorNames } from "./lib/palette";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: Object.fromEntries(
        Object.values(colorNames).map((name) => [name, `rgb(var(--color-${name}) / <alpha-value>)`])
      ),
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
