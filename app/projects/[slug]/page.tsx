import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import DetailEnd from "@/components/DetailEnd";
import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { resume } from "@/data/resume";
import { projectDetails } from "@/data/projectDetails";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/data/site";
import AnimatedSection from "@/components/AnimatedSection";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

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

  const title = `${project.name} — Ruchir Jadhav`;
  // A published paper should be findable by its title and venue.
  const description = detail.publication
    ? `Peer-reviewed at ${detail.publication.badge}: "${detail.publication.title}" by ${detail.publication.authors.join(", ")}. ${detail.summary}`
    : detail.summary;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title, description, url: `/projects/${slug}`, type: "article" },
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

  const slugs = Object.keys(projectDetails);
  const nextSlug = slugs[(slugs.indexOf(slug) + 1) % slugs.length];
  const nextProject = resume.projects.find((p) => p.slug === nextSlug);

  return (
    <main id="main" className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
            { "@type": "ListItem", position: 3, name: project.name, item: `${SITE_URL}/projects/${slug}` },
          ],
        }}
      />
      {detail.publication && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: detail.publication.title,
            author: detail.publication.authors.map((name) => ({ "@type": "Person", name })),
            datePublished: detail.publication.datePublished,
            url: detail.publication.url,
            sameAs: detail.publication.scholarUrl,
          }}
        />
      )}
      <SiteHeader backHref="/#projects" backLabel="Back to Projects" />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div>
          <ViewTransition name={`project-${slug}`}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl/none wrap-break-word hyphens-auto text-text-primary leading-tight mb-6">
              {project.name}
            </h1>
          </ViewTransition>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mb-6">
            {detail.summary}
          </p>
          {detail.team && (
            <p className="text-text-muted text-base leading-relaxed max-w-2xl mb-8">{detail.team}</p>
          )}

          {detail.publication && (
            <a
              href={detail.publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 font-mono text-xs tracking-wider uppercase text-secondary hover:text-text-primary transition-colors"
            >
              <FileText size={14} />
              Peer-reviewed · {detail.publication.badge}
              <ExternalLink size={12} />
            </a>
          )}

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
        </div>

        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 pb-14 border-b border-border">
            {detail.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl sm:text-3xl text-accent">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mt-1">
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
              <div className="space-y-3 max-w-[70ch]">
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

        <AnimatedSection delay={0.1}>
          <div className="mt-16 pt-8 border-t border-border">
            {detail.publication && (
              <div className="mb-6 pb-6 border-b border-border/50">
                <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
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
                {detail.publication.scholarUrl && (
                  <a
                    href={detail.publication.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-5 inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent tracking-wider uppercase transition-colors"
                  >
                    Semantic Scholar
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {project.links.length > 0 && (
                <div className="flex items-center gap-4 shrink-0">
                  {project.links.map((link, k) => (
                    <a
                      key={k}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 min-h-11 font-mono text-xs text-accent hover:text-accent-light tracking-wider uppercase transition-colors"
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

        <DetailEnd
          next={nextProject && nextProject.slug !== slug ? { href: `/projects/${nextProject.slug}`, title: nextProject.name, noun: "project" } : undefined}
          backHref="/#projects"
          backLabel="Back to all projects"
        />
      </div>
    </main>
  );
}
