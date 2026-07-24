"use client";

import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";

const categories = [
  {
    label: "Languages",
    key: "languages" as const,
    color: "text-accent bg-accent/10 border-accent/20",
  },
  {
    label: "Frameworks & Libraries",
    key: "frameworks_libraries" as const,
    color: "text-secondary bg-secondary/10 border-secondary/20",
  },
  {
    label: "Databases",
    key: "databases" as const,
    color: "text-tertiary bg-tertiary/10 border-tertiary/20",
  },
  {
    label: "Tools, Cloud & DevOps",
    key: "tools_cloud_devops" as const,
    color: "text-accent-light bg-accent-light/10 border-accent-light/20",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-accent/3 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-tertiary/3 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-label">04 — Skills</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.key} delay={i * 0.08}>
              <div className="card-glow border border-border bg-surface/30 rounded-sm p-5 h-full hover:border-accent/20 hover:bg-raised transition-colors">
                <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-4">{cat.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills[cat.key].map((skill) => (
                    <span
                      key={skill}
                      className={`tag-chip border ${cat.color} transition-all`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
