import { createHmac, timingSafeEqual } from "node:crypto";

// After the BotID check passes, /api/resume hands out a link to the PDF that works for this long. It is long
// enough to save the file from the viewer, which may fetch it again. The link is a real URL (not a blob:), so the
// browser saves the file under the name the server sends.
export const LINK_TTL_MS = 30 * 60_000;

const sign = (secret: string, exp: number) =>
  createHmac("sha256", `resume-link:${secret}`).update(String(exp)).digest("hex");

export function makeLink(secret: string, now = Date.now()): string {
  const exp = now + LINK_TTL_MS;
  return `/api/resume/file?exp=${exp}&sig=${sign(secret, exp)}`;
}

// `exp` and `sig` come straight from the query string, so check their shape before using them.
export function isValidLink(secret: string, exp: string | null, sig: string | null, now = Date.now()): boolean {
  if (!exp || !sig || !/^\d{1,15}$/.test(exp) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  if (Number(exp) < now) return false;
  return timingSafeEqual(Buffer.from(sig), Buffer.from(sign(secret, Number(exp))));
}
