"use client";

import { useState } from "react";
import { openResume } from "@/lib/resume";

const messages = {
  blocked: "Could not confirm you are a person. Please email me for a copy.",
  failed: "The resume is not available right now. Please email me for a copy.",
} as const;

// The resume is not a plain link (see lib/resume.ts), so every "Resume" control on the site is this button.
export default function ResumeButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const [state, setState] = useState<"idle" | "loading" | "blocked" | "failed">("idle");

  async function onClick() {
    if (state === "loading") return;
    setState("loading");
    const result = await openResume();
    setState(result === "opened" ? "idle" : result);
  }

  return (
    <>
      <button type="button" onClick={onClick} aria-busy={state === "loading"} className={className}>
        {children}
      </button>
      <span role="status" className={state === "blocked" || state === "failed" ? "font-mono text-xs text-text-muted" : "sr-only"}>
        {state === "blocked" || state === "failed" ? messages[state] : ""}
      </span>
    </>
  );
}
