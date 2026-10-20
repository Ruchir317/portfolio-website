"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

// Both icons are always in the markup and CSS shows the right one for the active theme (see globals.css),
// so server HTML and client render agree and there is no hydration mismatch.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className={`theme-toggle inline-flex items-center justify-center w-8 h-8 text-text-muted hover:text-accent border border-border rounded-sm transition-colors ${className}`}
    >
      <Sun size={14} className="theme-icon-sun" aria-hidden="true" />
      <Moon size={14} className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
