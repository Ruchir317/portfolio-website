import colors from "./colors.json";

// Single source of truth for colour, in two themes. `lib/colors.json` holds the values (the contrast
// check in scripts/contrast.mjs reads the same file); Tailwind, the stylesheet and the page's CSS
// variables are all generated from it. Generated images (icons, share cards) always use the dark theme.
//
// Roles: teal = primary and interactive; amber = status (availability, grades); periwinkle = research
// (publications, outcomes). Each role keeps one hue in both themes and only its lightness changes.
// Dark: surfaces are a deep ink and get lighter with elevation. Light: a cool off-white page with white cards.
export type ThemeName = "dark" | "light";
export type ThemeColors = typeof colors.dark;

export const themes: Record<ThemeName, ThemeColors> = { dark: colors.dark, light: colors.light };
// For prefers-contrast: more, each of these roles takes the value of a stronger role in the same theme.
const moreContrast = colors.moreContrast as Partial<Record<keyof ThemeColors, keyof ThemeColors>>;
export const palette = themes.dark;

// Colour names as used by Tailwind (kebab-case) and as CSS variables (--color-<name>).
export const colorNames = {
  bg: "bg",
  surface: "surface",
  raised: "raised",
  border: "border",
  textPrimary: "text-primary",
  textDim: "text-dim",
  textMuted: "text-muted",
  textFaint: "text-faint",
  accent: "accent",
  accentLight: "accent-light",
  secondary: "secondary",
  tertiary: "tertiary",
} as const;

function channels(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`; // "r g b", so Tailwind can add alpha
}

function block(theme: ThemeName): string {
  const vars = (Object.keys(colorNames) as (keyof typeof colorNames)[])
    .map((key) => `--color-${colorNames[key]}:${channels(themes[theme][key])};`)
    .join("");
  // Elevation: dark surfaces get a faint top highlight; light surfaces get a soft shadow.
  const elevation =
    theme === "dark"
      ? "--elev:inset 0 1px 0 0 rgb(var(--color-text-primary) / .04);--elev-hover:inset 0 1px 0 0 rgb(var(--color-text-primary) / .07),0 16px 40px -16px rgb(var(--color-accent) / .25);"
      : "--elev:0 1px 2px 0 rgb(var(--color-text-primary) / .07);--elev-hover:0 1px 2px 0 rgb(var(--color-text-primary) / .07),0 14px 34px -16px rgb(var(--color-accent) / .35);";
  return `${vars}${elevation}color-scheme:${theme};`;
}

function moreBlock(theme: ThemeName): string {
  return (Object.keys(moreContrast) as (keyof ThemeColors)[])
    .map((role) => `--color-${colorNames[role]}:${channels(themes[theme][moreContrast[role]!])};`)
    .join("");
}

/** CSS custom properties for both themes. Dark is the default; light applies when the visitor chose it,
 *  or follows the system setting when they have not (and without any JavaScript). */
export function themeCss(): string {
  return (
    `:root{${block("dark")}}` +
    `:root[data-theme="light"]{${block("light")}}` +
    `:root[data-theme="dark"]{${block("dark")}}` +
    `@media (prefers-color-scheme: light){:root:not([data-theme]){${block("light")}}}` +
    // Higher contrast for visitors who ask for it: placed last so it overrides the blocks above.
    `@media (prefers-contrast: more){:root{${moreBlock("dark")}}:root[data-theme="light"]{${moreBlock("light")}}:root[data-theme="dark"]{${moreBlock("dark")}}}` +
    `@media (prefers-contrast: more) and (prefers-color-scheme: light){:root:not([data-theme]){${moreBlock("light")}}}`
  );
}
