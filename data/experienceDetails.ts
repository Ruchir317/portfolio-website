export interface ExperienceDetail {
  summary: string;
  stats: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
}

export const experienceDetails: Record<string, ExperienceDetail> = {
  "aws-eks-metrics-backfill": {
    summary:
      "The Amazon EKS Metrics Service collects and publishes cluster metrics across every AWS region, but had no way to recover data lost during CloudWatch API outages — a real regional outage once cost it about 6 hours of metrics across multiple clusters. I designed and built a four-component backfill system in Go that turns those outages from permanent data loss into a bounded processing delay.",
    stats: [
      { label: "Metric Gap Resolved", value: "6 hrs" },
      { label: "Components", value: "4" },
      { label: "Recovery Offsets", value: "30s / 45s" },
      { label: "Failure Injection Range", value: "0–100%" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The service depends on two CloudWatch APIs — GetMetricData to retrieve cluster metrics, PutLogEvents to publish them — both accessed cross-account via assumed roles. When either API went down, the existing retry logic and circuit breakers eventually exhausted their limits and abandoned the data for good, leaving permanent gaps in monitoring dashboards and making historical trend analysis unreliable.",
          "There was also no way to test any of this: failure handling could only be verified during a real outage, when the stakes were highest and debugging time was shortest.",
        ],
      },
      {
        heading: "Four-component architecture",
        body: [
          "Failure Simulation is the coordination layer: hot-reloadable JSON configuration synced from S3 every minute, with per-log-group failure injection at any rate from 0–100%, used both to simulate outages for testing and to detect real ones — integrated directly into the two API call sites rather than bolted on afterward.",
          "Reprocess recovers failed GetMetricData calls on a 30-second offset from the main processing loop: it tests API availability before retrying, discovers saved files via a hierarchical path structure, and replays them through the existing metrics pipeline so recovered data goes through the same code path as live data.",
          "Republish recovers failed PutLogEvents calls on a 45-second offset, with AWS-specific handling — exponential backoff with jitter, automatic sequence-token extraction and retry on InvalidSequenceTokenException, and batching that respects CloudWatch Logs' 10KB/100-event limits.",
          "S3 Backup adds durability for extended outages: stage-aware buckets (backfill-storage-{stage}-{region}), the same hierarchical layout as local storage, and lifecycle rules that age data from Standard to IA to Glacier automatically.",
        ],
      },
      {
        heading: "Recovery mechanics",
        body: [
          "The system runs on a \"save first, process later\" principle. The moment a failure is detected or simulated, the complete request — not just a timestamp — is preserved to a hierarchical local structure (Processor → Account → LogGroup → API type), which is what makes full, accurate replay possible instead of a lossy approximation.",
          "Background workers run on staggered timers to avoid resource conflicts: main processing at 0s, reprocess at 30s, republish at 45s, each repeating every 60 seconds. Saved data is always replayed in chronological order, so recovered dashboards fill in gaps rather than showing data out of sequence.",
        ],
      },
      {
        heading: "Validation and rollout",
        body: [
          "Verified end-to-end by setting a log group's simulated failure rate to 100%, confirming the data was fully preserved during the simulated outage, then turning the failure off and confirming automatic recovery — cross-checked against real before/after CloudWatch dashboards showing the gap fill in.",
          "Shipped with stage-aware configuration enabled only in test and beta, disabled by default in gamma and prod, so the same failure-simulation capability used for testing could never accidentally trigger in a live environment. Covered by component-level, end-to-end, and concurrency tests (Go's -race detector) for the parts of the system meant to run unattended in the background.",
        ],
      },
    ],
  },

  "easley-dunn-safetynet": {
    summary:
      "SafetyNet is a cross-platform React Native social app — a privacy-first replacement for a phone's Contacts app, with relationship-tiered trust, encrypted real-time chat, and live location sharing. I'm the top contributor by commit volume and own the backend, database, and deployment-infrastructure workstreams end to end, on top of shipping mobile features.",
    stats: [
      { label: "Integration Tests", value: "145" },
      { label: "Commits", value: "549" },
      { label: "REST Endpoints", value: "31+" },
      { label: "DB Migrations", value: "11" },
    ],
    sections: [
      {
        heading: "Database hardening audit",
        body: [
          "Ran a full audit of the Postgres layer — every migration, the complete schema, and all ~44 query call sites — against the live database using EXPLAIN and index inspection rather than just reading code. Found and fixed several real production risks: no baseline migration existed at all (a fresh clone got an empty database with no way to bootstrap it), stateless JWTs had no revocation path (a stolen phone or password reset didn't invalidate sessions for up to 90 days), and multi-step writes like signup and message-sending had no transaction wrapping, so a mid-sequence crash could leave orphaned records behind.",
          "Also found check-then-write races: a few endpoints did a SELECT followed by a conditional INSERT against unique constraints, so concurrent requests could 500 instead of returning the existing row. Replaced with atomic INSERT ... ON CONFLICT DO UPDATE — and caught a real bug in my own first draft this way, where the fix was silently clobbering real user data with an insert-only default on every update.",
        ],
      },
      {
        heading: "A silent index bypass",
        body: [
          "The most interesting finding was invisible without EXPLAIN: phone-number lookups ran a REGEXP_REPLACE comparison against every row, which turned out to be a full sequential scan that completely bypassed the existing unique index, because stored and query-time values were normalized differently. Fixed at the root by normalizing phone storage to one canonical format across 6 call sites — and the backfill migration for that fix surfaced a real, pre-existing duplicate-account collision already sitting in production data.",
          "A related case: a table's index was built on generated columns that zero live queries actually used, because every real query filtered on the raw columns instead — a live index that had never once served a query. Rewrote the query shapes to match, confirming every fix with before/after EXPLAIN output rather than assuming.",
        ],
      },
      {
        heading: "Dual-environment infrastructure",
        body: [
          "Designed and built full internal/production isolation across every layer of the stack: two separate Firebase projects (closing a real cross-environment exposure where the lower-trust internal project's database held a pointer to the production backend's URL), two independent backend processes rather than one process routing on a request header, and two PostgreSQL databases seeded from a schema-only dump so production inherits every hardening fix automatically instead of needing each fix applied twice.",
          "Also diagnosed a genuinely obscure native-Android bug during real-device verification: a config library's runtime reflection resolved Android's BuildConfig via the app's applicationId, but the Gradle namespace (where BuildConfig is actually generated) had quietly diverged from applicationId since before the environment split — so configuration silently returned empty on-device with no visible error under the app's own log tag. Fixed with a documented Gradle resValue override and verified end-to-end on a physical device across both build flavors.",
        ],
      },
      {
        heading: "Testing and security",
        body: [
          "Built out 145 integration tests running against a real, non-mocked PostgreSQL instance in CI, because the team had previously been burned by logic that only worked against a fake database — while deliberately mocking the Firebase Admin SDK, since faking auth calls is safe but faking the database isn't. GitHub Actions spins up an isolated Postgres container per run, so no contributor needs local Docker to get a passing or failing signal on a PR.",
          "On security: closed an IDOR on the chat-messages endpoint by adding a participant check, removed client-supplied user-identity trust from the Socket.IO join handler in favor of JWT-only identity, and required server-side Firebase token re-verification on password reset instead of trusting client-asserted OTP success.",
        ],
      },
      {
        heading: "A documented trade-off",
        body: [
          "Pushed back on an early planning-doc proposal to migrate connection lookups to Neo4j \"as the network grows.\" At the actual scale — around 130 connections, 82 users — the real bottleneck was the Postgres indexing mismatches above, not a graph-database problem. Documented the reasoning, fixed the indexing instead, and revisited the case for Neo4j afterward: it got weaker, not stronger.",
        ],
      },
    ],
  },
};
