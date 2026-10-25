// Run with `npm test`. Node strips the types from the .ts files it imports.
import { test } from "node:test";
import assert from "node:assert/strict";
import { jsonLdString } from "../lib/jsonld.ts";
import { makeLink, isValidLink, LINK_TTL_MS } from "../lib/resumeLink.ts";

const parts = (link) => {
  const q = new URL(link, "https://x.test").searchParams;
  return [q.get("exp"), q.get("sig")];
};

test("jsonLdString escapes < so data can never close the script tag", () => {
  const out = jsonLdString({ name: "</script><script>alert(1)</script>" });
  assert.ok(!out.includes("<"));
  assert.equal(JSON.parse(out).name, "</script><script>alert(1)</script>");
});

test("a fresh resume link is accepted", () => {
  const [exp, sig] = parts(makeLink("secret", 1_000));
  assert.ok(isValidLink("secret", exp, sig, 1_000 + LINK_TTL_MS - 1));
});

test("an expired resume link is rejected", () => {
  const [exp, sig] = parts(makeLink("secret", 1_000));
  assert.ok(!isValidLink("secret", exp, sig, 1_000 + LINK_TTL_MS + 1));
});

test("a resume link signed with another secret, or with a changed expiry, is rejected", () => {
  const [exp, sig] = parts(makeLink("secret", 1_000));
  assert.ok(!isValidLink("other", exp, sig, 1_001));
  assert.ok(!isValidLink("secret", String(Number(exp) + 60_000), sig, 1_001));
});

test("malformed or missing resume link parts are rejected", () => {
  const [exp, sig] = parts(makeLink("secret", 1_000));
  for (const [e, s] of [[null, sig], [exp, null], ["abc", sig], [exp, "short"], [exp, sig.toUpperCase()], ["", ""]]) {
    assert.ok(!isValidLink("secret", e, s, 1_001));
  }
});
