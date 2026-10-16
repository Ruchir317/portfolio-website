// Structured case-study additions for the project detail pages. Every claim here comes from the
// existing write-ups in projectDetails.ts / resume.ts; keep it that way.
export interface CaseStudy {
  diagramTitle: string;
  steps: { label: string; detail: string }[];
  decisions: { decision: string; why: string; result: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  // Employer pages: keep strictly within the trimmed wording in experienceDetails.ts.
  "aws-eks-metrics-backfill": {
    diagramTitle: "Failure-to-recovery flow (the steps, not the four components)",
    steps: [
      { label: "Detect", detail: "A failed CloudWatch call is caught, real or simulated" },
      { label: "Save", detail: "The complete request is stored in a structured layout" },
      { label: "Reprocess", detail: "Failed reads are retried in the background" },
      { label: "Republish", detail: "Failed writes are retried in the background" },
      { label: "Back up", detail: "Durable storage with a lifecycle for long outages" },
      { label: "Replay", detail: "Chronological replay through the live code path" },
    ],
    decisions: [
      {
        decision: "Save the full request, not just a timestamp",
        why: "Preserving everything makes accurate replay possible instead of a lossy approximation.",
        result: "Zero data loss on recovery",
      },
      {
        decision: "Replay through the same code path as live data, in order",
        why: "Recovered data takes the normal route, so dashboards fill in gaps instead of showing data out of sequence.",
        result: "Outages become a bounded delay",
      },
      {
        decision: "Inject failures from configuration, in test environments only",
        why: "Failure handling could previously be exercised only during a real outage.",
        result: "Recovery verified end to end; cannot trigger in a live environment",
      },
    ],
  },
  "easley-dunn-safetynet": {
    diagramTitle: "Request path through the backend",
    steps: [
      { label: "Authenticate", detail: "JWT plus Firebase OTP" },
      { label: "Rate limit", detail: "Tiered limits on the API" },
      { label: "Handle", detail: "Node.js / Express over PostgreSQL" },
      { label: "Persist", detail: "Atomic transactions for messages and notifications" },
      { label: "Deliver", detail: "Socket.IO over authenticated WebSockets" },
    ],
    decisions: [
      {
        decision: "Integration tests against a real PostgreSQL in CI",
        why: "Logic that only works against a fake database is a risk; only third-party auth is mocked.",
        result: "Tests exercise the real database behaviour",
      },
      {
        decision: "Review the database with query plans, not by reading code",
        why: "Indexes did not match how the data was actually queried.",
        result: "Indexes, transactions and atomic upserts corrected",
      },
      {
        decision: "Fix indexing before adopting a graph database",
        why: "At the actual scale the bottleneck was indexing, not the data model.",
        result: "Migration not justified; reasoning documented",
      },
    ],
  },
  factual: {
    diagramTitle: "Real-time speech verification pipeline",
    steps: [
      { label: "Transcribe", detail: "Whisper turns speech into text" },
      { label: "Extract claims", detail: "LLM keeps check-worthy facts, drops opinion" },
      { label: "Retrieve", detail: "Google Search and News API fetch live evidence" },
      { label: "Judge", detail: "RAG verdict: support, refute or insufficient" },
      { label: "Self-critique", detail: "Judge LLM refines queries, up to 10 loops" },
    ],
    decisions: [
      {
        decision: "Retrieval plus a self-critique loop instead of zero-shot prompting",
        why: "Zero-shot is fast but hallucination-prone on claims the model cannot know.",
        result: "84% accuracy, 0.83 F1 post-cutoff vs 63% zero-shot",
      },
      {
        decision: "Turn the benchmark into speech-like audio",
        why: "Existing corpora start from clean text and never exercise the ASR step.",
        result: "400-claim benchmark that tests the whole pipeline",
      },
      {
        decision: "Split claims into pre- and post-model-cutoff sets",
        why: "Older PolitiFact claims may be memorised; newer ones isolate retrieval.",
        result: "200 post-cutoff claims measure retrieval, not memory",
      },
    ],
  },
  "multimodal-emotion-detection": {
    diagramTitle: "Multimodal emotion recognition",
    steps: [
      { label: "Rebalance", detail: "Downsample common classes, augment rare ones" },
      { label: "Extract", detail: "BERT text, HuBERT audio, OpenFace video" },
      { label: "Score", detail: "Each modality predicts emotion logits" },
      { label: "Fuse", detail: "Weighted late fusion: 50% text, 30% audio, 20% video" },
      { label: "Explain", detail: "LoRA LLM explains via facial Action Units" },
    ],
    decisions: [
      {
        decision: "Weighted late fusion instead of early feature concatenation",
        why: "Letting each modality vote by its own reliability beats mixing raw features up front.",
        result: "60% accuracy, 38% macro F1 vs 23% for early fusion",
      },
      {
        decision: "HuBERT embeddings instead of OpenSMILE plus an MLP",
        why: "The MLP had high train accuracy but generalised poorly.",
        result: "Disgust F1 from 4% to 32% (with augmentation)",
      },
      {
        decision: "Feed prior dialogue and speaker tags to the text model",
        why: "A single utterance lacks the context needed to read the emotion.",
        result: "+2-3 F1 points; best text model 44.8% macro F1",
      },
    ],
  },
  "duckdb-materialized-views": {
    diagramTitle: "Materialized views inside DuckDB",
    steps: [
      { label: "Parse", detail: "CREATE / REFRESH MATERIALIZED VIEW grammar" },
      { label: "Track", detail: "MatView objects record query and base tables" },
      { label: "Rewrite", detail: "Planner prefers a matching view over recomputing" },
      { label: "Store", detail: "Native columnar table, indexed and compressed" },
      { label: "Invalidate", detail: "Locking and dependencies flag stale views" },
    ],
    decisions: [
      {
        decision: "Store views as ordinary physical columnar tables",
        why: "They inherit DuckDB's indexing and compression with no separate storage path.",
        result: "Reuses existing engine features for free",
      },
      {
        decision: "Persist results at creation instead of plain views",
        why: "Repeated analytical queries were recomputing joins and aggregations.",
        result: "Retrieval up to 100x faster for ~25% more storage",
      },
      {
        decision: "Exclude recursive queries and non-deterministic functions",
        why: "Random or time-dependent results cannot be meaningfully cached.",
        result: "Cached results stay consistent",
      },
    ],
  },
  "carla-v2x-intersection": {
    diagramTitle: "Reservation-based intersection manager",
    steps: [
      { label: "Detect", detail: "Approach-radius check registers vehicles" },
      { label: "Message", detail: "REQUEST / PERMIT / CROSSING / CLEARED mailbox" },
      { label: "Queue", detail: "First-come-first-served arrival order" },
      { label: "Check conflicts", detail: "Grant PERMIT only if intents do not conflict" },
      { label: "Clear", detail: "Conflict box releases the reservation on exit" },
    ],
    decisions: [
      {
        decision: "Geometric approach radius instead of lane-level reasoning",
        why: "Keeps registration O(n) and makes the manager map-agnostic.",
        result: "Works on any CARLA map without per-map logic",
      },
      {
        decision: "FCFS conflict-aware ordering instead of a space-time reservation grid",
        why: "Avoids the heavier fine-grained grid used by systems like AIM.",
        result: "O(n log n) sort per tick",
      },
      {
        decision: "Coordinate vehicles instead of cycling signals",
        why: "Coordination mattered more than raw speed: even at half speed it beat the signal.",
        result: "-51% crossing time, +105% throughput",
      },
    ],
  },
  "travel-route-optimizer": {
    diagramTitle: "Recommendation and route pipeline",
    steps: [
      { label: "Scrape", detail: "Selenium collects ~120 TripAdvisor spots per city" },
      { label: "Geocode", detail: "GeoPy adds latitude and longitude" },
      { label: "Measure", detail: "Google Maps driving distance and time to every spot" },
      { label: "Shortlist", detail: "KNN keeps the 7 closest matching spots" },
      { label: "Sequence", detail: "Tabu Search orders the visit route" },
      { label: "Render", detail: "Folium / OpenStreetMap map on Django" },
    ],
    decisions: [
      {
        decision: "Tabu Search over the Genetic Algorithm and Simulated Annealing",
        why: "Routes must be computed on demand; the Genetic Algorithm needed ~0.3 s.",
        result: "~0.03-0.06 s, within 1-3% of Simulated Annealing's best distance",
      },
      {
        decision: "Real driving distance instead of straight-line distance",
        why: "The Google Maps API reflects the actual road network.",
        result: "Realistic distances and durations from the user's live location",
      },
      {
        decision: "Shortlist to 7 spots before sequencing",
        why: "Small enough to make routing tractable, large enough for a day trip.",
        result: "A practical route problem instead of one over ~120 spots",
      },
    ],
  },
};
