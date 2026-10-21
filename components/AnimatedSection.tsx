"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Reveal on scroll: a short rise with a fade. The full transform string (not the x/y shorthands) lets the
// browser animate it off the main thread, and delays are capped so a long list never feels slow.
const hidden = { opacity: 0, transform: "translateY(12px)" };
const shown = { opacity: 1, transform: "translateY(0px)" };

export default function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? shown : hidden}
      transition={{ duration: 0.35, delay: Math.min(delay, 0.12), ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
