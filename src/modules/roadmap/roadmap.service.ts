import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillsService } from '../skills/skills.service';

export interface MilestoneResource {
  title: string;
  type: 'VIDEO' | 'DOCS' | 'ARTICLE';
  url: string;
}

export interface MilestonePracticeTask {
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  link?: string;
}

export interface MilestoneMiniProject {
  title: string;
  description: string;
  expectedDeliverables: string[];
}

export interface MilestoneTemplate {
  order: number;
  level: string; // e.g. "LEVEL 1: FOUNDATIONS", "LEVEL 2: CORE MASTERY", "LEVEL 3: PRODUCTION", "LEVEL 4: CAPSTONE"
  title: string;
  description: string;
  skillSlug: string;
  type: string;
  estimatedTime: string;
  why: string;
  unlocks: string[];
  baiustCourse?: string;
  resources?: MilestoneResource[];
  practiceTasks?: MilestonePracticeTask[];
  miniProject?: MilestoneMiniProject;
}

export interface TrackMeta {
  slug: string;
  title: string;
  category: 'WEB' | 'AI' | 'CP' | 'SECURITY' | 'CLOUD';
  description: string;
  icon: string;
  badge: string;
  estimatedTime: string;
  totalMilestones: number;
  keyTechnologies: string[];
  baiustRelevance: string;
}

export const TRACK_CATALOG: TrackMeta[] = [
  {
    slug: 'full-stack-developer',
    title: 'Full-Stack Web Development',
    category: 'WEB',
    description: 'Master frontend, backend, relational databases, microservices, and cloud deployment from zero to production.',
    icon: '🌐',
    badge: 'INDUSTRY CORE',
    estimatedTime: '16 Weeks',
    totalMilestones: 8,
    keyTechnologies: ['React 19', 'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
    baiustRelevance: 'Aligned with BAIUST CSE-211, CSE-312, and Final Year Capstone Project requirements.',
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI & Machine Learning Engineering',
    category: 'AI',
    description: 'Build mathematical foundations, data pipelines, deep neural architectures, and LLM-powered cognitive applications.',
    icon: '🤖',
    badge: 'HIGH DEMAND',
    estimatedTime: '18 Weeks',
    totalMilestones: 8,
    keyTechnologies: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'HuggingFace', 'FastAPI'],
    baiustRelevance: 'Directly aligns with BAIUST CSE-411 (Artificial Intelligence) and Data Science electives.',
  },
  {
    slug: 'competitive-programming',
    title: 'Competitive Programming & DSA Master',
    category: 'CP',
    description: 'Conquer codeforces, leetcode, and ICPC/NCPC contests with advanced algorithmic optimization.',
    icon: '⚡',
    badge: 'CORE CSE',
    estimatedTime: '20 Weeks',
    totalMilestones: 8,
    keyTechnologies: ['C++20', 'STL', 'Dynamic Programming', 'Graph Theory', 'Segment Trees'],
    baiustRelevance: 'Directly powers BAIUST Programming Contest Club & CSE-111/121/211 courses.',
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security & Systems Defense',
    category: 'SECURITY',
    description: 'Master Linux internals, network inspection, ethical hacking, OWASP vulnerabilities, and security auditing.',
    icon: '🛡️',
    badge: 'CRITICAL SHIELD',
    estimatedTime: '16 Weeks',
    totalMilestones: 8,
    keyTechnologies: ['Linux', 'Wireshark', 'Nmap', 'Cryptography', 'OWASP Top 10', 'CTF'],
    baiustRelevance: 'Aligned with BAIUST CSE-323 (Computer Networks) and Information Security curriculum.',
  },
  {
    slug: 'devops-cloud',
    title: 'DevOps & Cloud Systems Architecture',
    category: 'CLOUD',
    description: 'Automate container pipelines, manage cloud clusters, and orchestrate zero-downtime production releases.',
    icon: '☁️',
    badge: 'ENTERPRISE SCALE',
    estimatedTime: '14 Weeks',
    totalMilestones: 8,
    keyTechnologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Prometheus', 'AWS'],
    baiustRelevance: 'Aligned with BAIUST CSE-422 (Cloud Computing & Distributed Systems).',
  },
];

export const BASE_ROADMAP_TEMPLATES: Record<string, MilestoneTemplate[]> = {
  'full-stack-developer': [
    {
      order: 1,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Modern HTML5 & Semantic Web Architecture',
      description: 'Semantic tags, DOM tree structures, accessibility standards (WCAG 2.1), and responsive CSS Grid/Flexbox.',
      skillSlug: 'javascript',
      type: 'THEORY',
      estimatedTime: '1-2 weeks',
      why: 'Fundamental presentation layer of all modern web frontends',
      unlocks: ['2'],
      baiustCourse: 'Matches BAIUST CSE-312 (Web Engineering Lab)',
      resources: [
        { title: 'MDN Semantic HTML Guide', type: 'DOCS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' },
        { title: 'CSS Grid & Flexbox Complete Masterclass', type: 'VIDEO', url: 'https://youtube.com' },
      ],
      practiceTasks: [
        { title: 'Responsive Landing Page Layout with Zero Frameworks', difficulty: 'EASY', description: 'Build a mobile-first responsive layout utilizing semantic tags and CSS grid.' },
      ],
      miniProject: {
        title: 'BAIUST Course Handout Reader UI',
        description: 'Design a pixel-perfect, accessible reading interface for university lecture handouts.',
        expectedDeliverables: ['index.html with strict semantic elements', 'styles.css with CSS Variables & Grid'],
      },
    },
    {
      order: 2,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'JavaScript ES6+ & TypeScript Strict Typing',
      description: 'Event loop, microtasks vs macrotasks, promises, async/await, interfaces, generics, and strict compile options.',
      skillSlug: 'typescript',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Ensures type safety, prevents runtime crashes, and prepares for enterprise systems',
      unlocks: ['3', '4'],
      baiustCourse: 'Matches BAIUST CSE-211 Lab Extensions',
      resources: [
        { title: 'JavaScript Event Loop Visualized', type: 'VIDEO', url: 'https://youtube.com' },
        { title: 'TypeScript Official Handbook (Strict Mode)', type: 'DOCS', url: 'https://www.typescriptlang.org/docs/' },
      ],
      practiceTasks: [
        { title: 'Type Narrowing & Generic Cache Utility', difficulty: 'MEDIUM', description: 'Implement an in-memory TTL caching engine using TypeScript generics and keyof constraints.' },
      ],
      miniProject: {
        title: 'Department CGPA & Credit Calculator CLI',
        description: 'TypeScript module that validates course credit weights and calculates student semester GPAs.',
        expectedDeliverables: ['Strictly typed calculation engine', 'Unit test coverage with Jest/Vitest'],
      },
    },
    {
      order: 3,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'React 19 Hooks & Declarative State Architecture',
      description: 'Custom hooks, virtual DOM reconciliation, state machines, context reduction, and performance memoization.',
      skillSlug: 'react',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Industry view engine for scalable single-page and server-rendered web applications',
      unlocks: ['5'],
      baiustCourse: 'Core Foundation for BAIUST Capstone Frontend',
      resources: [
        { title: 'React 19 Official Documentation & Hooks Guide', type: 'DOCS', url: 'https://react.dev' },
        { title: 'Advanced React State Management Patterns', type: 'ARTICLE', url: 'https://react.dev/learn' },
      ],
      practiceTasks: [
        { title: 'Build a Custom useDebouncedFetch Hook', difficulty: 'MEDIUM', description: 'Create an abortable debounced data fetching hook handling race conditions.' },
      ],
      miniProject: {
        title: 'BAIUST Peer Tutoring Matchmaker UI',
        description: 'Interactive component system allowing students to filter tutors by course code and book time slots.',
        expectedDeliverables: ['Interactive component tree', 'Optimistic UI updates with instant feedback'],
      },
    },
    {
      order: 4,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Node.js & NestJS Modular REST APIs',
      description: 'Dependency injection, validation pipes, exception filters, interceptors, and JWT refresh token authentication.',
      skillSlug: 'nestjs',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Enterprise backend backbone for maintainable, multi-service architectures',
      unlocks: ['5', '6'],
      baiustCourse: 'Matches BAIUST Advanced Web Application Architecture',
      resources: [
        { title: 'NestJS Architecture & Dependency Injection Deep Dive', type: 'DOCS', url: 'https://docs.nestjs.com' },
        { title: 'JWT Authentication & RBAC Best Practices', type: 'ARTICLE', url: 'https://docs.nestjs.com/security/authentication' },
      ],
      practiceTasks: [
        { title: 'Role-Based Authorization Guard Implementation', difficulty: 'MEDIUM', description: 'Write a custom NestJS guard verifying student vs faculty role claims on incoming requests.' },
      ],
      miniProject: {
        title: 'Department Announcement Broadcast API',
        description: 'Modular NestJS REST microservice handling notices, categories, and audit trails.',
        expectedDeliverables: ['Controller, Service, and DTO layer with class-validator', 'Swagger interactive documentation'],
      },
    },
    {
      order: 5,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Next.js 16 App Router & Server Components',
      description: 'React Server Components (RSC), Turbopack, Server Actions, streaming SSR, and SEO meta tags.',
      skillSlug: 'nextjs',
      type: 'PROJECT',
      estimatedTime: '2-3 weeks',
      why: 'Modern standard for blazing-fast, secure, full-stack web applications',
      unlocks: ['7'],
      baiustCourse: 'Core for Capstone Engineering Presentation',
      resources: [
        { title: 'Next.js 16 App Router Documentation', type: 'DOCS', url: 'https://nextjs.org/docs' },
        { title: 'Server Components vs Client Components Guide', type: 'VIDEO', url: 'https://nextjs.org' },
      ],
      practiceTasks: [
        { title: 'Streaming Data Fetching with Suspense Fallbacks', difficulty: 'MEDIUM', description: 'Implement parallel routes with Skeleton loading states for zero layout shift.' },
      ],
      miniProject: {
        title: 'BAIUST Course Catalog Portal',
        description: 'Server-rendered interactive course explorer with search filters and instant page routing.',
        expectedDeliverables: ['Next.js 16 App Router hierarchy', 'Dynamic metadata tags for OpenGraph'],
      },
    },
    {
      order: 6,
      level: 'LEVEL 3: PRODUCTION',
      title: 'PostgreSQL Relational DB & Prisma ORM',
      description: 'Indexing, B+ Trees, foreign key constraints, ACID transactions, migrations, and query latency analysis.',
      skillSlug: 'postgresql',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Relational data persistence, integrity, and enterprise high-concurrency storage',
      unlocks: ['7'],
      baiustCourse: 'Matches BAIUST CSE-311 (Database Management Systems)',
      resources: [
        { title: 'PostgreSQL Indexing: B-Tree, Hash, GIN Deep Dive', type: 'ARTICLE', url: 'https://postgresql.org' },
        { title: 'Prisma Relational Queries & Transactions', type: 'DOCS', url: 'https://www.prisma.io/docs' },
      ],
      practiceTasks: [
        { title: 'Write an Atomic Money / Gems Transfer Transaction', difficulty: 'MEDIUM', description: 'Prevent race conditions using Prisma interactive transactions with rollback safety.' },
      ],
      miniProject: {
        title: 'University Lab Equipment Reservation Schema',
        description: 'Relational database schema modeling student reservations, time slots, and equipment assets.',
        expectedDeliverables: ['Prisma schema with relational joins', 'Seed script with automated test data'],
      },
    },
    {
      order: 7,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Docker Containerization & CI/CD Pipelines',
      description: 'Multi-stage Dockerfiles, Docker Compose service orchestration, GitHub Actions CI workflows, and cloud deploys.',
      skillSlug: 'docker',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Eliminates "works on my machine" syndrome and automates production releases',
      unlocks: ['8'],
      baiustCourse: 'Matches BAIUST Software Engineering Best Practices',
      resources: [
        { title: 'Docker Multi-stage Builds for Node/Next.js', type: 'DOCS', url: 'https://docs.docker.com' },
        { title: 'GitHub Actions CI/CD Complete Walkthrough', type: 'VIDEO', url: 'https://github.com' },
      ],
      practiceTasks: [
        { title: 'Optimize a Node.js Docker Image to Under 120MB', difficulty: 'HARD', description: 'Use Alpine Linux and multi-stage builds to strip build tooling from the final production container.' },
      ],
      miniProject: {
        title: 'Automated Test & Build Workflow',
        description: 'Configure GitHub Actions workflow that runs linter, test suite, and builds production artifacts on every pull request.',
        expectedDeliverables: ['.github/workflows/ci.yml configuration', 'Passing green pipeline check badge'],
      },
    },
    {
      order: 8,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Full-Stack Capstone & Portfolio Evidence Proof',
      description: 'End-to-end production application integrated with authentication, database, CI/CD, and live public deployment.',
      skillSlug: 'rest-api',
      type: 'PROJECT',
      estimatedTime: '3 weeks',
      why: 'Final portfolio masterpiece that proves your readiness to top software engineering employers',
      unlocks: [],
      baiustCourse: 'Fulfills BAIUST CSE-400 (Final Year Project/Thesis) Software Requirements',
      resources: [
        { title: 'Software Engineering Capstone Checklist', type: 'ARTICLE', url: 'https://github.com' },
      ],
      practiceTasks: [
        { title: 'Conduct Cryptographic Proof Verification on Public Repo', difficulty: 'HARD', description: 'Link public GitHub repo and earn the BAIUST Verified Engineering Proof token.' },
      ],
      miniProject: {
        title: 'BAIUST CSE Next-Level Platform Extension',
        description: 'Deliver an authentic, tested module deployed to a live cloud host with comprehensive documentation.',
        expectedDeliverables: ['Live production URL', 'Verified GitHub repository with commit proof'],
      },
    },
  ],

  'ai-ml-engineer': [
    {
      order: 1,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Python for Data Science & Vectorized Computing',
      description: 'NumPy array manipulation, vectorization vs loops, broadcasting, memory layouts, and clean scripting.',
      skillSlug: 'python',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Python and NumPy form the mathematical bedrock of modern AI computation',
      unlocks: ['2'],
      baiustCourse: 'Matches BAIUST CSE-121 (Structured Programming Extension)',
      resources: [
        { title: 'NumPy Visual Guide for Machine Learning', type: 'DOCS', url: 'https://numpy.org' },
      ],
      practiceTasks: [
        { title: 'Matrix Multiplication & Cosine Similarity without Loops', difficulty: 'EASY', description: 'Implement batch cosine similarity using purely vectorized NumPy matrix operations.' },
      ],
      miniProject: {
        title: 'Vectorized Student Performance Analyzer',
        description: 'Process batch exam scores and compute standard deviations and normalized z-scores.',
        expectedDeliverables: ['Vectorized NumPy script', 'Performance benchmark vs native loops'],
      },
    },
    {
      order: 2,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Applied Engineering Mathematics & Statistics',
      description: 'Linear algebra (eigenvalues, dot products), multivariate calculus (gradients), probability distributions, and Bayes Theorem.',
      skillSlug: 'ai-ml',
      type: 'THEORY',
      estimatedTime: '2-3 weeks',
      why: 'Essential for understanding optimization algorithms (SGD, Adam) and loss surfaces',
      unlocks: ['3', '4'],
      baiustCourse: 'Matches BAIUST MATH-103 (Linear Algebra & Statistics)',
      resources: [
        { title: 'Essence of Linear Algebra by 3Blue1Brown', type: 'VIDEO', url: 'https://3blue1brown.com' },
      ],
      practiceTasks: [
        { title: 'Implement Gradient Descent from Scratch', difficulty: 'MEDIUM', description: 'Code batch gradient descent to minimize mean squared error on a linear dataset.' },
      ],
      miniProject: {
        title: 'Loss Surface Visualizer',
        description: 'Plot 3D contour graphs of convex vs non-convex loss functions undergoing optimization.',
        expectedDeliverables: ['Python Matplotlib/Plotly 3D visualization', 'Convergence report'],
      },
    },
    {
      order: 3,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Data Wrangling, Cleaning & EDA with Pandas',
      description: 'Handling missing values, outlier detection, feature encoding, grouped aggregations, and exploratory visualization.',
      skillSlug: 'python',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Real-world data is noisy; 80% of data science is preparing high-quality data',
      unlocks: ['4'],
      baiustCourse: 'Aligned with Data Science Electives',
      resources: [
        { title: 'Pandas Modern Idioms & Best Practices', type: 'DOCS', url: 'https://pandas.pydata.org' },
      ],
      practiceTasks: [
        { title: 'Missing Data Imputation & One-Hot Pipeline', difficulty: 'MEDIUM', description: 'Clean a dirty CSV dataset without causing data leakage.' },
      ],
      miniProject: {
        title: 'BAIUST Student Career Progression Dataset EDA',
        description: 'Analyze student study hours, CGPA, and CP participation to discover statistical correlations.',
        expectedDeliverables: ['Jupyter Notebook with EDA insights', 'Executive summary charts'],
      },
    },
    {
      order: 4,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Classical Machine Learning with Scikit-Learn',
      description: 'Supervised learning (Random Forests, Gradient Boosting, SVM), Unsupervised (K-Means, PCA), and cross-validation.',
      skillSlug: 'ai-ml',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Proven baseline algorithms that solve 90% of tabular industrial problems',
      unlocks: ['5'],
      baiustCourse: 'Matches BAIUST CSE-411 (Artificial Intelligence)',
      resources: [
        { title: 'Scikit-Learn Machine Learning Map', type: 'DOCS', url: 'https://scikit-learn.org' },
      ],
      practiceTasks: [
        { title: 'Hyperparameter Tuning with GridSearch & Stratified K-Fold', difficulty: 'MEDIUM', description: 'Tune an XGBoost classifier while avoiding overfitting on imbalanced data.' },
      ],
      miniProject: {
        title: 'Academic At-Risk Prediction Model',
        description: 'Train a classifier predicting students needing academic intervention based on attendance and assignment patterns.',
        expectedDeliverables: ['Trained model pipeline', 'Confusion matrix and ROC-AUC evaluation report'],
      },
    },
    {
      order: 5,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Deep Learning & Neural Networks with PyTorch',
      description: 'Tensors, Autograd, custom PyTorch Modules, Loss Functions, AdamW optimizer, and Convolutional Neural Networks (CNNs).',
      skillSlug: 'ai-ml',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'PyTorch is the undisputed global standard for AI research and production deep learning',
      unlocks: ['6'],
      baiustCourse: 'Aligned with BAIUST Deep Learning Advanced Elective',
      resources: [
        { title: 'PyTorch Official 60-Minute Blitz', type: 'DOCS', url: 'https://pytorch.org/tutorials' },
      ],
      practiceTasks: [
        { title: 'Custom PyTorch Dataset & DataLoader Implementation', difficulty: 'MEDIUM', description: 'Build an efficient generator DataLoader with automated data augmentations.' },
      ],
      miniProject: {
        title: 'Campus Document & Exam Script OCR Classifier',
        description: 'Convolutional neural network that classifies scanned assignment covers and digitizes handwriting.',
        expectedDeliverables: ['PyTorch model checkpoint (.pt)', 'Accuracy and validation curves'],
      },
    },
    {
      order: 6,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Natural Language Processing & Transformers',
      description: 'Tokenization (BPE), Word Embeddings, Self-Attention mechanism, Transformer architecture, and Hugging Face models.',
      skillSlug: 'ai-ml',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Powers modern language understanding, code intelligence, and conversational agents',
      unlocks: ['7'],
      baiustCourse: 'Core for Modern AI Applications',
      resources: [
        { title: 'The Illustrated Transformer by Jay Alammar', type: 'ARTICLE', url: 'https://jalammar.github.io' },
        { title: 'Hugging Face NLP Course', type: 'DOCS', url: 'https://huggingface.co/learn' },
      ],
      practiceTasks: [
        { title: 'Fine-tune a DistilBERT Model for Text Classification', difficulty: 'HARD', description: 'Adapt a pre-trained transformer to classify student technical queries.' },
      ],
      miniProject: {
        title: 'BAIUST Course Syllabus Semantic Search Engine',
        description: 'Generate dense vector embeddings of university syllabi and search course topics with semantic similarity.',
        expectedDeliverables: ['Vector embedding pipeline', 'Top-K semantic retriever demonstration'],
      },
    },
    {
      order: 7,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Large Language Models (LLMs) & RAG Architecture',
      description: 'Retrieval Augmented Generation (RAG), vector databases (Chroma/Pinecone), prompt engineering, and LangChain/LlamaIndex.',
      skillSlug: 'ai-ml',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Cutting-edge enterprise standard for context-aware generative AI solutions',
      unlocks: ['8'],
      baiustCourse: 'Advanced Capstone Architecture',
      resources: [
        { title: 'Building Production RAG Systems Guide', type: 'ARTICLE', url: 'https://docs.llamaindex.ai' },
      ],
      practiceTasks: [
        { title: 'Implement Chunking & Hybrid Keyword+Vector Retrieval', difficulty: 'HARD', description: 'Mitigate hallucination through strict context window injection.' },
      ],
      miniProject: {
        title: 'BAIUST CSE Department AI Academic Advisor',
        description: 'Generative AI bot that answers student prerequisite, grading policy, and lab questions using department documents.',
        expectedDeliverables: ['Working RAG pipeline with vector DB', 'Source citation verification system'],
      },
    },
    {
      order: 8,
      level: 'LEVEL 4: CAPSTONE',
      title: 'AI Model Deployment with FastAPI & Docker',
      description: 'Model serialization (ONNX/TorchScript), asynchronous inference with FastAPI, containerization, and latency profiling.',
      skillSlug: 'docker',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Models must leave notebooks and serve real-time predictions in production APIs',
      unlocks: [],
      baiustCourse: 'Final Capstone Project Milestone',
      resources: [
        { title: 'FastAPI Production Machine Learning Deployment', type: 'DOCS', url: 'https://fastapi.tiangolo.com' },
      ],
      practiceTasks: [
        { title: 'Deploy a Containerized Inference API with Healthchecks', difficulty: 'HARD', description: 'Package a PyTorch model into a lightweight Docker image serving sub-100ms predictions.' },
      ],
      miniProject: {
        title: 'Production AI Inference Microservice',
        description: 'Deploy public REST API serving your fine-tuned model with Swagger docs and automated validation.',
        expectedDeliverables: ['Live FastAPI endpoint', 'Dockerized deployment with reproducible build'],
      },
    },
  ],

  'competitive-programming': [
    {
      order: 1,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'C++20 Fast I/O, STL Mastery & Bitmasking',
      description: 'Vectors, sets, unordered_maps, iterators, priority queues, bitwise operators, and time complexity analysis.',
      skillSlug: 'cpp',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'C++ STL gives zero-overhead performance required for contest speed and memory constraints',
      unlocks: ['2'],
      baiustCourse: 'Matches BAIUST CSE-111 (Structured Programming in C/C++)',
      resources: [
        { title: 'CP-Algorithms: C++ STL Best Practices', type: 'DOCS', url: 'https://cp-algorithms.com' },
      ],
      practiceTasks: [
        { title: 'Bitwise Subset Generation & Parity Checks', difficulty: 'EASY', description: 'Generate all 2^N subsets using bitwise shifts in O(2^N).' },
      ],
      miniProject: {
        title: 'Contest Template & Fast I/O Snippet Suite',
        description: 'Curated header template with custom hashers and macro utilities for rapid contest problem solving.',
        expectedDeliverables: ['Custom contest template file', 'Passing verification on 5 basic problems'],
      },
    },
    {
      order: 2,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Number Theory, Modular Arithmetic & Primality',
      description: 'Greatest Common Divisor (Euclid), Sieve of Eratosthenes, Modular Inverse (Fermat Little Theorem), and Prime Factorization.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Contest math questions appear in almost every Division 2/3 Codeforces contest',
      unlocks: ['3'],
      baiustCourse: 'Matches BAIUST CSE-123 (Discrete Mathematics)',
      resources: [
        { title: 'Sieve of Eratosthenes in O(N log log N)', type: 'ARTICLE', url: 'https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html' },
      ],
      practiceTasks: [
        { title: 'Compute nCr Mod 10^9+7 with Precomputed Factorials', difficulty: 'MEDIUM', description: 'Answer Q queries of combinations in O(1) time.' },
      ],
      miniProject: {
        title: 'Modular Arithmetic Mathematics Engine',
        description: 'Struct in C++ handling automated modulo arithmetic with operator overloading.',
        expectedDeliverables: ['Modular integer struct in C++', 'Test suite proving 0 overflow errors'],
      },
    },
    {
      order: 3,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Two Pointers, Sliding Window & Binary Search',
      description: 'Monotonic properties, lower_bound, upper_bound, and Binary Search on the Answer Space.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Transforms O(N^2) brute force problems into optimal O(N) or O(N log N) solutions',
      unlocks: ['4'],
      baiustCourse: 'Matches BAIUST CSE-211 (Algorithms)',
      resources: [
        { title: 'Binary Search on Answer Complete Guide', type: 'ARTICLE', url: 'https://codeforces.com' },
      ],
      practiceTasks: [
        { title: 'Aggressive Cows / Router Placement Problem', difficulty: 'MEDIUM', description: 'Maximize minimum distance between items using binary search on predicate.' },
      ],
      miniProject: {
        title: 'Binary Search Drill Tracker',
        description: 'Solve 10 classic binary search problems on Codeforces/LeetCode and log solutions.',
        expectedDeliverables: ['10 accepted solutions with complexity analysis', 'Progress verified in BAIUST CP tab'],
      },
    },
    {
      order: 4,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Graph Traversal (BFS, DFS) & Topological Sort',
      description: 'Adjacency lists, connected components, cycle detection, bipartite testing, Kahn’s algorithm for DAGs.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Graphs model real-world relationships, university course prerequisites, and network routing',
      unlocks: ['5'],
      baiustCourse: 'Core for BAIUST CSE-211 Midterm & Final Lab Exam',
      resources: [
        { title: 'Graph Theory Visualizer & Algorithm Guide', type: 'DOCS', url: 'https://visualgo.net/en/dfsbfs' },
      ],
      practiceTasks: [
        { title: 'Detect Cycle in Directed Graph via 3-Color DFS', difficulty: 'MEDIUM', description: 'Classify tree edges, back edges, and cross edges.' },
      ],
      miniProject: {
        title: 'BAIUST Course Prerequisite Validator Graph',
        description: 'Graph engine that detects cyclic prerequisite errors in university academic curriculum plans.',
        expectedDeliverables: ['Topological sort implementation in C++', 'Course order output or cycle error report'],
      },
    },
    {
      order: 5,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Shortest Paths & Disjoint Set Union (DSU)',
      description: 'Dijkstra with priority queue, Bellman-Ford, Floyd-Warshall, Kruskal’s Minimum Spanning Tree, DSU with path compression.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Essential for network optimization and competitive programming ranking',
      unlocks: ['6'],
      baiustCourse: 'Matches BAIUST CSE-211 Advanced Modules',
      resources: [
        { title: 'Dijkstra Shortest Path on Sparse Graphs', type: 'DOCS', url: 'https://cp-algorithms.com/graph/dijkstra_sparse.html' },
      ],
      practiceTasks: [
        { title: 'Implement DSU with Size and Rank Optimization', difficulty: 'MEDIUM', description: 'Handle union and find operations in nearly O(1) amortized time (Ackermann function).' },
      ],
      miniProject: {
        title: 'Campus Fiber Network Minimum Cost Spanning Tree',
        description: 'Calculate minimum cabling cost to interconnect all BAIUST campus halls using Kruskal algorithm.',
        expectedDeliverables: ['C++ Kruskal MST implementation with DSU', 'Formatted cost and edge output'],
      },
    },
    {
      order: 6,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Dynamic Programming (Knapsack, LIS & Bitmask)',
      description: 'State definitions, transitions, base cases, tabulation vs memoization, space optimization, and digit DP.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '4 weeks',
      why: 'DP is the single most tested topic in top-tier FAANG/high-scale engineering interviews',
      unlocks: ['7'],
      baiustCourse: 'Crucial for High Contest Performance & Placements',
      resources: [
        { title: 'AtCoder DP Contest (Educational 26 Problems)', type: 'ARTICLE', url: 'https://atcoder.jp/contests/dp' },
      ],
      practiceTasks: [
        { title: 'Longest Increasing Subsequence in O(N log N)', difficulty: 'HARD', description: 'Solve LIS using patience sorting and binary search lower_bound.' },
      ],
      miniProject: {
        title: 'Educational DP Contest Solver Portfolio',
        description: 'Solve first 10 problems of AtCoder Educational DP contest with verified solutions.',
        expectedDeliverables: ['Clean C++ implementations of Knapsack 1, Knapsack 2, LCS, Vacation', 'Complexity write-up'],
      },
    },
    {
      order: 7,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Segment Trees & Range Queries',
      description: 'Segment Trees, Point Updates, Range Minimum/Sum Queries, Lazy Propagation, and Fenwick (Binary Indexed) Trees.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Answers range queries and interval updates in O(log N) rather than slow O(N)',
      unlocks: ['8'],
      baiustCourse: 'Advanced Algorithms for Regional Contests',
      resources: [
        { title: 'Segment Tree with Lazy Propagation Complete Tutorial', type: 'DOCS', url: 'https://cp-algorithms.com/data_structures/segment_tree.html' },
      ],
      practiceTasks: [
        { title: 'Range Sum Query with Lazy Add & Set Operations', difficulty: 'HARD', description: 'Handle both range assignment and range addition in O(log N).' },
      ],
      miniProject: {
        title: 'Reusable Generic Segment Tree Header Library',
        description: 'Modern C++ template class supporting arbitrary monoids and associative operations.',
        expectedDeliverables: ['Header-only C++ SegmentTree library', 'Passing all test cases on Virtual Judge'],
      },
    },
    {
      order: 8,
      level: 'LEVEL 4: CAPSTONE',
      title: 'ICPC / NCPC Contest Readiness & Speed Drills',
      description: 'Team contest strategy, problem selection, debug under pressure, edge-case generation, and stress testing.',
      skillSlug: 'dsa',
      type: 'ASSESSMENT',
      estimatedTime: '2 weeks',
      why: 'Final capstone to qualify for national contests representing BAIUST',
      unlocks: [],
      baiustCourse: 'Qualifies Student for BAIUST University Contest Teams',
      resources: [
        { title: 'Stress Testing with Automated Scripting (Bash / Python)', type: 'ARTICLE', url: 'https://codeforces.com' },
      ],
      practiceTasks: [
        { title: 'Simulate 2-Hour Solo Virtual Contest on Codeforces', difficulty: 'HARD', description: 'Solve minimum 3 problems in 2 hours without viewing editorials.' },
      ],
      miniProject: {
        title: 'Contest Performance Verification Certificate',
        description: 'Attain 100+ solved problems across Virtual Judge, Codeforces, and the BAIUST judge platform.',
        expectedDeliverables: ['Verified CP progress badge on BAIUST CSE HUB', 'Competition readiness endorsement'],
      },
    },
  ],

  'cyber-security': [
    {
      order: 1,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Linux Kernel Essentials, File Permissions & Shell',
      description: 'POSIX file permissions, setuid/setgid bits, process management, pipes, and secure bash automation.',
      skillSlug: 'linux',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Linux is the primary operating environment for both security defense and ethical hacking tooling',
      unlocks: ['2'],
      baiustCourse: 'Matches BAIUST CSE-313 (Operating Systems Lab)',
      resources: [
        { title: 'OverTheWire Bandit Wargame (Levels 1 to 20)', type: 'DOCS', url: 'https://overthewire.org/wargames/bandit/' },
      ],
      practiceTasks: [
        { title: 'Find SUID Binaries and Audit Vulnerable Executables', difficulty: 'EASY', description: 'Use find command to audit privilege escalation misconfigurations.' },
      ],
      miniProject: {
        title: 'Automated Linux Server Security Hardening Script',
        description: 'Bash script that audits open ports, disables root SSH login, and configures UFW firewall rules.',
        expectedDeliverables: ['Hardening bash script with logging', 'Audit report on test Ubuntu VM'],
      },
    },
    {
      order: 2,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Computer Networks, OSI & Packet Inspection',
      description: 'TCP 3-way handshake, UDP, IP headers, DNS, HTTP/HTTPS, ARP spoofing, and Wireshark traffic analysis.',
      skillSlug: 'cybersecurity',
      type: 'THEORY',
      estimatedTime: '2 weeks',
      why: 'You cannot defend or attack a network unless you understand packet structures down to the byte',
      unlocks: ['3'],
      baiustCourse: 'Matches BAIUST CSE-323 (Computer Networks)',
      resources: [
        { title: 'Wireshark Packet Analysis Masterclass', type: 'VIDEO', url: 'https://wireshark.org' },
      ],
      practiceTasks: [
        { title: 'Capture and Reconstruct an Unencrypted HTTP Session in Wireshark', difficulty: 'MEDIUM', description: 'Extract transferred image files and cleartext credentials from a .pcap file.' },
      ],
      miniProject: {
        title: 'Campus Network Traffic PCAP Inspection Report',
        description: 'Analyze sample network traffic capture to detect port scanning and anomalous DNS exfiltration.',
        expectedDeliverables: ['Wireshark filter cheat sheet', 'Incident analysis report'],
      },
    },
    {
      order: 3,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Applied Cryptography & Authentication Protocols',
      description: 'Symmetric encryption (AES-GCM), Asymmetric (RSA/ECC), Hash functions (SHA-256), HMAC, and Digital Signatures.',
      skillSlug: 'cybersecurity',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Cryptography guarantees confidentiality, data integrity, and authentic identity verification',
      unlocks: ['4'],
      baiustCourse: 'Matches BAIUST Cryptography & Network Security',
      resources: [
        { title: 'Cryptohack Interactive Cryptography Platform', type: 'DOCS', url: 'https://cryptohack.org' },
      ],
      practiceTasks: [
        { title: 'Implement HMAC-SHA256 Token Verification from Scratch', difficulty: 'MEDIUM', description: 'Verify cryptographic signatures using constant-time comparison to prevent timing attacks.' },
      ],
      miniProject: {
        title: 'End-to-End Encrypted File Transfer Tool',
        description: 'Python utility encrypting student documents using hybrid RSA + AES encryption before transmission.',
        expectedDeliverables: ['Cryptographically secure CLI tool', 'Verification proof showing zero plaintext leakage'],
      },
    },
    {
      order: 4,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'OWASP Top 10 Web Vulnerabilities & Exploitation',
      description: 'SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, Insecure Direct Object References (IDOR), and SSRF.',
      skillSlug: 'rest-api',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Web applications are the most attacked vector on the internet today',
      unlocks: ['5'],
      baiustCourse: 'Essential for Secure Web Application Development',
      resources: [
        { title: 'PortSwigger Web Security Academy', type: 'DOCS', url: 'https://portswigger.net/web-security' },
      ],
      practiceTasks: [
        { title: 'Bypass Authentication with Blind SQL Injection on Test Lab', difficulty: 'HARD', description: 'Extract database password hash character by character using boolean inference.' },
      ],
      miniProject: {
        title: 'Vulnerable University Portal Lab & Patch Guide',
        description: 'Demonstrate XSS and SQLi vulnerabilities in a sandboxed app, then write the secure parameterized fixes.',
        expectedDeliverables: ['Vulnerability reproduction steps', 'Remediation code diffs with explanation'],
      },
    },
    {
      order: 5,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Network Penetration Testing & Reconnaissance',
      description: 'Active and passive recon, Nmap port scanning scripts, service enumeration, Metasploit, and vulnerability scanners.',
      skillSlug: 'cybersecurity',
      type: 'PROJECT',
      estimatedTime: '3 weeks',
      why: 'Simulates real-world adversary reconnaissance to uncover exposed infrastructure weaknesses',
      unlocks: ['6'],
      baiustCourse: 'Aligned with Ethical Hacking Labs',
      resources: [
        { title: 'Nmap Network Scanning Official Handbook', type: 'DOCS', url: 'https://nmap.org/book/' },
      ],
      practiceTasks: [
        { title: 'Perform Stealth SYN Scan & OS Detection on VulnHub Machine', difficulty: 'MEDIUM', description: 'Map services running on target IP without triggering firewall rate limits.' },
      ],
      miniProject: {
        title: 'Comprehensive Vulnerability Assessment Report',
        description: 'Execute ethical penetration test on a deliberately vulnerable CTF virtual machine.',
        expectedDeliverables: ['Full executive penetration test report', 'CVSS vulnerability severity scores'],
      },
    },
    {
      order: 6,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Reverse Engineering & Binary Exploitation',
      description: 'Assembly x86-64 fundamentals, stack frame layouts, buffer overflows, GDB debugger, and Ghidra disassembler.',
      skillSlug: 'cpp',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Uncovers how binaries execute at machine level and how memory safety violations occur',
      unlocks: ['7'],
      baiustCourse: 'Matches BAIUST CSE-311 (Microprocessors & Assembly Language)',
      resources: [
        { title: 'Nightmare: Intro to Binary Exploitation / Reverse Engineering', type: 'DOCS', url: 'https://guyinatuxedo.github.io' },
      ],
      practiceTasks: [
        { title: 'Overwriting Return Address in Sandboxed 32-bit Binary', difficulty: 'HARD', description: 'Redirect control flow to an unreachable win() function via buffer overflow.' },
      ],
      miniProject: {
        title: 'CrackMe Reverse Engineering Solution',
        description: 'Disassemble a compiled C++ binary using Ghidra and discover the secret validation algorithm.',
        expectedDeliverables: ['Decompiled pseudocode analysis', 'Keygen script generating valid license keys'],
      },
    },
    {
      order: 7,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Capture The Flag (CTF) Competitive Mastery',
      description: 'Solving multi-category challenges across Web, Forensics, Crypto, Reverse Engineering, and PWN under time limits.',
      skillSlug: 'cybersecurity',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Demonstrates proven hands-on security capability recognized by international industry leaders',
      unlocks: ['8'],
      baiustCourse: 'Represents BAIUST at National Cybersecurity Contests',
      resources: [
        { title: 'PicoCTF & HackTheBox Training Labs', type: 'DOCS', url: 'https://picoctf.org' },
      ],
      practiceTasks: [
        { title: 'Solve 5 HackTheBox "Easy" Tier Machine Challenges', difficulty: 'HARD', description: 'Obtain user.txt and root.txt flags on audited machines.' },
      ],
      miniProject: {
        title: 'CTF Write-up Portfolio',
        description: 'Publish 3 detailed technical write-ups detailing challenge exploitation and defense lessons.',
        expectedDeliverables: ['Detailed GitHub markdown write-ups', 'Proof-of-concept exploit scripts'],
      },
    },
    {
      order: 8,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Security Operations & Defensive Architecture',
      description: 'Incident response, SIEM log analysis, intrusion detection (Snort/Suricata), and defense-in-depth design.',
      skillSlug: 'cybersecurity',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Prepares for roles in Cyber Defense, SOC Analysis, and Enterprise Security Engineering',
      unlocks: [],
      baiustCourse: 'Final Capstone Security Certification',
      resources: [
        { title: 'SOC Core Skills & Incident Response Guide', type: 'ARTICLE', url: 'https://github.com' },
      ],
      practiceTasks: [
        { title: 'Write Snort Rules to Detect Malicious SQLi Payloads', difficulty: 'HARD', description: 'Formulate network signature rules that alert on common automated sqlmap queries.' },
      ],
      miniProject: {
        title: 'BAIUST CSE Platform Threat Model & Audit',
        description: 'Conduct STRIDE threat modeling analysis on the university CSE platform and verify safeguards.',
        expectedDeliverables: ['STRIDE Threat model diagram', 'Mitigation architecture specification'],
      },
    },
  ],

  'devops-cloud': [
    {
      order: 1,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Linux System Administration & Automation',
      description: 'Systemd service management, journalctl logging, cron jobs, user groups, and bash automation scripts.',
      skillSlug: 'linux',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Almost 100% of cloud servers and container hosts run on Linux',
      unlocks: ['2'],
      baiustCourse: 'Matches BAIUST CSE-313 (Operating Systems Lab)',
      resources: [
        { title: 'Linux Journey: System Administration', type: 'DOCS', url: 'https://linuxjourney.com' },
      ],
      practiceTasks: [
        { title: 'Create a Systemd Service with Automatic Restart on Failure', difficulty: 'EASY', description: 'Configure custom service unit file with resource limits.' },
      ],
      miniProject: {
        title: 'Automated Server Health Telemetry Daemon',
        description: 'Bash script that logs CPU, RAM, disk usage, and sends email alerts when thresholds exceed 90%.',
        expectedDeliverables: ['Bash telemetry daemon', 'Log rotation configuration'],
      },
    },
    {
      order: 2,
      level: 'LEVEL 1: FOUNDATIONS',
      title: 'Git Version Control & Trunk-Based Team Workflows',
      description: 'Git rebase vs merge, cherry-pick, resolving merge conflicts, branch protection rules, and PR review etiquette.',
      skillSlug: 'git',
      type: 'CODE',
      estimatedTime: '1-2 weeks',
      why: 'Software engineering is collaborative; git mastery is non-negotiable in production teams',
      unlocks: ['3'],
      baiustCourse: 'Core Foundation for All University Group Projects',
      resources: [
        { title: 'Pro Git Official Book', type: 'DOCS', url: 'https://git-scm.com/book/en/v2' },
      ],
      practiceTasks: [
        { title: 'Interactive Rebase & Commit Squash Practice', difficulty: 'EASY', description: 'Clean up a messy feature branch into clean, atomic commits.' },
      ],
      miniProject: {
        title: 'Team Monorepo Git Strategy Guide',
        description: 'Document standard branching strategy, commit conventions (Conventional Commits), and PR templates.',
        expectedDeliverables: ['.github/PULL_REQUEST_TEMPLATE.md', 'CONTRIBUTING.md guidelines'],
      },
    },
    {
      order: 3,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'Docker Containerization & Multi-Stage Builds',
      description: 'Containers vs VMs, namespaces, cgroups, writing efficient Dockerfiles, .dockerignore, and Docker Compose.',
      skillSlug: 'docker',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Guarantees reproducible runtime environments from local development to production cloud',
      unlocks: ['4'],
      baiustCourse: 'Essential for Software Engineering Best Practices',
      resources: [
        { title: 'Docker Official Documentation & Getting Started', type: 'DOCS', url: 'https://docs.docker.com' },
      ],
      practiceTasks: [
        { title: 'Multi-Container Stack with Docker Compose', difficulty: 'MEDIUM', description: 'Orchestrate Next.js frontend, NestJS backend, and PostgreSQL DB with named volumes.' },
      ],
      miniProject: {
        title: 'Production-Ready Polyglot Docker Compose Stack',
        description: 'Create automated development environment spinning up web, API, database, and Redis cache with one command.',
        expectedDeliverables: ['docker-compose.yml with healthchecks', 'Optimized multi-stage Dockerfiles'],
      },
    },
    {
      order: 4,
      level: 'LEVEL 2: CORE MASTERY',
      title: 'CI/CD Automation with GitHub Actions',
      description: 'Workflows, triggers, matrix builds, secrets management, caching dependencies, and automatic container publishing.',
      skillSlug: 'docker',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Automates testing and deployment so developers can ship features continuously with confidence',
      unlocks: ['5'],
      baiustCourse: 'Industry Standard DevOps Pipeline',
      resources: [
        { title: 'GitHub Actions Documentation', type: 'DOCS', url: 'https://docs.github.com/en/actions' },
      ],
      practiceTasks: [
        { title: 'Cache npm / yarn Dependencies in GitHub Actions', difficulty: 'MEDIUM', description: 'Cut pipeline build times by 60% using actions/cache.' },
      ],
      miniProject: {
        title: 'Automated CI/CD Pipeline to Docker Hub',
        description: 'Workflow that tests every commit, builds Docker image, and pushes tagged release to Docker Hub.',
        expectedDeliverables: ['.github/workflows/deploy.yml', 'Automated image publishing badge'],
      },
    },
    {
      order: 5,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Kubernetes Container Orchestration',
      description: 'Pods, ReplicaSets, Deployments, Services (ClusterIP/NodePort/LoadBalancer), ConfigMaps, Secrets, and Ingress controllers.',
      skillSlug: 'docker',
      type: 'PROJECT',
      estimatedTime: '3 weeks',
      why: 'The industry-standard operating system of the modern cloud for self-healing, scalable microservices',
      unlocks: ['6'],
      baiustCourse: 'Matches BAIUST CSE-422 (Cloud Computing)',
      resources: [
        { title: 'Kubernetes The Hard Way by Kelsey Hightower', type: 'DOCS', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way' },
      ],
      practiceTasks: [
        { title: 'Deploy a Zero-Downtime Rolling Update on Minikube', difficulty: 'HARD', description: 'Upgrade application version with zero dropped connections using readiness probes.' },
      ],
      miniProject: {
        title: 'Kubernetes Deployment Manifests for University Hub',
        description: 'Write production K8s YAML manifests including Horizontal Pod Autoscaler (HPA) and Ingress rules.',
        expectedDeliverables: ['Complete k8s/ directory with manifests', 'Successful deployment verification log'],
      },
    },
    {
      order: 6,
      level: 'LEVEL 3: PRODUCTION',
      title: 'Infrastructure as Code (IaC) with Terraform',
      description: 'Declarative cloud provisioning, state files, providers (AWS/GCP/Azure), modules, and drift detection.',
      skillSlug: 'system-design',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Eliminates manual cloud console clicking and manages infrastructure like software code',
      unlocks: ['7'],
      baiustCourse: 'Enterprise Cloud Architecture',
      resources: [
        { title: 'HashiCorp Terraform Associate Tutorials', type: 'DOCS', url: 'https://developer.hashicorp.com/terraform' },
      ],
      practiceTasks: [
        { title: 'Provision a Cloud VPC, Subnets, and Virtual Machine in Terraform', difficulty: 'HARD', description: 'Create reproducible cloud infrastructure with modular variables.' },
      ],
      miniProject: {
        title: 'Terraform Cloud Infrastructure Blueprint',
        description: 'Complete Terraform blueprint provisioning cloud database and compute nodes with security groups.',
        expectedDeliverables: ['main.tf, variables.tf, outputs.tf configuration', 'Terraform plan audit report'],
      },
    },
    {
      order: 7,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Observability: Prometheus, Grafana & Logging',
      description: 'Metrics collection (RED method), Grafana dashboards, alerting rules, distributed tracing, and centralized logging.',
      skillSlug: 'system-design',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'You cannot fix what you cannot measure; observability is critical for reliability engineering',
      unlocks: ['8'],
      baiustCourse: 'Site Reliability Engineering (SRE)',
      resources: [
        { title: 'Prometheus & Grafana Getting Started Guide', type: 'DOCS', url: 'https://prometheus.io' },
      ],
      practiceTasks: [
        { title: 'Instrument NestJS / Node Service with Prometheus Metrics', difficulty: 'MEDIUM', description: 'Export HTTP request durations, status code counts, and active connections.' },
      ],
      miniProject: {
        title: 'Live Server Health & Traffic Dashboard',
        description: 'Configure Grafana dashboard displaying real-time API latency percentiles (p50, p95, p99) and CPU loads.',
        expectedDeliverables: ['Grafana dashboard JSON export', 'Alerting rule configuration'],
      },
    },
    {
      order: 8,
      level: 'LEVEL 4: CAPSTONE',
      title: 'Site Reliability Engineering (SRE) & Chaos Resilience',
      description: 'Service Level Objectives (SLOs), error budgets, disaster recovery drills, and chaos engineering simulations.',
      skillSlug: 'system-design',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Final capstone proving you can manage multi-tier cloud infrastructure with 99.9% uptime',
      unlocks: [],
      baiustCourse: 'Final Capstone DevOps Certification',
      resources: [
        { title: 'Google SRE Book (Free Official Edition)', type: 'DOCS', url: 'https://sre.google/sre-book/table-of-contents/' },
      ],
      practiceTasks: [
        { title: 'Simulate Database Failure and Verify Automated Failover', difficulty: 'HARD', description: 'Ensure read-replicas take over without user-facing 500 errors.' },
      ],
      miniProject: {
        title: 'Production Infrastructure Architecture Portfolio',
        description: 'End-to-end architecture documentation with SLA/SLO definitions, runbooks, and disaster recovery playbooks.',
        expectedDeliverables: ['SRE Runbook document', 'Architecture diagram with zero single-point-of-failure verification'],
      },
    },
  ],
};

@Injectable()
export class RoadmapService {
  constructor(
    private prisma: PrismaService,
    private skillsService: SkillsService,
  ) {}

  async getTrackCatalog() {
    return TRACK_CATALOG;
  }

  async getActiveRoadmap(userId: string) {
    try {
      let roadmap = await this.prisma.personalizedRoadmap.findFirst({
        where: { userId, status: 'ACTIVE' },
        include: {
          milestones: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!roadmap) {
        roadmap = (await this.generatePersonalizedRoadmap(userId, 'full-stack-developer')) as any;
      }

      if (roadmap) return roadmap;
    } catch (e) {
      // Fallback below
    }

    return this.getDefaultFallbackRoadmap(userId, 'full-stack-developer') as any;
  }

  private getDefaultFallbackRoadmap(userId: string, targetRoleSlug: string = 'full-stack-developer') {
    const normalizedRole = targetRoleSlug.toLowerCase().replace(/\s+/g, '-');
    const templates = BASE_ROADMAP_TEMPLATES[normalizedRole] || BASE_ROADMAP_TEMPLATES['full-stack-developer'];
    return {
      id: `roadmap-fallback-${userId}`,
      userId,
      targetRole: normalizedRole,
      status: 'ACTIVE',
      createdAt: new Date(),
      milestones: templates.map((tmpl, idx) => ({
        id: `ms-${normalizedRole}-${idx + 1}`,
        roadmapId: `roadmap-fallback-${userId}`,
        order: tmpl.order,
        title: tmpl.title,
        description: tmpl.description,
        skillSlug: tmpl.skillSlug,
        type: tmpl.type,
        estimatedTime: tmpl.estimatedTime,
        why: tmpl.why,
        status: idx === 0 ? 'COMPLETED' : idx === 1 ? 'CURRENT' : 'UPCOMING',
        unlocks: tmpl.unlocks,
        level: tmpl.level,
        baiustCourse: tmpl.baiustCourse,
        resources: tmpl.resources,
        practiceTasks: tmpl.practiceTasks,
        miniProject: tmpl.miniProject,
      })),
    };
  }

  async generatePersonalizedRoadmap(userId: string, targetRoleSlug: string = 'full-stack-developer') {
    const normalizedRole = (targetRoleSlug || 'full-stack-developer').toLowerCase().replace(/\s+/g, '-');
    const templates = BASE_ROADMAP_TEMPLATES[normalizedRole] || BASE_ROADMAP_TEMPLATES['full-stack-developer'];

    try {
      // Retrieve user skill profile to personalize unlock statuses
      const userStates = await this.prisma.studentSkillState.findMany({
        where: { userId },
      });
      const stateMap = new Map<string, number>();
      for (const s of userStates) {
        stateMap.set(s.skillSlug, s.knowledgeScore);
      }

      // Archive any old active roadmap
      await this.prisma.personalizedRoadmap.updateMany({
        where: { userId, status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });

      // Also update career profile targetRole
      await this.prisma.careerProfile.upsert({
        where: { userId },
        update: { targetRole: normalizedRole },
        create: { userId, targetRole: normalizedRole, targetRoleName: normalizedRole },
      }).catch(() => null);

      // Create new roadmap
      const newRoadmap = await this.prisma.personalizedRoadmap.create({
        data: {
          userId,
          targetRole: normalizedRole,
          status: 'ACTIVE',
        },
      });

      // Create milestones with intelligent adaptive statuses
      let hasCurrent = false;

      for (let i = 0; i < templates.length; i++) {
        const tmpl = templates[i];
        const existingScore = stateMap.get(tmpl.skillSlug) || 0;

        let status = 'UPCOMING';
        if (existingScore >= 75) {
          status = 'COMPLETED'; // Already mastered
        } else if (!hasCurrent) {
          status = 'CURRENT'; // First uncompleted item becomes current focus
          hasCurrent = true;
        } else {
          status = 'UPCOMING';
        }

        await this.prisma.roadmapMilestone.create({
          data: {
            roadmapId: newRoadmap.id,
            order: tmpl.order,
            title: tmpl.title,
            description: tmpl.description,
            skillSlug: tmpl.skillSlug,
            type: tmpl.type,
            estimatedTime: tmpl.estimatedTime,
            why: tmpl.why,
            status,
            unlocks: tmpl.unlocks,
          },
        });
      }

      const activeRoadmap = await this.prisma.personalizedRoadmap.findUnique({
        where: { id: newRoadmap.id },
        include: {
          milestones: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (activeRoadmap) {
        // Enrich with templates metadata
        const enriched = {
          ...activeRoadmap,
          milestones: activeRoadmap.milestones.map((m, idx) => ({
            ...m,
            level: templates[idx]?.level || 'CORE',
            baiustCourse: templates[idx]?.baiustCourse,
            resources: templates[idx]?.resources,
            practiceTasks: templates[idx]?.practiceTasks,
            miniProject: templates[idx]?.miniProject,
          })),
        };
        return enriched;
      }
    } catch (e) {
      return this.getDefaultFallbackRoadmap(userId, normalizedRole) as any;
    }

    return this.getDefaultFallbackRoadmap(userId, normalizedRole) as any;
  }

  async toggleMilestone(userId: string, milestoneId: string) {
    try {
      const milestone = await this.prisma.roadmapMilestone.findUnique({
        where: { id: milestoneId },
        include: { roadmap: true },
      });

      if (milestone && milestone.roadmap.userId === userId) {
        const nextStatus = milestone.status === 'COMPLETED' ? 'CURRENT' : 'COMPLETED';

        const updated = await this.prisma.roadmapMilestone.update({
          where: { id: milestoneId },
          data: { status: nextStatus },
        });

        // Award XP and increment practice points
        if (nextStatus === 'COMPLETED') {
          try {
            await this.prisma.userGamification.upsert({
              where: { userId },
              update: {
                totalXp: { increment: 100 },
                lastActiveAt: new Date(),
              },
              create: {
                userId,
                totalXp: 100,
                currentLevel: 1,
                gemsBalance: 25,
              },
            });

            await this.prisma.xPTransaction.create({
              data: {
                userId,
                amount: 100,
                actionType: 'MILESTONE_UNLOCKED',
                referenceId: milestoneId,
                description: `Completed roadmap milestone: ${milestone.title}`,
              },
            });

            if (milestone.skillSlug) {
              await this.prisma.studentSkillState.upsert({
                where: {
                  userId_skillSlug: {
                    userId,
                    skillSlug: milestone.skillSlug,
                  },
                },
                update: {
                  practiceScore: { increment: 15 },
                  lastReviewed: new Date(),
                },
                create: {
                  userId,
                  skillSlug: milestone.skillSlug,
                  knowledgeScore: 50,
                  practiceScore: 25,
                  projectScore: 0,
                  evidenceScore: 0,
                },
              });
            }
          } catch (e) {
            // Non-blocking
          }
        }

        return updated;
      }
    } catch (e) {
      // In-memory toggle fallback handled by frontend
    }

    return { id: milestoneId, status: 'COMPLETED' };
  }
}
