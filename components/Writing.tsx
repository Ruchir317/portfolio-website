import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { allPosts, formatDate } from "@/data/posts";

export default function Writing() {
  if (allPosts.length === 0) return null;
  return (
    <section id="writing" className="pt-24 pb-4">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="section-label">Writing</h2>
            <div className="flex-1 h-px bg-border" />
            <Link
              href="/writing"
              className="font-mono text-[10px] tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
            >
              All posts
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allPosts.slice(0, 3).map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.07}>
              <Link
                href={`/writing/${post.slug}`}
                className="card-glow group flex h-full flex-col border border-border bg-surface/40 hover:border-accent/50 hover:bg-raised rounded-xs p-6 transition-colors duration-300"
              >
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
                  {formatDate(post.date)} · {post.metadata.readingTime} min read
                </p>
                <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">{post.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-accent">
                  Read <ArrowUpRight size={12} />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
