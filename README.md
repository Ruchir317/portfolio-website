# ruchirjadhav.dev

My personal portfolio and writing site: a fully static Next.js app that shows my experience, projects and publication, with long-form case studies, a blog and a command palette. Live at **[ruchirjadhav.dev](https://ruchirjadhav.dev)**.

![The home page](.github/assets/hero.png)

## What's in it

- **Case studies.** Every project and role has its own page with an architecture diagram, the key decisions with the reasoning and measured result, and the full write-up. Page transitions use React's `<ViewTransition>`, so a title glides from its card to the page.
- **⌘K command palette.** Press `⌘K` or `Ctrl+K` anywhere to jump to a section, project, post or link. It is a native `<dialog>`, so focus trapping and `Esc` come from the browser.
- **Writing.** MDX posts in `content/posts`, validated at build time with [Velite](https://velite.js.org/): a missing title or a malformed date fails the build instead of shipping. Posts get an RSS feed, structured data and their own share image.
- **Built to be found.** Per-page metadata and canonical URLs, JSON-LD (Person, BlogPosting, breadcrumbs, and the published paper as a ScholarlyArticle), a sitemap, generated Open Graph images for every project, role and post, and an `llms.txt`.
- **Accessible by default.** Skip link, visible focus rings, semantic landmarks, `prefers-reduced-motion` respected, and text contrast checked against every surface.

![The command palette](.github/assets/palette.png)

## Stack

Next.js 16 (App Router, fully static) · React 19 · TypeScript · Tailwind CSS 3 · [motion](https://motion.dev/) · MDX via Velite · deployed on Vercel.

## Quality gates

Every push runs GitHub Actions: ESLint, `tsc`, a production build, a dependency-free smoke test of the built pages, and Lighthouse CI. Accessibility and SEO must score at least 0.95 or the build fails; performance and best practices warn.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static build, also runs Velite
npm run lint
```

After editing a post while the dev server is running, run `npx velite build` to refresh the content layer.

## How it's organised

| Path | What lives there |
| --- | --- |
| `data/resume.ts` | The single source of truth for content. Components only render it |
| `data/projectDetails.ts`, `experienceDetails.ts`, `caseStudies.ts` | The long-form case-study content |
| `content/posts/` | MDX posts with typed frontmatter (`velite.config.ts`) |
| `lib/palette.ts` | The one place colours are defined; Tailwind, the stylesheet and every generated image import it |
| `components/` | Page sections and the command palette |
| `app/` | Routes: home, `projects/[slug]`, `experience/[slug]`, `writing`, feed, sitemap, share images |
| `scripts/smoke.mjs` | The smoke test CI runs against the built site |

## Related projects

- [carla-v2x-intersection](https://github.com/Ruchir317/carla-v2x-intersection): a traffic-light-free junction controller for the CARLA simulator.
- [claim-verifier](https://github.com/Ruchir317/claim-verifier): fact-checks a claim with web search and Gemini.
