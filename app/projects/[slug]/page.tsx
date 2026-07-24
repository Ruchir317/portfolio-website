import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Github, FileText } from "lucide-react";
import { resume } from "@/data/resume";
import { projectDetails } from "@/data/projectDetails";
import AnimatedSection from "@/components/AnimatedSection";

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = resume.projects.find((p) => p.slug === slug);
  const detail = projectDetails[slug];
  if (!project || !detail) return {};

  return {
    title: `${project.name} — Ruchir Jadhav`,
    description: detail.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = resume.projects.find((p) => p.slug === slug);
  const detail = projectDetails[slug];

  if (!project || !detail) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            RJ<span className="text-accent">.</span>
          </Link>
          <Link
            href="/#projects"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <AnimatedSection>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-text-primary leading-tight mb-6">
            {project.name}
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mb-8">
            {detail.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-10">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="tag-chip bg-border/60 text-text-muted border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>

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
                    className="text-text-muted text-sm sm:text-base leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.1}>
          <div className="mt-16 pt-8 border-t border-border">
            {detail.publication && (
              <div className="mb-6 pb-6 border-b border-border/50">
                <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-2">
                  Published
                </p>
                <p className="text-text-muted text-sm leading-relaxed max-w-2xl mb-3">
                  {detail.publication.citation}
                </p>
                <a
                  href={detail.publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:text-accent-light tracking-wider uppercase transition-colors"
                >
                  <FileText size={14} />
                  View Paper
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {detail.team && (
                <p className="font-mono text-xs text-text-faint leading-relaxed max-w-md">
                  {detail.team}
                </p>
              )}
              {project.links.length > 0 && (
                <div className="flex items-center gap-4 shrink-0">
                  {project.links.map((link, k) => (
                    <a
                      key={k}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-accent hover:text-accent-light tracking-wider uppercase transition-colors"
                    >
                      <Github size={14} />
                      View Source
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-20 text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-sm text-sm tracking-wide transition-all"
            >
              <ArrowLeft size={15} />
              Back to all projects
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
