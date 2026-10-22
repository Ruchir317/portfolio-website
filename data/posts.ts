import { posts } from "@/.velite";
import { WRITING_ENABLED } from "@/data/site";

// Drafts are visible in dev only; newest first. Empty while the blog is switched off (WRITING_ENABLED in data/site.ts),
// which hides every place that lists or links posts.
export const allPosts = WRITING_ENABLED
  ? posts.filter((p) => !p.draft || process.env.NODE_ENV !== "production").sort((a, b) => b.date.localeCompare(a.date))
  : [];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
