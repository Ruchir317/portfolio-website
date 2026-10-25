import { execSync } from "node:child_process";

// Date of the latest commit that changed the site itself (not CI, docs or dependency bumps), read at build time so it
// never needs hand-editing. Falls back to the latest commit, then to the build date, when history is unavailable.
function latest(paths: string): Date | null {
  try {
    const iso = execSync(`git log -1 --format=%cI -- ${paths}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {}
  return null;
}

const read = () => latest("app components content data lib public") ?? latest("") ?? new Date();

export const lastUpdated = read();
