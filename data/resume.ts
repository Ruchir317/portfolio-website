export const resume = {
  name: "Ruchir Jadhav",
  headline:
    "Software Development Engineer with an MS in Computer Science from USC (December 2025), focused on cloud systems, backend and mobile engineering, distributed systems, and AI/ML.",
  about: [
    "I hold an MS in Computer Science from the University of Southern California (December 2025) and have experience across cloud infrastructure, backend and mobile systems, data engineering, and machine learning.",
    "I currently work as a Software Development Engineer at Easley Dunn Productions, building the Node.js/Express backend for SafetyNet, a cross-platform React Native app, covering authentication, real-time messaging, and geospatial features.",
    "Previously, I was a Software Development Engineer Intern at Amazon Web Services, where I built resilient backend systems for the Amazon EKS Metrics Service, and a Data Engineer at BusinessNext, building ETL pipelines and query-driven dashboards for a banking CRM.",
    "My projects span real-time multimodal fact-checking, multimodal emotion detection, cooperative autonomous-vehicle intersection management, and database internals — including adding materialized views to DuckDB.",
    "I am looking for graduate software engineering roles where I can apply strong systems, algorithms, backend, and full-stack engineering skills.",
  ],
  contact: {
    email: "ruchirjadhav29@gmail.com",
    location: "Los Angeles, CA",
  },
  links: {
    github: "https://github.com/Ruchir317",
    linkedin: "https://www.linkedin.com/in/ruchirjadhav/",
    scholar: "https://scholar.google.com/citations?hl=en&user=NwqI_kkAAAAJ",
  },
  skills: {
    languages: ["Python", "Go", "JavaScript", "TypeScript", "SQL", "Java", "C", "C++"],
    frameworks_libraries: [
      "Node.js/Express", "React Native", "React", "Django", "Flask", "Socket.IO",
      "PyTorch", "TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "OpenCV",
      "Selenium", "Beautiful Soup", "HTML", "CSS", "Tailwind", "Jest",
    ],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    tools_cloud_devops: [
      "AWS", "CloudWatch", "S3", "EKS", "Google Cloud", "Firebase", "GitHub Actions", "Git", "Linux",
    ],
  },
  experience: [
    {
      role: "Software Development Engineer",
      company: "Easley Dunn Productions",
      dates: "Feb 2026 – Present",
      slug: "easley-dunn-safetynet",
      bullets: [
        "De facto backend lead for SafetyNet, a cross-platform React Native app on Node.js/Express and PostgreSQL: authored most of the merged pull requests on a ~15-contributor team, building authentication, real-time messaging over Socket.IO, and location-aware discovery.",
        "Hardened the PostgreSQL layer with transactional multi-step writes, atomic upserts, and query-plan-driven index fixes, verified with before/after EXPLAIN.",
        "Raised release confidence with hundreds of backend integration tests on a real PostgreSQL database and required CI checks on every pull request, including a migration-safety guard.",
        "Built the delivery pipeline: auto-deploy to an internal environment with health checks and automatic rollback, one-click promotion to production, and backups with a tested restore.",
      ],
    },
    {
      role: "Software Development Engineer Intern",
      company: "Amazon Web Services (AWS)",
      dates: "May 2025 – Aug 2025",
      slug: "aws-eks-metrics-backfill",
      bullets: [
        "Built a four-component backfill system in Go for the Amazon EKS Metrics Service, resolving CloudWatch API outages that had caused up to 6-hour metric data gaps, with failure detection, hierarchical data preservation, and chronological replay for zero data loss.",
        "Designed a configuration-driven failure simulation framework for safe outage testing in test environments, validated end-to-end via before/after CloudWatch dashboard comparisons.",
        "Implemented background reprocess and republish services with AWS-specific retry/backoff and a durable backup with a storage lifecycle, shortening outage recovery time and ensuring continuous data availability.",
      ],
    },
    {
      role: "Data Engineer",
      company: "BusinessNext",
      dates: "Sep 2023 – May 2024",
      slug: "businessnext-data-engineering",
      bullets: [
        "Built and refined SQL queries on Linux using Django ORM to power client-portfolio dashboards for Relationship Advisors in BusinessNext's banking CRM, enabling the frontend team to deliver responsive reporting interfaces.",
        "Developed data logic to surface product recommendation opportunities for banking clients, translating Relationship Advisor requirements into structured queries that identified better-fit financial offers from existing account data.",
      ],
    },
  ],
  projects: [
    {
      name: "FACTUAL — Real-Time Multimodal Fact-Checking",
      slug: "factual",
      tech_stack: ["Python", "OpenAI Whisper", "GPT-4o", "Gemini", "RAG", "Google Search/News API"],
      bullets: [
        "Built a real-time speech fact-checking pipeline: Whisper ASR transcription, LLM-based claim extraction, and retrieval-augmented verification against live web evidence.",
        "Constructed a 400-claim benchmark split across pre- and post-model-cutoff claims and converted to speech-like audio to stress-test the pipeline under realistic conditions.",
        "Added a self-critique loop where a judge LLM evaluates evidence sufficiency and iteratively refines search queries, up to 10 iterations, to reduce hallucination.",
        "Best configuration (GPT-4o, agentic) reached 84% accuracy and 0.83 F1 on post-cutoff claims, versus 63% accuracy for zero-shot prompting alone.",
        "Prototyped the retrieval layer as a standalone tool (SearchAPI) using the Gemini API and Google Custom Search for article retrieval, summarization, and batch claim processing with structured JSON output.",
      ],
      links: ["https://github.com/Ruchir317/SearchAPI"],
    },
    {
      name: "Multimodal Emotion Detection",
      slug: "multimodal-emotion-detection",
      tech_stack: ["Python", "BERT", "HuBERT", "OpenFace", "LoRA", "PyTorch", "Streamlit"],
      bullets: [
        "Balanced the MELD dataset (2,000 train / 400 dev samples per class) via audio pitch/speed/noise augmentation and OpenCV-based video filters to correct severe class imbalance.",
        "Fused three modalities — BERT (text, with dialogue context), HuBERT (audio embeddings), and OpenFace facial Action Units (video) — using weighted late fusion (50% text / 30% audio / 20% video).",
        "Fine-tuned a LoRA-augmented LLM on facial Action Unit features to generate natural-language emotion explanations grounded in AU activations.",
        "Weighted late fusion reached 60% accuracy and 38% macro F1, roughly double the 23% accuracy of early fusion; shipped a Streamlit app for end-to-end video-to-emotion inference.",
      ],
      links: [],
    },
    {
      name: "Materialized Views in DuckDB",
      slug: "duckdb-materialized-views",
      tech_stack: ["C++", "SQL", "DuckDB", "TPC-H"],
      bullets: [
        "Extended DuckDB's parser, logical planner, and execution engine to support CREATE/REFRESH MATERIALIZED VIEW, with dependency tracking to auto-invalidate views when base tables change.",
        "Stored materialized views in DuckDB's native columnar format so they inherit its indexing and compression, and modified the query planner to prefer them automatically when applicable.",
        "Benchmarked against standard views on TPC-H queries: retrieval time dropped from ~0.3s to ~0.004s (up to 100x faster) at the cost of ~25% additional storage and higher one-time creation overhead.",
        "Validated scalability up to 2TB datasets and confirmed safe concurrent refresh/query access via locking and transaction control.",
      ],
      links: [],
    },
    {
      name: "CARLA Cooperative V2X Intersection",
      slug: "carla-v2x-intersection",
      tech_stack: ["Python", "CARLA 0.9.16", "V2X"],
      bullets: [
        "Designed a V2X-inspired virtual Intersection Manager that replaces traffic lights with an FCFS, conflict-aware reservation protocol for autonomous vehicles in CARLA.",
        "Built a lightweight mailbox communication layer for REQUEST/PERMIT/CROSSING/CLEARED message exchange between the manager and per-vehicle agents, with geometry-based conflict-box detection for entry/exit.",
        "Benchmarked against fixed-cycle traffic signals: 51% lower average crossing time (2.56s to 1.25s/vehicle), 105% higher throughput (48 vs. 23.4 cars/min), and 51% faster total queue clearance.",
        "Logged arrival, permission, entry, and exit timestamps to CSV for reproducible performance analysis across synchronous simulation runs.",
      ],
      links: ["https://github.com/Ruchir317/carla-coop-v2x"],
    },
    {
      name: "Travel Recommendation & Route Optimizer",
      slug: "travel-route-optimizer",
      tech_stack: ["Python", "Selenium", "Django", "GeoPy", "Folium", "Google Maps API"],
      bullets: [
        "Scraped TripAdvisor via Selenium for the top ~120 rated spots across 5 Indian cities, geocoding each with GeoPy into a ratings/category dataset.",
        "Fetched the user's live location and used the Google Maps API to compute real driving distance and duration to every catalogued spot.",
        "Applied KNN to shortlist the 7 closest matching spots, then benchmarked Tabu Search, Genetic Algorithm, and Simulated Annealing to sequence an efficient visiting route.",
        "Simulated Annealing found the shortest routes in testing, but Tabu Search converged 5-8x faster than the Genetic Algorithm, making it the practical pick under time constraints; visualized routes with Folium/OpenStreetMap.",
        "Published as \"An Approach Travel Recommendation System and Route Optimizer using AI\" at the IEEE 5th International Conference on Advances in Science and Technology (ICAST 2022).",
      ],
      links: [],
    },
    {
      name: "Sign Language Detection",
      slug: "sign-language-detection",
      tech_stack: ["Python", "TensorFlow", "OpenCV", "REST API"],
      bullets: [
        "Built a real-time gesture recognition system for accessibility-oriented use cases.",
        "Collected and processed a diverse hand-sign dataset using feature extraction, normalization, and augmentation.",
        "Improved model quality through hyperparameter tuning, transfer learning, dropout, and regularization.",
        "Achieved 93%+ accuracy while maintaining low-latency inference.",
      ],
      links: [],
    },
  ],
  education: [
    {
      school: "University of Southern California",
      degree: "Master of Science in Computer Science",
      dates: "Jun 2024 – Dec 2025",
      location: "Los Angeles, CA",
      gpa: "3.38",
      coursework: [
        "Analysis of Algorithms",
        "Machine Learning for Data Science",
        "Advanced Data Stores",
        "Deep Learning",
        "Multimodal Probabilistic Learning",
        "Autonomous Cyber-Physical Systems",
      ],
    },
    {
      school: "University of Mumbai",
      degree: "Bachelor of Technology in Computer Engineering",
      dates: "Jul 2019 – Apr 2023",
      location: "Mumbai, India",
      gpa: "9.03",
      gpaScale: "10",
    },
  ],
};
