import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found — Ruchir Jadhav" };

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Error 404</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-primary leading-tight mb-6">
          This page does not exist.
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-10">
          The link may be old or mistyped. Try the home page, or press{" "}
          <kbd className="font-mono text-sm border border-border rounded-sm px-1.5 py-0.5 text-text-primary">⌘K</kbd> /{" "}
          <kbd className="font-mono text-sm border border-border rounded-sm px-1.5 py-0.5 text-text-primary">Ctrl K</kbd> to
          jump to a project or post.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-6 py-3 rounded-sm text-sm tracking-wide hover:bg-accent-light transition-colors"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
