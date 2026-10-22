import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="section-label">Education</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {resume.education.map((edu, i) => (
            <AnimatedSection key={i} delay={(i % 2) * 0.1}>
              <div className="card-glow border border-border bg-surface/40 hover:border-accent/30 hover:bg-raised rounded-xs p-7 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xs border border-border flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-accent" />
                  </div>
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase text-right leading-relaxed">
                    {edu.dates}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-text-primary leading-tight mb-1">
                  {edu.school}
                </h3>
                <p className="font-mono text-xs text-accent mb-1">{edu.degree}</p>
                <p className="font-mono text-[10px] text-text-muted mb-4">{edu.location}</p>

                {/* Coursework */}
                {"coursework" in edu && edu.coursework && (
                  <div className="pt-4 border-t border-border">
                    <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
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
