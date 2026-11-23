import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

// The top bar of every page except the home page (which has the full Navbar): logo, theme toggle and an optional way back.
export default function SiteHeader({ backHref, backLabel }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="RJ, home"
          className="inline-flex items-center min-h-11 min-w-11 font-display font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors"
        >
          RJ<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 min-h-11 font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {backLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
