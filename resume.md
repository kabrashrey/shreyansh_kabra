# Shreyansh Kabra

> Backend & cloud engineer building scalable, observable systems — from edge-to-cloud platforms and distributed caching to LLM & RAG applications.

Software Engineer · Los Angeles, CA · kabras@usc.edu

- LinkedIn: https://www.linkedin.com/in/shreyansh-kabra/
- GitHub: https://github.com/kabrashrey

## About

I'm a software engineer pursuing my M.S. in Computer Science at USC, specializing in scalable backend systems and advanced AI/ML techniques.

Most recently, I interned as an SDE at Amazon Web Services, designing a distributed caching layer for Amazon Connect's agent-routing service that cut redundant downstream traffic by 90% across a 591-host fleet.

Before that, I spent 2+ years at Hewlett Packard Enterprise, engineering 100+ RESTful APIs for the GreenLake edge-to-cloud platform and architecting systems that improved operational efficiency by 80%.

My work also spans NLP, Generative AI, and RAG systems — building with FAISS and LoRA to fine-tune Large Language Models.

## Experience

### SDE Intern (Summer) — Amazon Web Services

May 2026 – Aug 2026

- Designed a distributed L2 cache layer (ElastiCache Serverless Redis) beneath a per-host in-memory L1 (Caffeine) cache for Amazon Connect's agent-routing service, cutting redundant downstream traffic by 90% (118K to 12K fetches per cycle) across a 591-host fleet.
- Implemented a read-through client (Lettuce) with a 100ms command timeout, TTL-based freshness write-back, and empty-result guard, sustaining single-digit-millisecond p99 latency and graceful fallback when the cache is unavailable.
- Gated the launch behind a DynamoDB-backed dynamic feature flag with CloudWatch hit/miss/stale observability, enabling an instant kill switch and sub-60s rollback.
- Validated the rollout with unit and integration tests, enabling a zero-downtime, controlled release.

Tech: Java, Lettuce, Redis, DynamoDB, CloudWatch, ElastiCache

### Cloud Developer 1 — Hewlett Packard Enterprise

Aug 2022 – Dec 2024

- Engineered 100+ RESTful APIs using Python, Django, and DRF for the GreenLake edge-to-cloud platform
- Architected async email notification system — improved operational efficiency by 80% and reduced request latency
- Enabled high-volume data sync between PostgreSQL and ServiceNow
- Optimized cross-module integrations for Service Insights Portal — reduced submission errors by 50%

Tech: Python, Django, DRF, PostgreSQL, ServiceNow, REST APIs, React

### R&D Intern, NaaS Team — Hewlett Packard Enterprise

Jan 2022 – Aug 2022

- Built async Python package to automate network device calibration — eliminated 90%+ manual work
- Streamlined troubleshooting report generation — reduced task completion time by 50%
- Reduced overall manual effort by 70% through async execution patterns

Tech: Python, Async, REST APIs, ServiceNow, Automation

## Projects

### [Artist Search – Web App](https://github.com/kabrashrey/artsy-search)

Full-stack app integrating Artsy API to explore 100K+ artists. JWT auth, MongoDB, deployed on GCP with perfect Lighthouse scores.

Tech: React, Node.js, Express, MongoDB, GCP

### [Artist Search – Android App](https://github.com/kabrashrey/artsy-mobile-app)

Native Android app with Kotlin and Node.js backend for Artsy's database. Token-based auth and MongoDB persistence.

Tech: Kotlin, Android SDK, Node.js, MongoDB

### [Portfolio Website](https://github.com/kabrashrey/shreyansh_kabra)

Personal portfolio built with React, TypeScript, and Vite. Dark/light mode, responsive layout, and optimized loading.

Tech: React, TypeScript, SCSS

### [Image Classification – Transfer Learning](https://github.com/kabrashrey/Image-Classification-Transfer-Learning)

Image classification using transfer learning with TensorFlow/Keras. Fine-tuned pre-trained model on custom artwork dataset.

Tech: Python, TensorFlow, Keras, Transfer Learning

### [Police Activity & Weather Analysis](https://github.com/kabrashrey/police_weather_data_analysis)

Analyzed 86K+ RI traffic stops with weather data to identify biases and temporal patterns using statistical analysis.

Tech: Python, Pandas, NumPy, Data Analysis

### [Mental Health Signal Detector](https://github.com/Gaurav-Zanpure/group-23-mh-signals)

Real-time NLP system classifying support group posts by intent and concern level, with a lightweight RAG module for suggestions.

Tech: Python, NLP, RAG, Transformers

### [Evidence based RAG for Hallucination-Resistant Multihop Q&A](https://github.com/kabrashrey/hallucination_resistant_multihop_qna)

Evidence-based RAG system for multihop question answering, RAG module for suggestions.

Tech: Deep Learning, LLM, Vector Database, Prompt Engineering

## Skills

- Languages: Python, JavaScript, TypeScript, C++
- Web & Backend: React, Node.js, Django, HTML5, CSS3
- Databases: PostgreSQL, MongoDB, Redis, DynamoDB
- AI / ML: TensorFlow, Keras, Hugging Face, NLP, Pandas, NumPy, PyTorch, RAG
- Tools & Cloud: AWS, GCP, Git, Postman, Android, Claude Code, AWS Kiro, Ollama

## Education

### M.S. in Computer Science — University of Southern California

2025 – 2026 (Expected)

Key courses: Analysis of Algorithms, NLP, Deep Learning, Web Technologies, Database Systems, Machine Learning, Information Retrieval, Agentic AI

### B.Tech in Computer Science & Engineering — JECRC University

2018 – 2022

Key courses: Data Structures, DBMS, Machine Learning, Programming Languages, Object Oriented Programming
