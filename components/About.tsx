"use client";

import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-tertiary/3 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-label">01 — About</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Text column */}
          <div className="space-y-5">
            {resume.about.map((paragraph, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <p className="text-text-muted leading-relaxed text-base sm:text-lg">
                  {paragraph}
                </p>
              </AnimatedSection>
            ))}
          </div>

          {/* Info card */}
          <AnimatedSection delay={0.2}>
            <div className="card-glow border border-border rounded-sm p-6 bg-surface/40 backdrop-blur-sm sticky top-24 space-y-6">
              <div>
                <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-3">Contact</p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${resume.contact.email}`}
                    className="block font-mono text-xs text-text-muted hover:text-accent transition-colors"
                  >
                    {resume.contact.email}
                  </a>
                  <p className="font-mono text-xs text-text-muted">{resume.contact.phone}</p>
                  <p className="font-mono text-xs text-text-muted">{resume.contact.location}</p>
                </div>
              </div>

              <hr className="border-border" />

              <div>
                <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-3">Links</p>
                <div className="space-y-2">
                  <a
                    href={resume.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-text-muted hover:text-accent transition-colors group"
                  >
                    <span>GitHub</span>
                    <span className="text-text-faint group-hover:text-accent">↗</span>
                  </a>
                  <a
                    href={resume.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-text-muted hover:text-secondary transition-colors group"
                  >
                    <span>LinkedIn</span>
                    <span className="text-text-faint group-hover:text-secondary">↗</span>
                  </a>
                </div>
              </div>

              <hr className="border-border" />

              <div>
                <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-3">Looking for</p>
                <p className="font-mono text-xs text-text-muted leading-relaxed">
                  Graduate SWE roles — backend, cloud, distributed systems, AI/ML.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  <span className="font-mono text-[10px] text-tertiary tracking-widest uppercase">Available 2026</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
