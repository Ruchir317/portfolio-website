import { themes, type ThemeName } from "./palette";

export const THEME_STORAGE_KEY = "theme";

export function currentTheme(): ThemeName {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Switch theme, remember the choice, and keep the browser UI colour in step. */
export function applyTheme(theme: ThemeName, persist = true): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = themes[theme].bg;
  document.head.appendChild(meta);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }
}

export function toggleTheme(): void {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
}

/** Runs in <head> before first paint, so the page never flashes the wrong theme. A ?theme=light|dark
 *  link wins (used by the Lighthouse runs; it is not saved), then a saved choice, then the system setting, then dark. It also follows the system while the visitor has not chosen. */
export const themeInitScript = `(function(){try{
var K=${JSON.stringify(THEME_STORAGE_KEY)},B=${JSON.stringify({ dark: themes.dark.bg, light: themes.light.bg })};
var q=matchMedia("(prefers-color-scheme: light)");
function set(t){var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;
document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.remove()});
var m=document.createElement("meta");m.name="theme-color";m.content=B[t];document.head.appendChild(m)}
var s=null;try{s=localStorage.getItem(K)}catch(e){}
var p=new URLSearchParams(location.search).get("theme");
set(p==="light"||p==="dark"?p:(s==="light"||s==="dark"?s:(q.matches?"light":"dark")));
q.addEventListener("change",function(e){var v=null;try{v=localStorage.getItem(K)}catch(x){}if(!v)set(e.matches?"light":"dark")})
}catch(e){}})();`;
