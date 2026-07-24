"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const skipAnimation = target === null || prefersReducedMotion;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || skipAnimation) return;
    let start: number | null = null;
    let frame: number;
    const duration = 900;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.round(progress * (target as number)));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, skipAnimation, target]);

  return <span ref={ref}>{skipAnimation ? value : `${count}${suffix}`}</span>;
}
