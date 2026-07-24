export interface ExperienceDetail {
  summary: string;
  stats: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
}

// Deliberately high level: nothing here goes beyond what the resume bullets already say.
// No internal names, configuration values, incident details, security findings or usage numbers.
export const experienceDetails: Record<string, ExperienceDetail> = {
  "aws-eks-metrics-backfill": {
    summary:
      "The Amazon EKS Metrics Service collects and publishes cluster metrics, but a CloudWatch API outage could leave permanent gaps in monitoring data. I designed and built a four-component backfill system in Go that preserves failed work and replays it in order, turning outages from permanent data loss into a bounded processing delay.",
    stats: [
      { label: "Data gaps addressed", value: "up to 6 hrs" },
      { label: "Components", value: "4" },
      { label: "Language", value: "Go" },
      { label: "Data loss on recovery", value: "zero" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The service depends on CloudWatch APIs to read and publish metrics. When one of them went down, the existing retry logic and circuit breakers eventually gave up and the affected data was abandoned for good, leaving gaps in dashboards and making historical trends unreliable.",
          "There was also no safe way to test any of this: failure handling could only be exercised during a real outage, when the stakes were highest.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "The system follows a \"save first, process later\" principle. The moment a failure is detected, the complete request is preserved in a structured layout instead of just a timestamp, which is what makes accurate replay possible rather than a lossy approximation.",
          "Four components share the work: failure simulation and detection, reprocessing of failed reads, republishing of failed writes, and durable backup with a storage lifecycle for extended outages. Recovery runs in the background on staggered schedules, and saved data is always replayed in chronological order through the same code path as live data, so recovered dashboards fill in gaps instead of showing data out of sequence.",
        ],
      },
      {
        heading: "Making failure testable",
        body: [
          "A configuration-driven failure simulation framework lets the team inject failures at chosen rates and verify recovery on demand, instead of waiting for a real outage. It is only enabled in test environments, so the same capability used for testing cannot trigger in a live one.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Verified end to end by simulating an outage, confirming the data was fully preserved, then removing the failure and confirming automatic recovery, cross-checked against before-and-after monitoring dashboards. Covered by component-level, end-to-end and concurrency tests (including Go's race detector) for the parts designed to run unattended in the background.",
        ],
      },
    ],
  },

  "easley-dunn-safetynet": {
    summary:
      "SafetyNet is a cross-platform React Native social app. I own much of the backend and database work, and ship features across backend and mobile, as the Node.js/Express and PostgreSQL foundation behind authentication, real-time messaging and location-aware features.",
    stats: [
      { label: "Authored pull requests", value: "60+" },
      { label: "Backend", value: "Node.js" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Real-time", value: "Socket.IO" },
    ],
    sections: [
      {
        heading: "Backend",
        body: [
          "Built the API layer with JWT plus Firebase OTP authentication, a social-graph discovery algorithm with proximity ranking, and tiered rate limiting, all on top of PostgreSQL.",
        ],
      },
      {
        heading: "Real-time messaging",
        body: [
          "Engineered messaging over Socket.IO with authenticated WebSocket handshakes, encrypted message storage, and atomic database transactions so a message and its notifications are persisted together or not at all.",
        ],
      },
      {
        heading: "Database engineering",
        body: [
          "Reviewed the database layer against a real database using query plans and index inspection rather than only reading code, then fixed what that surfaced: indexes that did not match how the data was actually queried, multi-step writes that needed transactions, and check-then-write patterns that were replaced with atomic upserts.",
          "Set up isolated internal and production environments across the stack so changes can be exercised safely before they reach production.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "Built the deploy pipeline: changes auto-deploy to an internal environment with health checks and automatic rollback, and are promoted to production with one click. Production runs on a cloud VM with scheduled backups and a restore that has been tested, not just configured.",
        ],
      },
      {
        heading: "Testing",
        body: [
          "Wrote hundreds of integration tests that run against a real, non-mocked PostgreSQL instance in CI, because logic that only works against a fake database is a risk. Every pull request also has to pass required checks, including a guard that blocks destructive migrations. Third-party authentication is mocked, since faking those calls is safe in a way that faking the database is not.",
        ],
      },
      {
        heading: "Engineering judgment",
        body: [
          "When a graph database was proposed for connection lookups, I measured first. At the actual scale the bottleneck was indexing in the existing database, not the data model, so I fixed the indexes and documented why the migration was not justified.",
        ],
      },
    ],
  },
};
