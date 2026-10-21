"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { resume } from "@/data/resume";
import { allPosts } from "@/data/posts";
import { toggleTheme } from "@/lib/theme";

export const OPEN_PALETTE_EVENT = "open-command-palette";

interface Item {
  id: string;
  group: "Sections" | "Experience" | "Projects" | "Writing" | "Links";
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
  action?: "theme";
}

const sections = ["About", "Experience", "Projects", "Skills", "Education", "Contact"];

const items: Item[] = [
  ...sections.map((s) => ({ id: `s-${s}`, group: "Sections" as const, label: s, href: `/#${s.toLowerCase()}` })),
  ...resume.experience.map((e) => ({
    id: `e-${e.slug}`,
    group: "Experience" as const,
    label: e.company,
    hint: e.role,
    href: `/experience/${e.slug}`,
  })),
  ...resume.projects.map((p) => ({
    id: `p-${p.slug}`,
    group: "Projects" as const,
    label: p.name,
    hint: p.tech_stack.slice(0, 3).join(" · "),
    href: `/projects/${p.slug}`,
  })),
  ...allPosts.map((post) => ({
    id: `w-${post.slug}`,
    group: "Writing" as const,
    label: post.title,
    hint: post.tags.slice(0, 3).join(" · "),
    href: `/writing/${post.slug}`,
  })),
  { id: "a-theme", group: "Links", label: "Switch light / dark theme", href: "#", action: "theme" },
  { id: "l-resume", group: "Links", label: "Resume (PDF)", href: "/resume.pdf", external: true },
  { id: "l-github", group: "Links", label: "GitHub", href: resume.links.github, external: true },
  { id: "l-scholar", group: "Links", label: "Google Scholar", href: resume.links.scholar, external: true },
  { id: "l-linkedin", group: "Links", label: "LinkedIn", href: resume.links.linkedin, external: true },
  { id: "l-email", group: "Links", label: "Email", hint: resume.contact.email, href: `mailto:${resume.contact.email}`, external: true },
];

function matches(item: Item, q: string) {
  const hay = `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
}

export default function CommandPalette({ detailSlugs }: { detailSlugs: string[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(
    () =>
      items
        // only slugs that have a detail page are linkable
        .filter((i) => i.group === "Sections" || i.group === "Writing" || i.group === "Links" || detailSlugs.includes(i.id.slice(2)))
        .filter((i) => matches(i, query)),
    [query, detailSlugs]
  );

  const open = () => {
    setQuery("");
    setActive(0);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    close();
    if (item.action === "theme") return toggleTheme();
    if (item.external) window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
    else router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClick={(e) => e.target === dialogRef.current && close()}
      className="palette m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-md border border-border bg-surface p-0 text-text-primary shadow-2xl"
    >
      <div className="border-b border-border px-4 py-3">
        <input
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `opt-${results[active].id}` : undefined}
          aria-label="Search sections, projects and links"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to…"
          className="w-full bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted outline-hidden"
        />
      </div>
      <ul id="palette-list" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
        {results.length === 0 && <li className="px-4 py-6 text-center font-mono text-xs text-text-muted">No matches</li>}
        {results.map((item, i) => {
          const header = i === 0 || results[i - 1].group !== item.group;
          return (
            <li key={item.id} role="presentation">
              {header && (
                <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">{item.group}</div>
              )}
              <div
                id={`opt-${item.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(item)}
                className={`mx-2 flex cursor-pointer items-baseline justify-between gap-4 rounded-xs px-3 py-2 text-sm ${
                  i === active ? "bg-raised text-accent" : "text-text-primary"
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.hint && <span className="hidden truncate font-mono text-[11px] text-text-muted sm:block">{item.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-text-muted">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>esc close</span>
      </div>
    </dialog>
  );
}
