import { posts } from "@/.velite";

// Drafts are visible in dev only; newest first.
export const allPosts = posts
  .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
