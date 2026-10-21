import { ArrowDown, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import type { CaseStudy as CaseStudyData } from "@/data/caseStudies";

export default function CaseStudy({ study }: { study: CaseStudyData }) {
  const n = study.steps.length;
  return (
    <div className="mb-14 pb-14 border-b border-border space-y-14">
      <AnimatedSection>
        <h2 className="font-display font-bold text-xl text-text-primary mb-2">Architecture</h2>
        <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-6">
          {study.diagramTitle}
        </p>
        <ol
          className="grid gap-3 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
          style={{ "--n": n } as React.CSSProperties}
        >
          {study.steps.map((step, i) => (
            <li key={step.label} className="relative">
              <div className="card-glow h-full border border-border bg-surface/40 rounded-xs p-4">
                <span className="font-mono text-[10px] text-accent tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display font-bold text-sm text-text-primary mt-1">{step.label}</p>
                <p className="text-text-muted text-xs leading-relaxed mt-1">{step.detail}</p>
              </div>
              {i < n - 1 && (
                <>
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="hidden lg:block absolute right-[-13px] top-1/2 -translate-y-1/2 text-accent/70"
                  />
                  <ArrowDown size={14} aria-hidden="true" className="lg:hidden mx-auto mt-3 text-accent/70" />
                </>
              )}
            </li>
          ))}
        </ol>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <h2 className="font-display font-bold text-xl text-text-primary mb-6">Key decisions</h2>
        <ol className="space-y-4">
          {study.decisions.map((d, i) => (
            <li key={d.decision} className="card-glow border border-border bg-surface/40 rounded-xs p-5">
              <p className="font-mono text-[10px] text-accent tracking-widest mb-2">
                DECISION {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display font-bold text-base text-text-primary">{d.decision}</p>
              <p className="text-text-muted text-sm leading-relaxed mt-2">{d.why}</p>
              <p className="font-mono text-xs text-secondary mt-3">→ {d.result}</p>
            </li>
          ))}
        </ol>
      </AnimatedSection>
    </div>
  );
}
