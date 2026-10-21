import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="section-label">About</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl space-y-5">
            {resume.about.map((paragraph, i) => (
              <p key={i} className="text-text-muted leading-relaxed text-base sm:text-lg/7">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
