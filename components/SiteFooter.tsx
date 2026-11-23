import { lastUpdated } from "@/data/lastUpdated";

// Rendered after <main> (not inside a section) so it is the page's contentinfo landmark.
export default function SiteFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-12">
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-text-muted text-sm">
          Ruchir Jadhav<span className="text-accent">.</span>
        </span>
        <p className="font-mono text-xs text-text-muted tracking-wider text-center sm:text-right">
          Built with Next.js · Tailwind · Motion
          <span className="mx-2 text-text-faint">·</span>
          Last updated{" "}
          <time dateTime={lastUpdated.toISOString().slice(0, 10)}>
            {lastUpdated.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}
          </time>
        </p>
      </div>
    </footer>
  );
}
