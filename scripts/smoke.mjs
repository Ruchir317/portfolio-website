// Dependency-free smoke test against a running server: BASE=http://localhost:3100 node scripts/smoke.mjs
const BASE = process.env.BASE || "http://localhost:3100";
const routes = [
  "/",
  "/projects/factual",
  "/experience/aws-eks-metrics-backfill",
  "/writing",
  "/writing/how-this-site-is-built",
  "/sitemap.xml",
  "/robots.txt",
  "/feed.xml",
  "/llms.txt",
];
let failed = false;
const check = (label, ok) => {
  console.log(`${ok ? "PASS" : "FAIL"}: ${label}`);
  if (!ok) failed = true;
};

const pages = {};
for (const route of routes) {
  try {
    const res = await fetch(BASE + route);
    pages[route] = await res.text();
    check(`${route} returns 200`, res.status === 200);
  } catch {
    pages[route] = "";
    check(`${route} is reachable`, false);
  }
}

const home = pages["/"];
check("home has 7 section headings", (home.match(/<h2 class="section-label"/g) || []).length === 7);
check("home has JSON-LD", /<script[^>]*type="application\/ld\+json"/.test(home));
check("home has skip link", home.includes('class="skip-link"'));
check("home hero stats are not zero in server HTML", !/<span>0\+?<\/span>/.test(home));
for (const route of ["/projects/factual", "/experience/aws-eks-metrics-backfill"]) {
  check(`${route} has canonical`, /<link rel="canonical"/.test(pages[route]));
  check(`${route} has og:image`, /property="og:image"/.test(pages[route]));
}
check("sitemap lists /projects/factual", pages["/sitemap.xml"].includes("/projects/factual"));
check("sitemap lists a writing post", pages["/sitemap.xml"].includes("/writing/how-this-site-is-built"));
check("feed has items", pages["/feed.xml"].includes("<item>"));

check("home ships both theme palettes", home.includes(":root[data-theme=\"light\"]") && home.includes("prefers-contrast"));
check("home has the theme toggle", home.includes("theme-toggle"));

// The resume PDF is private: /api/resume serves it after a BotID check (that needs Vercel, so it is checked by
// hand on a deployment). Here, check that the old /resume.pdf link goes to the /resume page and that page is noindex.
const resumeOld = await fetch(BASE + "/resume.pdf", { redirect: "manual" });
check(
  "/resume.pdf redirects to the /resume page",
  [307, 308].includes(resumeOld.status) && (resumeOld.headers.get("location") || "").endsWith("/resume")
);
const resumePage = await (await fetch(BASE + "/resume")).text();
check(
  "/resume page has the open-resume button and is noindex",
  resumePage.includes("Open resume (PDF)") && /name="robots" content="noindex/.test(resumePage)
);

const notFound = await fetch(BASE + "/this-page-does-not-exist");
check("unknown route returns 404", notFound.status === 404);

process.exit(failed ? 1 : 0);
