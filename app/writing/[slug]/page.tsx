import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { allPosts, formatDate } from "@/data/posts";
import MDXContent from "@/components/MDXContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const title = `${post.title} — Ruchir Jadhav`;
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title,
      description: post.summary,
      url: `/writing/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main id="main" className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          keywords: post.tags.join(", "),
          mainEntityOfPage: `${SITE_URL}/writing/${slug}`,
          author: { "@type": "Person", name: "Ruchir Jadhav", url: SITE_URL },
        }}
      />
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            RJ<span className="text-accent">.</span>
          </Link>
          <Link
            href="/writing"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            All writing
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-accent tracking-wide mb-4">
          {formatDate(post.date)} · {post.metadata.readingTime} min read
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl break-words hyphens-auto text-text-primary leading-tight mb-8">
          {post.title}
        </h1>
        <MDXContent code={post.code} />
      </article>
    </main>
  );
}
