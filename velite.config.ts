import { defineConfig, s } from "velite";

// Typed content layer: frontmatter is validated with Zod at build time and exported from .velite.
export default defineConfig({
  root: "content",
  output: { data: ".velite", clean: true },
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/*.mdx",
      schema: s
        .object({
          title: s.string().max(100),
          summary: s.string().max(200),
          date: s.isodate(),
          tags: s.array(s.string()).default([]),
          draft: s.boolean().default(false),
          slug: s.path(),
          metadata: s.metadata(),
          code: s.mdx(),
        })
        .transform((p) => ({ ...p, slug: p.slug.replace(/^posts\//, "") })),
    },
  },
});
