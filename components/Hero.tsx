"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from "lucide-react";
import { resume } from "@/data/resume";

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/6 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-accent/4 blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#14B8A6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Location badge */}
          <motion.div variants={stagger.item} className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-xs text-text-muted tracking-widest uppercase flex items-center gap-1.5">
              <MapPin size={11} className="text-secondary" />
              {resume.contact.location}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={stagger.item}
            className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tight mb-6"
          >
            <span className="gradient-text">Ruchir</span>
            <br />
            <span className="gradient-text">Jadhav</span>
            <span className="text-accent">.</span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            variants={stagger.item}
            className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase mb-6 cursor-blink"
          >
            SWE @ Easley Dunn · MS CS @ USC
          </motion.p>

          {/* Sub headline */}
          <motion.p
            variants={stagger.item}
            className="text-text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12"
          >
            Building resilient cloud systems and distributed backends.
            Passionate about{" "}
            <span className="text-text-primary font-medium">AI/ML</span>,{" "}
            <span className="text-text-primary font-medium">systems engineering</span>, and{" "}
            <span className="text-text-primary font-medium">end-to-end software</span>.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={stagger.item}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-6 py-3 rounded-sm text-sm tracking-wide overflow-hidden transition-all hover:bg-accent-light"
            >
              <span className="relative z-10">Get in touch</span>
              <Mail size={15} className="relative z-10" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-text-primary hover:border-accent/40 font-display font-semibold px-6 py-3 rounded-sm text-sm tracking-wide transition-all"
            >
              View work
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-text-muted hover:text-secondary hover:border-secondary/40 font-display font-semibold px-6 py-3 rounded-sm text-sm tracking-wide transition-all"
            >
              Resume
              <Download size={15} />
            </a>

            <div className="flex items-center gap-3 ml-2">
              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-border rounded-sm text-text-muted hover:text-accent hover:border-accent/50 transition-all"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-border rounded-sm text-text-muted hover:text-secondary hover:border-secondary/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={stagger.item}
            className="mt-20 pt-8 border-t border-border grid grid-cols-3 sm:grid-cols-3 gap-8 max-w-sm"
          >
            {[
              { value: "2+", label: "Years exp." },
              { value: "6", label: "Projects" },
              { value: "3", label: "Companies" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl text-text-primary">{stat.value}</div>
                <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] text-text-faint tracking-widest uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-text-faint" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
