"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Download } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import ResumeButton from "./ResumeButton";
import { resume } from "@/data/resume";
import { AVAILABILITY } from "@/data/site";

// Headline proof for the hero: the metric these projects already show on their cards.
const proofSlugs = ["factual", "duckdb-materialized-views", "carla-v2x-intersection"];
const proof = resume.projects.filter((p) => proofSlugs.includes(p.slug));

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
            <span className="gradient-text">Ruchir</span>
            <br />
            <span className="gradient-text">Jadhav</span>
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
            className="hero-rise text-text-muted text-lg sm:text-xl/7 leading-relaxed max-w-2xl mb-12"
          >
            I build backend and cloud systems: a Go backfill service for Amazon EKS Metrics, a Node.js and
            PostgreSQL backend for a React Native app, and research in multimodal ML.
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
              className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]"
            >
              View work
            </a>

            <ResumeButton className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-secondary hover:border-secondary/40 font-display font-semibold px-6 py-3 rounded-xs text-sm tracking-wide transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]">
              Resume
              <Download size={15} />
            </ResumeButton>

            <div className="flex items-center gap-3 ml-2">
              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-border rounded-xs text-text-muted hover:text-accent hover:border-accent/50 transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-border rounded-xs text-text-muted hover:text-secondary hover:border-secondary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{ animationDelay: "0.3s" }}
            className="hero-rise mt-20 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl"
          >
            {proof.map((p) => (
              <div key={p.slug}>
                <div className="font-display font-bold text-2xl text-text-primary">{p.metric.value}</div>
                <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-0.5">{p.metric.label}</div>
              </div>
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
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="ml-3 text-text-muted tracking-wide">ruchir ~ status</span>
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
