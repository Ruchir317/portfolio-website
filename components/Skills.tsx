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
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-accent/3 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-tertiary/3 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="section-label">Skills</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.key} delay={(i % 2) * 0.08}>
              <div className="card-glow border border-border bg-surface/30 rounded-sm p-5 h-full hover:border-accent/20 hover:bg-raised transition-colors">
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-4">{cat.label}</p>
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
                <ul className="mt-4 pt-3 border-t border-border space-y-1.5">
                  {resume.skillContext[cat.key].map((line) => (
                    <li key={line} className="flex gap-2 text-text-muted text-xs leading-relaxed">
                      <span className="text-accent shrink-0 font-mono">›</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
