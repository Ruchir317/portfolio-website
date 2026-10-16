// Dependency-free smoke test against a running server: BASE=http://localhost:3100 node scripts/smoke.mjs
const BASE = process.env.BASE || "http://localhost:3100";
const routes = ["/", "/projects/factual", "/experience/aws-eks-metrics-backfill", "/sitemap.xml", "/robots.txt"];
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
check("home has 6 section headings", (home.match(/<h2 class="section-label"/g) || []).length === 6);
check("home has JSON-LD", /<script[^>]*type="application\/ld\+json"/.test(home));
check("home has skip link", home.includes('class="skip-link"'));
for (const route of ["/projects/factual", "/experience/aws-eks-metrics-backfill"]) {
  check(`${route} has canonical`, /<link rel="canonical"/.test(pages[route]));
  check(`${route} has og:image`, /property="og:image"/.test(pages[route]));
}
check("sitemap lists /projects/factual", pages["/sitemap.xml"].includes("/projects/factual"));

process.exit(failed ? 1 : 0);
