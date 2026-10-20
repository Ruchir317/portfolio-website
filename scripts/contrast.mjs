// Contrast gate: every text colour must be readable on every surface, in both themes.
// Reads lib/colors.json (the single source of colour) and checks two measures:
//   WCAG 2 contrast ratio  >= 4.5   (the legal and tooling standard, AA for body text)
//   APCA lightness contrast Lc >= 60 (the perceptual method proposed for WCAG 3; far stricter on dark
//   backgrounds, where WCAG 2 is too lenient). Primary text must reach Lc 90.
import { readFileSync } from "node:fs";

const { moreContrast, ...palette } = JSON.parse(readFileSync(new URL("../lib/colors.json", import.meta.url), "utf8"));
const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const wcagLum = (hex) => {
  const [r, g, b] = channels(hex).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const wcag = (a, b) => {
  const [hi, lo] = [wcagLum(a), wcagLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// APCA 0.0.98G (SAPC 4g)
const apcaY = (hex) => {
  const [r, g, b] = channels(hex);
  const y = 0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.072175 * b ** 2.4;
  return y >= 0.022 ? y : y + (0.022 - y) ** 1.414;
};
const apca = (text, bg) => {
  const yt = apcaY(text);
  const yb = apcaY(bg);
  if (Math.abs(yb - yt) < 0.0005) return 0;
  if (yb > yt) {
    const s = (yb ** 0.56 - yt ** 0.57) * 1.14;
    return s < 0.1 ? 0 : (s - 0.027) * 100;
  }
  const s = (yb ** 0.65 - yt ** 0.62) * 1.14;
  return s > -0.1 ? 0 : (s + 0.027) * 100;
};

const surfaces = ["bg", "surface", "raised"];
const textRoles = ["textPrimary", "textDim", "textMuted", "accent", "accentLight", "secondary", "tertiary"];
let failed = false;

for (const [name, colors] of Object.entries(palette)) {
  console.log(`\n${name} theme (WCAG ratio | APCA Lc) on ${surfaces.join(" / ")}`);
  for (const role of textRoles) {
    const cells = surfaces.map((s) => {
      const ratio = wcag(colors[role], colors[s]);
      const lc = Math.abs(apca(colors[role], colors[s]));
      const minLc = role === "textPrimary" ? 90 : 60;
      const ok = ratio >= 4.5 && lc >= minLc;
      if (!ok) failed = true;
      return `${ratio.toFixed(1).padStart(5)} | ${lc.toFixed(0).padStart(3)} ${ok ? " " : "!"}`;
    });
    console.log(`  ${role.padEnd(12)} ${cells.join("   ")}`);
  }
  const label = wcag(colors.bg, colors.accent);
  const labelOk = label >= 4.5;
  if (!labelOk) failed = true;
  console.log(`  button label on accent: ${label.toFixed(1)} ${labelOk ? "" : "!"}`);
}

// prefers-contrast: more. Roles listed in moreContrast take a stronger colour; text must then reach AAA (7:1)
// and borders must reach 3:1 against the page, the minimum for a visible component edge.
for (const [name, colors] of Object.entries(palette)) {
  const boosted = { ...colors };
  for (const [role, source] of Object.entries(moreContrast)) boosted[role] = colors[source];
  console.log(`\n${name} theme, prefers-contrast: more`);
  for (const role of ["textPrimary", "textDim", "textMuted"]) {
    const worst = Math.min(...surfaces.map((s) => wcag(boosted[role], boosted[s])));
    if (worst < 7) failed = true;
    console.log(`  ${role.padEnd(12)} worst WCAG ${worst.toFixed(1)} ${worst >= 7 ? "" : "!"}`);
  }
  const edge = wcag(boosted.border, boosted.bg);
  if (edge < 3) failed = true;
  console.log(`  border vs page: ${edge.toFixed(1)} ${edge >= 3 ? "" : "!"}`);
}

console.log(failed ? "\nFAIL: a colour pair is below the threshold (marked !)." : "\nAll colour pairs pass in both themes.");
process.exit(failed ? 1 : 0);
