/**
 * Single source of truth for all site content.
 *
 * Read by the section components, and — through the SSR bundle in
 * scripts/prerender.mjs — by the generated llms.txt, resume.md and JSON-LD.
 * Edit content here; components should only handle presentation.
 */
import photo from "../assets/me.jpg";
import hpeLogo from "../assets/hpe.jpeg";
import amazonLogo from "../assets/aws.png";
import uscLogo from "../assets/USC_logo.png";
import jecrcLogo from "../assets/ju.png";

import artsyWeb from "../assets/artsy_web.png";
import portfolioImg from "../assets/portfolio.webp";
import artsyAndroid from "../assets/artsy_android.png";
import trafficImg from "../assets/traffic_analysis.webp";
import tensorflowImg from "../assets/TL.webp";
import nlpImg from "../assets/nlp.webp";
import dlImg from "../assets/multi_hop.webp";

export interface Experience {
  company: string;
  role: string;
  duration: string;
  logo: string;
  website: string;
  highlights: string[];
  techStack: string[];
}

export interface Project {
  title: string;
  image: string;
  github: string;
  description: string;
  techStack: string[];
}

export interface SkillCategory {
  category: string;
  /** Icons are mapped by name in technical.tsx */
  skills: string[];
}

export interface Education {
  college: string;
  degree: string;
  years: string;
  coursework: string;
  logo: string;
  website: string;
}

export interface Social {
  name: "LinkedIn" | "GitHub" | "Email";
  url: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  photo: string;
  heroTitles: string[];
  tagline: string;
  about: string[];
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  socials: Social[];
  repo: string;
}

export const profile: Profile = {
  name: "Shreyansh Kabra",
  headline: "Software Engineer",
  location: "Los Angeles, CA",
  email: "kabras@usc.edu",
  photo,
  repo: "https://github.com/kabrashrey/shreyansh_kabra",

  heroTitles: [
    "Software Engineer",
    "Backend Developer",
    "AI/ML Enthusiast",
    "Cloud Developer",
  ],
  tagline:
    "Backend & cloud engineer building scalable, observable systems — from edge-to-cloud platforms and distributed caching to LLM & RAG applications.",

  about: [
    "I'm a software engineer pursuing my M.S. in Computer Science at USC, specializing in scalable backend systems and advanced AI/ML techniques.",
    "Most recently, I interned as an SDE at Amazon Web Services, designing a distributed caching layer for Amazon Connect's agent-routing service that cut redundant downstream traffic by 90% across a 591-host fleet.",
    "Before that, I spent 2+ years at Hewlett Packard Enterprise, engineering 100+ RESTful APIs for the GreenLake edge-to-cloud platform and architecting systems that improved operational efficiency by 80%.",
    "My work also spans NLP, Generative AI, and RAG systems — building with FAISS and LoRA to fine-tune Large Language Models.",
  ],

  experiences: [
    {
      company: "Amazon Web Services",
      role: "SDE Intern (Summer)",
      duration: "May 2026 – Aug 2026",
      logo: amazonLogo,
      website: "https://aws.amazon.com",
      highlights: [
        "Designed a distributed L2 cache layer (ElastiCache Serverless Redis) beneath a per-host in-memory L1 (Caffeine) cache for Amazon Connect's agent-routing service, cutting redundant downstream traffic by 90% (118K to 12K fetches per cycle) across a 591-host fleet.",
        "Implemented a read-through client (Lettuce) with a 100ms command timeout, TTL-based freshness write-back, and empty-result guard, sustaining single-digit-millisecond p99 latency and graceful fallback when the cache is unavailable.",
        "Gated the launch behind a DynamoDB-backed dynamic feature flag with CloudWatch hit/miss/stale observability, enabling an instant kill switch and sub-60s rollback.",
        "Validated the rollout with unit and integration tests, enabling a zero-downtime, controlled release.",
      ],
      techStack: [
        "Java",
        "Lettuce",
        "Redis",
        "DynamoDB",
        "CloudWatch",
        "ElastiCache",
      ],
    },
    {
      company: "Hewlett Packard Enterprise",
      role: "Cloud Developer 1",
      duration: "Aug 2022 – Dec 2024",
      logo: hpeLogo,
      website: "https://www.hpe.com/",
      highlights: [
        "Engineered 100+ RESTful APIs using Python, Django, and DRF for the GreenLake edge-to-cloud platform",
        "Architected async email notification system — improved operational efficiency by 80% and reduced request latency",
        "Enabled high-volume data sync between PostgreSQL and ServiceNow",
        "Optimized cross-module integrations for Service Insights Portal — reduced submission errors by 50%",
      ],
      techStack: [
        "Python",
        "Django",
        "DRF",
        "PostgreSQL",
        "ServiceNow",
        "REST APIs",
        "React",
      ],
    },
    {
      company: "Hewlett Packard Enterprise",
      role: "R&D Intern, NaaS Team",
      duration: "Jan 2022 – Aug 2022",
      logo: hpeLogo,
      website: "https://www.hpe.com/",
      highlights: [
        "Built async Python package to automate network device calibration — eliminated 90%+ manual work",
        "Streamlined troubleshooting report generation — reduced task completion time by 50%",
        "Reduced overall manual effort by 70% through async execution patterns",
      ],
      techStack: ["Python", "Async", "REST APIs", "ServiceNow", "Automation"],
    },
  ],

  projects: [
    {
      title: "Artist Search – Web App",
      image: artsyWeb,
      github: "https://github.com/kabrashrey/artsy-search",
      description:
        "Full-stack app integrating Artsy API to explore 100K+ artists. JWT auth, MongoDB, deployed on GCP with perfect Lighthouse scores.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "GCP"],
    },
    {
      title: "Artist Search – Android App",
      image: artsyAndroid,
      github: "https://github.com/kabrashrey/artsy-mobile-app",
      description:
        "Native Android app with Kotlin and Node.js backend for Artsy's database. Token-based auth and MongoDB persistence.",
      techStack: ["Kotlin", "Android SDK", "Node.js", "MongoDB"],
    },
    {
      title: "Portfolio Website",
      image: portfolioImg,
      github: "https://github.com/kabrashrey/shreyansh_kabra",
      description:
        "Personal portfolio built with React, TypeScript, and Vite. Dark/light mode, responsive layout, and optimized loading.",
      techStack: ["React", "TypeScript", "SCSS"],
    },
    {
      title: "Image Classification – Transfer Learning",
      image: tensorflowImg,
      github:
        "https://github.com/kabrashrey/Image-Classification-Transfer-Learning",
      description:
        "Image classification using transfer learning with TensorFlow/Keras. Fine-tuned pre-trained model on custom artwork dataset.",
      techStack: ["Python", "TensorFlow", "Keras", "Transfer Learning"],
    },
    {
      title: "Police Activity & Weather Analysis",
      image: trafficImg,
      github: "https://github.com/kabrashrey/police_weather_data_analysis",
      description:
        "Analyzed 86K+ RI traffic stops with weather data to identify biases and temporal patterns using statistical analysis.",
      techStack: ["Python", "Pandas", "NumPy", "Data Analysis"],
    },
    {
      title: "Mental Health Signal Detector",
      image: nlpImg,
      github: "https://github.com/Gaurav-Zanpure/group-23-mh-signals",
      description:
        "Real-time NLP system classifying support group posts by intent and concern level, with a lightweight RAG module for suggestions.",
      techStack: ["Python", "NLP", "RAG", "Transformers"],
    },
    {
      title: "Evidence based RAG for Hallucination-Resistant Multihop Q&A",
      image: dlImg,
      github:
        "https://github.com/kabrashrey/hallucination_resistant_multihop_qna",
      description:
        "Evidence-based RAG system for multihop question answering, RAG module for suggestions.",
      techStack: [
        "Deep Learning",
        "LLM",
        "Vector Database",
        "Prompt Engineering",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C++"],
    },
    {
      category: "Web & Backend",
      skills: ["React", "Node.js", "Django", "HTML5", "CSS3"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
    },
    {
      category: "AI / ML",
      skills: [
        "TensorFlow",
        "Keras",
        "Hugging Face",
        "NLP",
        "Pandas",
        "NumPy",
        "PyTorch",
        "RAG",
      ],
    },
    {
      category: "Tools & Cloud",
      skills: [
        "AWS",
        "GCP",
        "Git",
        "Postman",
        "Android",
        "Claude Code",
        "AWS Kiro",
        "Ollama",
      ],
    },
  ],

  education: [
    {
      college: "University of Southern California",
      degree: "M.S. in Computer Science",
      years: "2025 – 2026 (Expected)",
      coursework:
        "Analysis of Algorithms, NLP, Deep Learning, Web Technologies, Database Systems, Machine Learning, Information Retrieval, Agentic AI",
      logo: uscLogo,
      website: "https://www.usc.edu/",
    },
    {
      college: "JECRC University",
      degree: "B.Tech in Computer Science & Engineering",
      years: "2018 – 2022",
      coursework:
        "Data Structures, DBMS, Machine Learning, Programming Languages, Object Oriented Programming",
      logo: jecrcLogo,
      website: "https://www.jecrcuniversity.edu.in/",
    },
  ],

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shreyansh-kabra/" },
    { name: "GitHub", url: "https://github.com/kabrashrey" },
    { name: "Email", url: "mailto:kabras@usc.edu" },
  ],
};

/** Look up a social URL by name (used by hero, palette, JSON-LD). */
export const socialUrl = (name: Social["name"]) =>
  profile.socials.find((s) => s.name === name)?.url ?? "";
