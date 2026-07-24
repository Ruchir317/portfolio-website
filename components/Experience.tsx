"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { experienceDetails } from "@/data/experienceDetails";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      {/* Subtle ambient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/4 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-label">02 — Experience</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="space-y-0">
          {resume.experience.map((job, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group relative grid md:grid-cols-[200px_1fr] gap-0 md:gap-10">
                {/* Left: metadata */}
                <div className="md:pt-1 pb-2 md:pb-0">
                  <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-2">{job.dates}</p>
                  <div className="hidden md:block w-px h-full absolute left-[188px] top-0 bg-border group-last:hidden" />
                </div>

                {/* Right: content card */}
                <div className={`relative pb-14 ${i < resume.experience.length - 1 ? "border-b border-border md:border-none" : ""}`}>
                  {/* Dot on timeline (desktop) */}
                  <div className="hidden md:block absolute -left-[49px] top-1.5 w-2 h-2 rounded-full border-2 border-accent bg-bg" />

                  <div className="bg-surface/30 border border-border hover:border-accent/30 rounded-sm p-6 md:p-8 transition-all duration-300 group-hover:bg-surface/60">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                      <div>
                        <h3 className="font-display font-bold text-xl text-text-primary">{job.role}</h3>
                        <p className="font-mono text-sm text-accent mt-0.5">{job.company}</p>
                      </div>
                      <span className="font-mono text-[10px] text-text-faint tracking-widest uppercase whitespace-nowrap mt-1 sm:mt-0 shrink-0 md:hidden">
                        {job.dates}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                          <span className="text-accent shrink-0 mt-[3px] font-mono">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {experienceDetails[job.slug] && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <Link
                          href={`/experience/${job.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent hover:text-accent-light tracking-wider uppercase transition-colors"
                        >
                          View Details
                          <ArrowUpRight size={10} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
