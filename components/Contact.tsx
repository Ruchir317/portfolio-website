import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { AVAILABILITY } from "@/data/site";
import { ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

const links = [
  { label: "Email", text: resume.contact.email, href: `mailto:${resume.contact.email}`, Icon: Mail, external: false },
  { label: "GitHub", text: "github.com/Ruchir317", href: resume.links.github, Icon: Github, external: true },
  { label: "LinkedIn", text: "linkedin.com/in/ruchirjadhav", href: resume.links.linkedin, Icon: Linkedin, external: true },
  { label: "Google Scholar", text: "Published research", href: resume.links.scholar, Icon: GraduationCap, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Large background accent */}

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <AnimatedSection>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl/none text-text-primary leading-tight mb-6">
              {AVAILABILITY.headline}
            </h2>
            <p className="text-text-muted text-base leading-relaxed max-w-md">
              Cloud, backend, distributed systems and AI/ML. Email is the fastest way to reach me.
            </p>
          </AnimatedSection>

          {/* Right: contact cards */}
          <AnimatedSection delay={0.15}>
            <div className="space-y-3">
              {links.map(({ label, text, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-glow group flex items-center gap-4 border border-border bg-surface/40 hover:border-accent/50 hover:bg-raised rounded-xs p-5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xs border border-border group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={16} className={external ? "text-text-muted group-hover:text-accent transition-colors" : "text-accent"} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-0.5">{label}</p>
                    <p className="text-text-primary text-sm">{text}</p>
                  </div>
                  {external && (
                    <ArrowUpRight size={16} aria-hidden="true" className="ml-auto shrink-0 text-text-muted group-hover:text-accent transition-colors" />
                  )}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
