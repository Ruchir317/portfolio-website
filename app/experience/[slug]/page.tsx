import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { resume } from "@/data/resume";
import { experienceDetails } from "@/data/experienceDetails";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/data/site";
import AnimatedSection from "@/components/AnimatedSection";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

export function generateStaticParams() {
  return Object.keys(experienceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = resume.experience.find((e) => e.slug === slug);
  const detail = experienceDetails[slug];
  if (!job || !detail) return {};

  const title = `${job.role} @ ${job.company} — Ruchir Jadhav`;
  return {
    title,
    description: detail.summary,
    alternates: { canonical: `/experience/${slug}` },
    openGraph: { title, description: detail.summary, url: `/experience/${slug}`, type: "article" },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = resume.experience.find((e) => e.slug === slug);
  const detail = experienceDetails[slug];

  if (!job || !detail) {
    notFound();
  }

  return (
    <main id="main" className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Experience", item: `${SITE_URL}/#experience` },
            { "@type": "ListItem", position: 3, name: `${job.role} @ ${job.company}`, item: `${SITE_URL}/experience/${slug}` },
          ],
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
          <div className="flex items-center gap-4">
            <ThemeToggle />
          <Link
            href="/#experience"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Experience
          </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div>
          <ViewTransition name={`experience-${slug}`}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl/none wrap-break-word hyphens-auto text-text-primary leading-tight mb-3">
              {job.role}
            </h1>
          </ViewTransition>
          <p className="font-mono text-sm text-accent tracking-wide mb-8">
            {job.company} · {job.dates}
          </p>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mb-10">
            {detail.summary}
          </p>
        </div>

        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 pb-14 border-b border-border">
            {detail.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl sm:text-3xl text-accent">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {caseStudies[slug] && <CaseStudy study={caseStudies[slug]} />}

        <div className="space-y-12">
          {detail.sections.map((section, i) => (
            <AnimatedSection key={section.heading} delay={0.05 + i * 0.05}>
              <h2 className="font-display font-bold text-xl text-text-primary mb-4">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="text-text-muted text-sm sm:text-base/6 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.15}>
          <div className="mt-20 text-center">
            <Link
              href="/#experience"
              className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-all"
            >
              <ArrowLeft size={15} />
              Back to all experience
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
