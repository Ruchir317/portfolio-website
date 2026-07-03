export interface ProjectDetail {
  summary: string;
  stats: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
  team?: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  factual: {
    summary:
      "A real-time fact-checking system built to combat misinformation during live events — debates, policy announcements, breaking news — by transcribing spoken claims, extracting the check-worthy ones, and verifying them against live web evidence.",
    stats: [
      { label: "Best Accuracy (post-cutoff)", value: "84%" },
      { label: "F1 Score", value: "0.83" },
      { label: "Benchmark Claims", value: "400" },
      { label: "Max Self-Critique Loops", value: "10" },
    ],
    sections: [
      {
        heading: "Pipeline",
        body: [
          "Audio is transcribed with OpenAI's Whisper, then a prompted LLM extracts check-worthy factual claims from the transcript, filtering out opinion and non-factual statements.",
          "Verification runs through three escalating strategies: zero-shot prompting (fast but hallucination-prone), scratchpad-based reasoning (lists reasons for/against before a verdict, improving transparency), and retrieval-augmented generation, which pulls live evidence from Google Search and News API before judging the claim.",
          "A self-critique loop sits on top of the RAG stage: a separate 'judge' LLM checks whether the answer is actually supported by the retrieved evidence, and if not, feeds structured feedback back into the query-generation step. This repeats for up to 10 iterations or until the judge approves the result.",
        ],
      },
      {
        heading: "Dataset",
        body: [
          "Built a 400-claim benchmark specifically because existing fact-checking corpora didn't fit a speech-based, temporally-aware evaluation: 200 claims sampled from the PolitiFact fact-check corpus (published 2008–2022, so possibly within GPT-4o's training data) and 200 claims scraped directly from PolitiFact.com dated after the model's knowledge cutoff (November 2023), giving a clean test of retrieval versus memorization.",
          "Every claim was rewritten with speech-like disfluencies, fillers, and hedges, then converted to audio — so the benchmark actually exercises the ASR step instead of starting from clean text.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Agentic configurations (structured prompting + self-critique) won across the board, especially on post-cutoff claims where the model's internal knowledge is naturally lacking: GPT-4o (Agentic) hit 84% accuracy / 0.83 F1 post-cutoff versus just 63% accuracy / 0.58 F1 for GPT-4o zero-shot on the same claims.",
          "Gemini followed the same pattern (68% zero-shot → 81% agentic accuracy post-cutoff), confirming the gain comes from the retrieval + critique architecture, not a specific model.",
          "The weak spot across every configuration was correctly saying 'insufficient information' — models strongly preferred guessing SUPPORT/REFUTE over admitting they didn't have enough evidence, with accuracy on that specific label sitting near 0% for the best configs.",
        ],
      },
      {
        heading: "Limitations & Future Work",
        body: [
          "The dataset (200–400 samples) skews political/news and English-only, so generalization to other domains and languages is untested.",
          "Real-time verification is still computationally heavy (multiple LLM calls per claim), which caps how live 'real-time' can actually be without further latency work like streaming ASR and lightweight claim detectors.",
        ],
      },
    ],
    team: "Group project at USC with 5 teammates (Hiren Thakur, Aman Jain, Shahid Shaikh, Aryan Kapoor, Anurag Mudgil). I also prototyped the retrieval layer as a standalone tool, SearchAPI, using the Gemini API and Google Custom Search.",
  },

  "multimodal-emotion-detection": {
    summary:
      "A multimodal emotion recognition system on the MELD dataset (dialogue clips from Friends), combining text, audio, and video cues — because any single modality misses too much of how humans actually convey emotion.",
    stats: [
      { label: "Weighted Late Fusion Accuracy", value: "60%" },
      { label: "Macro F1", value: "38%" },
      { label: "Early Fusion Accuracy", value: "23%" },
      { label: "Emotion Classes", value: "7" },
    ],
    sections: [
      {
        heading: "Data & Augmentation",
        body: [
          "MELD has ~13,000 utterances from 1,433 dialogues, but is heavily skewed — 47% neutral, with Fear and Disgust each under 3%. I rebalanced every class to 2,000 train / 400 dev samples by downsampling dominant classes and augmenting minority ones.",
          "Augmentation applied pitch shift, speed change, or additive noise to audio, and Gaussian blur, brightness/contrast, zoom, or color tint to a random 50% subset of the resulting video — with custom verification scripts to catch missing files and keep train/dev/test splits consistent.",
        ],
      },
      {
        heading: "Per-Modality Modeling",
        body: [
          "Text: BERT and DistilBERT with three pooling strategies (CLS, max, mean+max). Adding prior-dialogue context (previous utterances + speaker tags, inspired by DialogueRNN) improved F1 by 2–3 points — the best configuration was BERT + CLS + context at 44.8% macro F1.",
          "Audio: switched from OpenSMILE + MLP (high train accuracy, poor generalization) to HuBERT embeddings, which meaningfully improved minority-class detection — Disgust F1 climbed from 4% to 32% after augmentation.",
          "Video: started with MediaPipe landmarks into MLP/BiLSTM models, then moved to MTCNN-cropped faces feeding EfficientNet-B3 and ViT for stronger frame-level features.",
        ],
      },
      {
        heading: "Fusion",
        body: [
          "Early fusion concatenated features from all three modalities into a single BiLSTM — this underperformed badly at 23% accuracy / 14% macro F1.",
          "Late fusion, combining each modality's output logits, did much better, and weighted late fusion (50% text / 30% audio / 20% video, weighted by each modality's individual strength) was the clear winner at 60% accuracy / 38% macro F1 — showing that letting each modality vote according to its own reliability beats mixing raw features upfront.",
        ],
      },
      {
        heading: "LLM Explanation Layer",
        body: [
          "Fine-tuned a LoRA-augmented LLM on facial Action Unit (AU) features — extracted via OpenFace and labeled through Gemini API calls — so the system could generate natural-language explanations grounded in specific AU activations (e.g., recognizing AU04 Brow Lowerer + AU12 Lip Corner Puller + AU15 Lip Corner Depressor as indicators of surprise).",
          "Shipped a Streamlit app that takes an uploaded video, runs face/audio/text extraction end-to-end, and returns the predicted emotion with its AU-grounded explanation.",
        ],
      },
    ],
    team: "Group project at USC with 3 teammates (Khushal Jhaveri, Anoushka Sinha, Sakshi Bharambe). My contributions: dataset balancing and augmentation, automated batch processing, and LoRA fine-tuning for the explanation model.",
  },

  "duckdb-materialized-views": {
    summary:
      "DuckDB is a fast, embeddable OLAP database, but it had no native materialized view support — meaning every repeated analytical query recomputed from scratch. I extended its parser, planner, and execution engine to add CREATE/REFRESH MATERIALIZED VIEW, bringing it closer to parity with PostgreSQL and Snowflake.",
    stats: [
      { label: "Retrieval Speedup", value: "up to 100x" },
      { label: "Storage Overhead", value: "~25%" },
      { label: "Scale Tested", value: "2 TB" },
      { label: "TPC-H Queries Benchmarked", value: "5" },
    ],
    sections: [
      {
        heading: "Implementation",
        body: [
          "Parser: extended the SQL grammar to recognize CREATE MATERIALIZED VIEW and REFRESH MATERIALIZED VIEW, with syntax validation and descriptive error handling for cases like refreshing a view that no longer exists.",
          "Logical planner: introduced MatView objects that track the defining query, base-table dependencies, storage format, and indexing metadata. The planner automatically invalidates a view when its base tables are dropped or modified, and prefers an existing materialized view over recomputation whenever a query matches it.",
          "Execution engine: materialized views are stored as physical tables in DuckDB's native columnar format, so they inherit its existing indexing and compression rather than needing a separate storage path.",
        ],
      },
      {
        heading: "Concurrency & Consistency",
        body: [
          "Added locking and transaction management so a view can be refreshed and queried concurrently without exposing inconsistent state, plus dependency tracking that flags a view stale the moment its base table changes.",
        ],
      },
      {
        heading: "Benchmarks",
        body: [
          "Tested against TPC-H queries Q1–Q5 (revenue aggregation, quantity-per-part, shipping-priority joins — representative OLAP workloads with heavy joins and aggregation).",
          "Creating a materialized view costs more upfront than a standard view (~0.3s vs ~0.01s) since it actually persists results — but that's a one-time cost. Retrieval is where it pays off: query time dropped from ~0.3s to ~0.003–0.004s, up to 100x faster, at roughly 25% additional storage.",
          "Validated the design scales to datasets up to 2TB with stable performance and safe concurrent access under load.",
        ],
      },
      {
        heading: "Limitations",
        body: [
          "Refresh is manual only — no incremental updates yet, so real-time-changing base tables mean the view can drift stale between refreshes.",
          "Advanced SQL constructs like recursive queries or non-deterministic functions (random values, time-dependent results) aren't supported, since their results can't be meaningfully cached.",
        ],
      },
    ],
    team: "Group project at USC with 2 teammates (Minho Jang, Prachiti Bapat).",
  },

  "carla-v2x-intersection": {
    summary:
      "A virtual intersection manager that replaces traffic lights with a V2X-inspired, reservation-based protocol for autonomous vehicles, built and benchmarked in the CARLA simulator.",
    stats: [
      { label: "Avg. Crossing Time", value: "−51%" },
      { label: "Throughput", value: "+105%" },
      { label: "Queue Clearance Time", value: "−51%" },
      { label: "Simulator", value: "CARLA 0.9.16" },
    ],
    sections: [
      {
        heading: "Architecture",
        body: [
          "Intersection Manager: the central decision-maker. It maintains a First-Come-First-Served queue, infers path conflicts from each vehicle's declared intent (straight/left/right), and grants PERMIT messages only when it's safe to proceed.",
          "Vehicle Agent: built on CARLA's BasicAgent, overridden to report state continuously, obey PERMIT/stop decisions, and otherwise drive normally once cleared.",
          "A lightweight mailbox communication layer stands in for real V2X hardware — vehicles publish REQUEST/INTENT/STATE messages, the manager responds with PERMIT/CROSSING/CLEARED — modeling the interaction pattern without needing a real DSRC/C-V2X stack.",
        ],
      },
      {
        heading: "Algorithms",
        body: [
          "Vehicle detection uses a simple geometric approach-radius check rather than lane-level reasoning, keeping registration O(n) and making the system map-agnostic.",
          "Permission assignment is FCFS conflict-aware: vehicles are ordered by arrival time, and each is granted passage only if its declared intent doesn't conflict with currently active vehicles — an O(n log n) sort per tick, versus the much heavier fine-grained space-time reservation grid used by systems like AIM (UT Austin).",
          "An axis-aligned conflict box around the intersection tracks each vehicle's active/cleared lifecycle — entering the box marks a vehicle active, exiting and clearing 75% of the approach radius marks it cleared and releases its reservation.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Benchmarked head-to-head against a fixed-cycle traffic signal: 51% lower average crossing time (2.56s → 1.25s per vehicle), 105% higher throughput (23.4 → 48 cars/min), and 51% faster total clearance time for a 16-vehicle queue (41s → 20s).",
          "Notably, even running vehicles at half speed, the V2X manager still cleared the queue faster than the signal-based baseline at full speed — coordination mattered more than raw vehicle speed.",
        ],
      },
      {
        heading: "Limitations",
        body: [
          "Single-intersection only, fully cooperative traffic assumed (no human drivers, pedestrians, or cyclists), and communication is modeled as instantaneous and lossless — none of the physical-layer realism of real V2X hardware.",
        ],
      },
    ],
    team: "Group project at USC with 3 teammates (Shahid Shaikh, Hitansh Surani, Harshal Dave).",
  },

  "travel-route-optimizer": {
    summary:
      "A BTech capstone project addressing two problems at once: recommending tourist spots tailored to a user's location and interests, and then computing an efficient route to visit them — since most travel-planning tools handle these as separate, poorly-integrated steps.",
    stats: [
      { label: "Cities Covered", value: "5" },
      { label: "Spots per City", value: "~120" },
      { label: "Fastest Algorithm", value: "Tabu Search" },
      { label: "Route Compute Time", value: "~0.03–0.06s" },
    ],
    sections: [
      {
        heading: "Data Pipeline",
        body: [
          "Scraped TripAdvisor with Selenium for the top-rated tourist spots (~120 per city) across five Indian cities — Mumbai, Delhi, Chennai, Kolkata, and Jaipur — capturing name, category, rating, and address for each.",
          "Geocoded every address to latitude/longitude with the GeoPy library so spots could be plotted and distance-ranked, and separately scraped the user's live coordinates from a browser-geolocation site to anchor recommendations to wherever they actually are.",
        ],
      },
      {
        heading: "Recommendation & Routing",
        body: [
          "Called the Google Maps API to get real driving distance and duration from the user's current location to every catalogued spot, rather than relying on straight-line distance.",
          "Used K-Nearest Neighbors to shortlist the 7 closest spots matching the user's interest filters — small enough to make the downstream routing problem tractable, large enough for a meaningful day trip.",
          "Framed visiting those 7 spots efficiently as a small Traveling Salesman Problem and solved it three ways — Tabu Search, a Genetic Algorithm, and Simulated Annealing — to compare heuristic optimization strategies head-to-head on the same real data.",
          "Rendered the final recommended route on an interactive Folium/OpenStreetMap view, built on a Django backend.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Benchmarked all three algorithms from two real Mumbai starting points. Simulated Annealing found the shortest total route in both cases (9,299m and 16,179m), but took roughly 1.5–2x longer to converge than Tabu Search.",
          "Tabu Search was the clear winner on speed — converging in ~0.03–0.06s versus the Genetic Algorithm's ~0.3–0.32s (5–8x slower) — while landing within about 1–3% of Simulated Annealing's best distance, making it the practical choice when routes need to be computed on demand rather than precomputed offline.",
        ],
      },
      {
        heading: "Limitations",
        body: [
          "Recommendations are driven by static scraped ratings rather than a learned per-user profile, so the system doesn't improve from repeated use the way a collaborative-filtering approach would.",
          "Real-time traffic and weather conditions were a stated goal but not integrated into the final route-scoring — routes are optimized on distance/time snapshots, not live conditions.",
        ],
      },
    ],
    team: "BTech capstone at K. J. Somaiya Institute of Technology with 2 teammates (Prachiti Bapat, Vedant Mishra), advised by Prof. Aarti Sahitya.",
  },
};
