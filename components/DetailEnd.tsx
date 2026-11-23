import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Mail } from "lucide-react";
import ResumeButton from "@/components/ResumeButton";

// The end of a detail page: where to go next, so a reader who is convinced is not left at a dead end.
export default function DetailEnd({
  next,
  backHref,
  backLabel,
}: {
  next?: { href: string; title: string; noun: string };
  backHref: string;
  backLabel: string;
}) {
  return (
    <nav aria-label="Next steps" className="mt-20 pt-10 border-t border-border">
      {next && (
        <Link
          href={next.href}
          className="card-glow group flex items-center justify-between gap-4 border border-border bg-surface/40 hover:border-accent/40 hover:bg-raised rounded-xs p-6 mb-6 transition-colors"
        >
          <span>
            <span className="block font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors">
              {next.title}
            </span>
            <span className="block mt-1 font-mono text-xs tracking-widest uppercase text-text-muted">Next {next.noun}</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-text-muted group-hover:text-accent transition-colors" />
        </Link>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide hover:bg-accent-light transition-colors"
        >
          Get in touch
          <Mail size={15} aria-hidden="true" />
        </Link>
        <ResumeButton className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-secondary hover:border-secondary/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-colors">
          Resume
          <FileText size={15} aria-hidden="true" />
        </ResumeButton>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-colors"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {backLabel}
        </Link>
      </div>
    </nav>
  );
}
