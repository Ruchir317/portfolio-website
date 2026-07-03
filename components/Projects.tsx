"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full bg-teal/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-label">03 — Projects</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {resume.projects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative flex flex-col h-full bg-surface/40 border border-border hover:border-accent/40 rounded-sm p-6 transition-colors duration-300"
              >
                {/* Number */}
                <span className="font-display font-extrabold text-5xl text-text-faint/40 absolute top-4 right-5 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-text-primary leading-tight pr-12 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-6 flex-1">
                  {project.bullets.map((bullet, j) => (
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
                {project.links.length > 0 && (
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
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
