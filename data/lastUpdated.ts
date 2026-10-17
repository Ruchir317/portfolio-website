import { execSync } from "node:child_process";

// Date of the latest commit, read at build time so it never needs hand-editing.
// Falls back to the build date when git history is unavailable.
function read(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {}
  return new Date();
}

export const lastUpdated = read();
