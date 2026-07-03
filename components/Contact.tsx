"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { resume } from "@/data/resume";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Large background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-label">06 — Contact</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <AnimatedSection>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-text-primary leading-tight mb-6">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="accent-gradient-text">together.</span>
            </h2>
            <p className="text-text-muted text-base leading-relaxed max-w-md">
              I&apos;m actively looking for graduate SWE roles in cloud, backend, distributed systems, and AI/ML.
              If you have an opportunity or just want to connect — reach out.
            </p>
          </AnimatedSection>

          {/* Right: contact cards */}
          <AnimatedSection delay={0.15}>
            <div className="space-y-3">
              <a
                href={`mailto:${resume.contact.email}`}
                className="group flex items-center gap-4 border border-border bg-surface/40 hover:border-accent/50 hover:bg-surface/70 rounded-sm p-5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-sm border border-border group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-colors">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-0.5">Email</p>
                  <p className="text-text-primary text-sm">{resume.contact.email}</p>
                </div>
                <span className="ml-auto text-text-faint group-hover:text-accent transition-colors">↗</span>
              </a>

              <a
                href={`tel:${resume.contact.phone}`}
                className="group flex items-center gap-4 border border-border bg-surface/40 hover:border-teal/50 hover:bg-surface/70 rounded-sm p-5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-sm border border-border group-hover:border-teal/40 flex items-center justify-center shrink-0 transition-colors">
                  <Phone size={16} className="text-teal" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="text-text-primary text-sm">{resume.contact.phone}</p>
                </div>
              </a>

              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-border bg-surface/40 hover:border-accent/50 hover:bg-surface/70 rounded-sm p-5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-sm border border-border group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-colors">
                  <Github size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-0.5">GitHub</p>
                  <p className="text-text-primary text-sm">github.com/Ruchir317</p>
                </div>
                <span className="ml-auto text-text-faint group-hover:text-accent transition-colors">↗</span>
              </a>

              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-border bg-surface/40 hover:border-teal/50 hover:bg-surface/70 rounded-sm p-5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-sm border border-border group-hover:border-teal/40 flex items-center justify-center shrink-0 transition-colors">
                  <Linkedin size={16} className="text-text-muted group-hover:text-teal transition-colors" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-text-faint tracking-widest uppercase mb-0.5">LinkedIn</p>
                  <p className="text-text-primary text-sm">linkedin.com/in/ruchirjadhav</p>
                </div>
                <span className="ml-auto text-text-faint group-hover:text-teal transition-colors">↗</span>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <AnimatedSection delay={0.2}>
          <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-display font-bold text-text-faint text-sm">
              Ruchir Jadhav<span className="text-accent">.</span>
            </span>
            <p className="font-mono text-[10px] text-text-faint tracking-wider">
              Built with Next.js · Tailwind · Framer Motion
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
