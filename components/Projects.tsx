"use client";

import { ViewTransition } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

// detailSlugs comes from the server page so the long-form detail text stays out of the client bundle.
export default function Projects({
  detailSlugs,
  publications = {},
}: {
  detailSlugs: string[];
  publications?: Record<string, string>;
}) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full bg-secondary/4 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-accent-light/3 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="section-label">03 — Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {resume.projects.map((project, i) => (
            <AnimatedSection key={i} delay={(i % 2) * 0.07} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="card-glow group relative flex flex-col h-full bg-surface/40 border border-border hover:border-accent/40 hover:bg-raised rounded-sm p-6 transition-colors duration-300"
              >
                {/* Number */}
                <span className="font-display font-extrabold text-5xl text-text-faint/40 absolute top-4 right-5 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Header */}
                <div className="mb-4">
                  <ViewTransition name={`project-${project.slug}`}>
                    <h3 className="font-display font-bold text-lg text-text-primary leading-tight pr-12 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                  </ViewTransition>
                  {publications[project.slug] && (
                    <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-secondary">
                      Published · {publications[project.slug]}
                    </p>
                  )}
                </div>

                {/* Headline metric */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-display font-extrabold text-3xl text-accent">{project.metric.value}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">{project.metric.label}</span>
                </div>

                {/* Bullets: the full list lives on the detail page when there is one */}
                <ul className="space-y-2 mb-6 flex-1">
                  {(detailSlugs.includes(project.slug) ? project.bullets.slice(0, 3) : project.bullets).map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-text-muted text-sm leading-relaxed">
                      <span className="text-accent shrink-0 font-mono mt-0.5">›</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="tag-chip bg-border/60 text-text-muted hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.links.length > 0 || detailSlugs.includes(project.slug)) && (
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    {detailSlugs.includes(project.slug) && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 font-mono text-[10px] text-accent hover:text-accent-light tracking-wider uppercase transition-colors"
                      >
                        View Details
                        <ArrowUpRight size={10} />
                      </Link>
                    )}
                    {project.links.map((link, k) => (
                      <a
                        key={k}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted hover:text-accent tracking-wider uppercase transition-colors"
                      >
                        <Github size={12} />
                        View Source
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
