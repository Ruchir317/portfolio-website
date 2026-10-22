"use client";

import { motion, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import { WRITING_ENABLED } from "@/data/site";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  ...(WRITING_ENABLED ? [{ label: "Writing", href: "/writing" }] : []),
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    return scrollY.on("change", (v) => {
      setScrolled(v > 60);
      if (v < 200) setActiveSection(""); // back at the hero: nothing highlighted
    });
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { href } of navLinks) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background that fades in once the page scrolls: only opacity animates, so it stays cheap. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 border-b border-border bg-bg/90 backdrop-blur-md transition-opacity duration-200 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="Back to top" className="font-display font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors">
          RJ<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.slice(1) ? "true" : undefined}
              className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                activeSection === link.href.slice(1) ? "text-accent" : "text-text-muted hover:text-accent"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open command palette"
            className="font-mono text-[10px] tracking-widest text-text-muted hover:text-accent border border-border rounded-xs px-2 py-1 transition-colors"
          >
            ⌘K
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile theme toggle and hamburger */}
        <div className="lg:hidden flex items-center gap-1">
        <ThemeToggle />
        <button
          className="flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {/* Line pitch is 1px + the 6px gap = 7px, so the outer lines move 7px to meet in the middle. */}
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="block w-5 h-px bg-text-primary origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="block w-5 h-px bg-text-primary"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="block w-5 h-px bg-text-primary origin-center"
          />
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        inert={!menuOpen}
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        className="absolute left-0 right-0 top-full lg:hidden border-t border-border bg-bg/95 backdrop-blur-md"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === link.href.slice(1) ? "true" : undefined}
              className={`font-mono text-xs tracking-widest uppercase transition-colors py-1 ${
                activeSection === link.href.slice(1) ? "text-accent" : "text-text-muted hover:text-accent"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
