// Single source of truth for colour. Tailwind, the stylesheet (via theme()) and every generated
// image import from here, so changing the look is a one-file edit.
//
// Roles: teal = primary and interactive; amber = status (availability, grades);
// periwinkle = research (publications, outcomes). Surfaces are a deep ink with a faint teal cast.
export const palette = {
  bg: "#0A0E13",
  surface: "#10161C",
  raised: "#17202A",
  border: "#1F2A35",
  borderStrong: "#2A3643",
  textPrimary: "#F0EFE8",
  textDim: "#B4B2AA",
  textMuted: "#8794A3",
  textFaint: "#3A4856",
  accent: "#14B8A6",
  accentLight: "#2DD4BF",
  secondary: "#9AA5FF",
  tertiary: "#FFB020",
} as const;
