import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { allPosts, formatDate } from "@/data/posts";
import AnimatedSection from "@/components/AnimatedSection";
import { WRITING_ENABLED } from "@/data/site";
import { notFound } from "next/navigation";

const writingMetadata: Metadata = {
  title: "Writing — Ruchir Jadhav",
  description: "Notes on how I build things.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing — Ruchir Jadhav",
    description: "Notes on how I build things.",
    url: "/writing",
    images: ["/opengraph-image"],
  },
};

// No metadata while the blog is off, so the 404 page keeps the site's own 404 title.
export function generateMetadata(): Metadata {
  return WRITING_ENABLED ? writingMetadata : {};
}

export default function WritingPage() {
  if (!WRITING_ENABLED) notFound();
  return (
    <main id="main" className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            RJ<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl/none text-text-primary leading-tight mb-3">
          Writing
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl mb-14">Notes on how I build things.</p>

        <div className="space-y-4">
          {allPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={0.05 + i * 0.05}>
              <Link
                href={`/writing/${post.slug}`}
                className="card-glow block border border-border bg-surface/40 hover:border-accent/50 hover:bg-raised rounded-xs p-6 transition-all duration-200"
              >
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-2">
                  {formatDate(post.date)} · {post.metadata.readingTime} min read
                </p>
                <h2 className="font-display font-bold text-xl text-text-primary mb-2">{post.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed">{post.summary}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}
