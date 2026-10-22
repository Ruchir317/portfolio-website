import Link from "next/link";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import ResumeButton from "@/components/ResumeButton";
import { resume } from "@/data/resume";

// Old links to /resume.pdf redirect here (next.config.js). Not for search results: the page only holds a button.
export const metadata: Metadata = {
  title: "Resume — Ruchir Jadhav",
  robots: { index: false, follow: false },
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Resume</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl/none text-text-primary leading-tight mb-6">
          Open my resume.
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-10">
          A quick automatic check confirms you are a person before the PDF opens in a new tab.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ResumeButton className="inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide hover:bg-accent-light transition-colors">
            Open resume (PDF)
            <Download size={15} />
          </ResumeButton>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-colors"
          >
            Back home
          </Link>
        </div>
        <noscript>
          <p className="mt-8 text-text-muted">
            The resume needs JavaScript to open.{" "}
            <a className="text-accent underline" href={`mailto:${resume.contact.email}`}>
              Email me
            </a>{" "}
            for a copy.
          </p>
        </noscript>
      </div>
    </main>
  );
}
