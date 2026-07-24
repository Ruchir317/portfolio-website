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
};
