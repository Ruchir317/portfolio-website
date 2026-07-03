export const resume = {
  name: "Ruchir Jadhav",
  headline:
    "MS Computer Science student at USC focused on cloud systems, distributed engineering, AI, and backend software development.",
  about: [
    "I am a Computer Science graduate student at the University of Southern California with experience across cloud infrastructure, data engineering, machine learning, and end-to-end application development.",
    "I worked as a Software Development Engineer Intern at Amazon Web Services, where I built resilient backend systems for the Amazon EKS Metrics Service.",
    "Previously, I worked as a Data Engineer at BusinessNext, building ETL pipelines, optimizing storage and query performance, and delivering analytics-focused solutions.",
    "My projects span multimodal emotion detection, route optimization, real-time gesture recognition, and fact verification systems.",
    "I am looking for graduate software engineering roles where I can apply strong systems, algorithms, backend, and full-stack engineering skills.",
  ],
  contact: {
    email: "ruchirjadhav29@gmail.com",
    phone: "213-234-8896",
    location: "Los Angeles, CA",
  },
  links: {
    github: "https://github.com/Ruchir317",
    linkedin: "https://www.linkedin.com/in/ruchirjadhav/",
  },
  skills: {
    languages: ["Python", "Go", "R", "Java", "C", "C++", "JavaScript"],
    frameworks_libraries: [
      "Django", "Flask", "React", "Node.js", "NumPy", "Pandas", "Matplotlib",
      "PyTorch", "Scikit-Learn", "SciPy", "Seaborn", "TensorFlow", "OpenCV",
      "Beautiful Soup", "Selenium",
    ],
    web: ["HTML", "CSS", "Bootstrap", "Tailwind"],
    databases: ["MySQL", "MongoDB"],
    tools_cloud_devops: [
      "AWS", "CloudWatch", "S3", "DynamoDB", "Fargate", "Linux Terminal",
      "Git", "Excel", "Power BI", "Firebase", "Blender",
    ],
  },
  experience: [
    {
      role: "Software Development Engineer Intern",
      company: "Amazon Web Services (AWS)",
      dates: "May 2025 – Aug 2025",
      bullets: [
        "Engineered and deployed a resilient backfill system in Go for the Amazon EKS Metrics Service, using AWS CloudWatch, S3, retries, and failover logic to guarantee zero data loss during outages.",
        "Collaborated across teams to build failure simulation flows, replay/reprocess pipelines, republish endpoints, and backup microservices.",
        "Established RESTful API endpoints, automated testing, and observability mechanisms to improve production safety.",
        "Diagnosed and resolved reliability and performance bottlenecks across EKS clusters.",
        "Improved monitoring dashboards, alerting, and service metrics (SLIs/SLOs), reducing incident response time and increasing resilience.",
      ],
    },
    {
      role: "Data Engineer",
      company: "BusinessNext",
      dates: "Sep 2023 – May 2024",
      bullets: [
        "Worked with delivery and engineering teams to implement ETL pipelines for heterogeneous datasets.",
        "Applied data structures and data modeling techniques for efficient schema design and reliable data flow.",
        "Optimized storage and query performance using SQL and MongoDB, including indexing, batch processing, and ingestion improvements.",
        "Improved throughput and reduced latency in data pipelines.",
        "Delivered analytical dashboards and technical reports to senior stakeholders and translated business needs into software solutions.",
      ],
    },
  ],
  projects: [
    {
      name: "Multimodal Emotion Detection",
      tech_stack: ["Python", "BERT", "HuBERT", "LoRA", "OpenFace", "Transformer Models", "PyTorch"],
      bullets: [
        "Expanded and balanced the MELD dataset using audio/video augmentation and sampling strategies to reduce class imbalance.",
        "Tuned a LoRA-augmented transformer model with facial Action Unit features via OpenFace.",
        "Built an end-to-end inference pipeline combining text, audio, and video modules with automated feature extraction and late fusion.",
        "Achieved approximately 70% accuracy across cross-validation folds.",
      ],
      links: [],
    },
    {
      name: "Travel Recommendation & Route Optimizer",
      tech_stack: ["Python", "Selenium", "Beautiful Soup", "Django", "Folium", "Google Maps API"],
      bullets: [
        "Built a geo-spatial dataset using web scraping and data cleaning.",
        "Designed graph-based travel routing structures for route planning.",
        "Integrated backend and frontend functionality with RESTful services, Google Maps API, Django, and Folium.",
        "Applied Tabu Search, Genetic Algorithm, and Simulated Annealing to optimize travel routes across distance, cost, and efficiency trade-offs.",
      ],
      links: [],
    },
    {
      name: "Sign Language Detection",
      tech_stack: ["Python", "TensorFlow", "OpenCV", "REST API"],
      bullets: [
        "Built a real-time gesture recognition system for accessibility-oriented use cases.",
        "Collected and processed a diverse hand-sign dataset using feature extraction, normalization, and augmentation.",
        "Improved model quality through hyperparameter tuning, transfer learning, dropout, and regularization.",
        "Achieved 93%+ accuracy while maintaining low-latency inference.",
      ],
      links: [],
    },
    {
      name: "SearchAPI Fact Verification",
      tech_stack: ["Python", "Gemini API", "Google Custom Search API", "Jupyter Notebook"],
      bullets: [
        "Built an automated fact verification pipeline that retrieves web evidence and uses LLM-based analysis to determine truthfulness.",
        "Added article search and summarization, batch claim processing, and structured JSON output generation.",
        "Designed the system to process large sets of factual claims efficiently.",
        "Maintained scripts, requirements, and execution utilities for end-to-end verification workflows.",
      ],
      links: ["https://github.com/Ruchir317/SearchAPI"],
    },
    {
      name: "CARLA Cooperative V2X Intersection",
      tech_stack: ["Python", "CARLA 0.9.16"],
      bullets: [
        "Built custom Python scripts for a cooperative intersection controller on CARLA 0.9.16.",
        "Implemented an FCFS-style intersection manager that tracks arrival, permission, entry, and exit times.",
        "Created simulation utilities for map loading, synchronous stepping, multi-vehicle spawning, and timing metric logging.",
        "Logged metrics to CSV for wait-time and crossing-time analysis.",
      ],
      links: ["https://github.com/Ruchir317/carla-coop-v2x"],
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
    },
  ],
};
