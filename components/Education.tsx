"use client";

import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-secondary/3 blur-[110px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-56 h-56 rounded-full bg-accent-light/3 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">05 — Education</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {resume.education.map((edu, i) => (
            <AnimatedSection key={i} delay={(i % 2) * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="card-glow border border-border bg-surface/40 hover:border-accent/30 hover:bg-raised rounded-sm p-7 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-10 h-10 rounded-sm border border-border flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-accent" />
                  </div>
                  <span className="font-mono text-[10px] text-text-faint tracking-widest uppercase text-right leading-relaxed">
                    {edu.dates}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-text-primary leading-tight mb-1">
                  {edu.school}
                </h3>
                <p className="font-mono text-xs text-accent mb-1">{edu.degree}</p>
                <p className="font-mono text-[10px] text-text-faint mb-4">{edu.location}</p>

                {/* GPA */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-text-faint tracking-widest uppercase">GPA</span>
                  <span className="font-display font-bold text-lg text-text-primary">{edu.gpa}</span>
                  {i === 1 && (
                    <span className="tag-chip bg-tertiary/10 text-tertiary border border-tertiary/20">/ 10</span>
                  )}
                </div>

                {/* Coursework */}
                {"coursework" in edu && edu.coursework && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-3">
                      Coursework
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="tag-chip bg-border/50 text-text-muted border border-border"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
