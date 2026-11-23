"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Mail, MapPin, FileText, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import ResumeButton from "./ResumeButton";
import { resume } from "@/data/resume";
import { AVAILABILITY } from "@/data/site";

// Headline proof for the hero: the metric these projects already show on their cards.
const factual = resume.projects.find((p) => p.slug === "factual")!;
const proof = [
  { href: "/experience/easley-dunn-safetynet", value: "67 of 119", label: "merged PRs on SafetyNet", name: "SafetyNet backend" },
  { href: "/experience/aws-eks-metrics-backfill", value: "Zero", label: "data loss on recovery", name: "Amazon EKS Metrics backfill" },
  { href: `/projects/${factual.slug}`, ...factual.metric, name: factual.name },
];

const sde = (role: string) => role.replace("Software Development Engineer", "SDE");

const status = [
  { key: "now", value: `${sde(resume.experience[0].role)}, ${resume.experience[0].company}` },
  { key: "before", value: `${sde(resume.experience[1].role)}, AWS (EKS Metrics)` },
  { key: "published", value: "IEEE ICAST 2022" },
  { key: "education", value: "MS CS, USC (Dec 2025)" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/6 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-20 xl:grid xl:grid-cols-[1fr_20rem] xl:items-center xl:gap-12">
        {/* The text block enters with CSS (.hero-rise, 60 ms steps), not motion, so it is visible in the server HTML. */}
        <div className="max-w-4xl">
          {/* Location badge */}
          <div className="hero-rise flex items-center gap-2 mb-8">
            <span className="font-mono text-xs text-text-muted tracking-widest uppercase flex items-center gap-1.5">
              <MapPin size={11} className="text-secondary" />
              {resume.contact.location}
            </span>
          </div>

          {/* Name */}
          <h1 style={{ animationDelay: "0.06s" }} className="hero-rise font-display font-extrabold text-[clamp(2.5rem,13.5vw,3.75rem)] sm:text-7xl/none md:text-8xl/none lg:text-[6.5rem]/none leading-[0.9] tracking-tight mb-6">
            Ruchir
            <br />
            Jadhav
            <span className="text-accent">.</span>
          </h1>

          {/* Headline */}
          <p
            style={{ animationDelay: "0.12s" }}
            className="hero-rise font-mono text-xs sm:text-sm text-accent tracking-widest uppercase mb-6 cursor-blink"
          >
            SDE @ Easley Dunn · MS CS, USC
          </p>

          {/* Sub headline */}
          <p
            style={{ animationDelay: "0.18s" }}
            className="hero-rise text-text-muted text-lg sm:text-xl/7 leading-relaxed max-w-2xl mb-6 xl:mb-12"
          >
            I build backend and cloud systems: a Go backfill service for Amazon EKS Metrics, a Node.js and
            PostgreSQL backend for a React Native app, and research in multimodal ML.
          </p>

          {/* Availability: the status card below carries it on wide screens; everywhere else it sits here. */}
          <p
            style={{ animationDelay: "0.21s" }}
            className="hero-rise xl:hidden flex items-center gap-2 font-mono text-xs text-text-primary mb-8"
          >
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent shrink-0" />
            {AVAILABILITY.headline.replace(/\.$/, "")} · {AVAILABILITY.status}
          </p>

          {/* CTA row */}
          <div
            style={{ animationDelay: "0.24s" }}
            className="hero-rise flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide overflow-hidden transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97] hover:bg-accent-light"
            >
              <span className="relative z-10">Get in touch</span>
              <Mail size={15} className="relative z-10" />
            </a>

            <a
              href="#projects"
              className="hidden sm:inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]"
            >
              View work
            </a>

            <ResumeButton className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-secondary hover:border-secondary/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]">
              Resume
              <FileText size={15} aria-hidden="true" />
            </ResumeButton>

            <div className="hidden sm:flex items-center gap-3 ml-2">
              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-border rounded-xs text-text-muted hover:text-accent hover:border-accent/50 transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-border rounded-xs text-text-muted hover:text-secondary hover:border-secondary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{ animationDelay: "0.3s" }}
            className="hero-rise mt-20 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl"
          >
            {proof.map((p) => (
              <Link key={p.href} href={p.href} className="group block">
                <div className="font-display font-bold text-2xl text-text-primary">{p.value}</div>
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mt-0.5">{p.label}</div>
                <div className="mt-1.5 font-mono text-xs text-accent group-hover:text-accent-light transition-colors">
                  {p.name}
                  <ArrowUpRight size={12} aria-hidden="true" className="inline-block ml-1 align-text-bottom" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Status card (wide screens only) */}
        <motion.aside
          aria-label="Current status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="hidden xl:block card-glow border border-border bg-surface/60 backdrop-blur-xs rounded-xs font-mono text-xs"
        >
          <div className="border-b border-border px-4 py-3">
            <span className="text-text-muted tracking-wide">ruchir ~ status</span>
          </div>
          <dl className="space-y-4 px-4 py-5 leading-relaxed">
            {status.map(({ key, value }) => (
              <div key={key}>
                <dt className="text-accent">$ {key}</dt>
                <dd className="text-text-muted pl-3">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-accent">$ status</dt>
              <dd className="pl-3 flex items-center gap-2 text-text-primary">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {AVAILABILITY.status}
              </dd>
            </div>
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
