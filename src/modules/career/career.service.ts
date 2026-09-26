import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CareerTrackSummary {
  id: string;
  slug: string;
  title: string;
  code: string;
  description: string;
  totalModules: number;
  estimatedMonths: number;
  highlightSkills: string[];
  modules: Array<{
    id: string;
    title: string;
    level: string;
    description: string;
    topics: string[];
  }>;
}

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  public readonly tracks: CareerTrackSummary[] = [
    {
      id: 'track-01',
      slug: 'competitive-programming',
      code: '01',
      title: 'COMPETITIVE PROGRAMMING',
      description: 'Master algorithmic problem solving, time complexities, advanced data structures, and prepare for ICPC, NCPC, Codeforces and LeetCode rating goals.',
      totalModules: 14,
      estimatedMonths: 12,
      highlightSkills: ['C++', 'STL', 'Number Theory', 'DP', 'Graph Theory', 'Segment Trees'],
      modules: [
        { id: 'm-cp-1', title: 'C++ Fast I/O & Advanced STL', level: 'Beginner', description: 'Vectors, sets, maps, priority queues, and iterators', topics: ['vector', 'unordered_map', 'priority_queue', 'sort lambda'] },
        { id: 'm-cp-2', title: 'Complexity & Math Foundations', level: 'Beginner', description: 'Time & space complexity, modulo arithmetic, gcd, primes', topics: ['Big-O', 'Sieve of Eratosthenes', 'Binary Exponentiation'] },
        { id: 'm-cp-3', title: 'Two Pointers & Binary Search', level: 'Intermediate', description: 'Sliding window, binary search on answer spaces', topics: ['Monotonic functions', 'Upper/Lower Bound', 'Two Pointers'] },
        { id: 'm-cp-4', title: 'Dynamic Programming Foundations', level: 'Intermediate', description: 'Memoization, tabulation, state transitions', topics: ['Knapsack', 'LCS', 'LIS', 'Coin Change'] },
        { id: 'm-cp-5', title: 'Graph Algorithms & Trees', level: 'Advanced', description: 'BFS, DFS, Dijkstra, Bellman-Ford, Tree DP', topics: ['Shortest Paths', 'Disjoint Set Union', 'LCA'] },
        { id: 'm-cp-6', title: 'Range Queries & Segment Tree', level: 'Advanced', description: 'Point update, range query, lazy propagation', topics: ['Fenwick Tree', 'Segment Tree', 'Sparse Table'] },
      ],
    },
    {
      id: 'track-02',
      slug: 'software-engineering',
      code: '02',
      title: 'SOFTWARE ENGINEERING',
      description: 'Build enterprise-grade distributed systems, design patterns, clean architecture, automated testing, and scalable backend services.',
      totalModules: 12,
      estimatedMonths: 9,
      highlightSkills: ['System Design', 'Design Patterns', 'Microservices', 'Clean Architecture', 'Testing'],
      modules: [
        { id: 'm-se-1', title: 'Object-Oriented Design & SOLID', level: 'Beginner', description: 'Core principles of scalable software construction', topics: ['Single Responsibility', 'Open-Closed', 'Liskov', 'Interface Segregation', 'Dependency Inversion'] },
        { id: 'm-se-2', title: 'Design Patterns in Practice', level: 'Intermediate', description: 'Creational, Structural, and Behavioral patterns', topics: ['Factory', 'Singleton', 'Observer', 'Strategy', 'Repository Pattern'] },
        { id: 'm-se-3', title: 'Database Design & Indexing Internals', level: 'Intermediate', description: 'ACID properties, B-Tree indexes, query optimization', topics: ['Normalization', 'Transactions', 'Query Execution Plan'] },
        { id: 'm-se-4', title: 'Distributed Systems & Microservices', level: 'Advanced', description: 'Event sourcing, message brokers, caching, consistency', topics: ['CAP Theorem', 'Kafka/RabbitMQ', 'Redis Caching', 'Saga Pattern'] },
      ],
    },
    {
      id: 'track-03',
      slug: 'full-stack-development',
      code: '03',
      title: 'FULL STACK DEVELOPMENT',
      description: 'From modern React and Next.js frontends to NestJS, REST/GraphQL APIs, Prisma ORM, and cloud containerization.',
      totalModules: 16,
      estimatedMonths: 8,
      highlightSkills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Tailwind'],
      modules: [
        { id: 'm-fs-1', title: 'HTML5, Modern CSS & Responsive Layouts', level: 'Beginner', description: 'Semantic markup, Flexbox, CSS Grid, mobile-first design', topics: ['Flexbox', 'Grid', 'Semantic HTML', 'CSS Variables'] },
        { id: 'm-fs-2', title: 'JavaScript & TypeScript Mastery', level: 'Beginner', description: 'Async/await, Event Loop, strict typing, generics', topics: ['Promises', 'Generics', 'Type Narrowing', 'Modules'] },
        { id: 'm-fs-3', title: 'React 19 & Next.js App Router', level: 'Intermediate', description: 'Server Components, Hooks, State management, routing', topics: ['Server Components', 'useActionState', 'Zustand', 'Turbopack'] },
        { id: 'm-fs-4', title: 'Backend APIs with NestJS & Express', level: 'Intermediate', description: 'Dependency injection, validation pipes, interceptors', topics: ['Controllers', 'Guards', 'DTOs', 'Swagger'] },
        { id: 'm-fs-5', title: 'Relational DBs, PostgreSQL & Prisma', level: 'Intermediate', description: 'Schema modeling, migrations, joins, constraints', topics: ['Prisma Schema', 'Foreign Keys', 'Indexes', 'Seeding'] },
        { id: 'm-fs-6', title: 'Authentication, Security & Deployment', level: 'Advanced', description: 'JWT tokens, RBAC, OAuth2, Docker, CI/CD pipelines', topics: ['JWT/Refresh', 'Dockerize', 'GitHub Actions', 'Vercel/Fly.io'] },
      ],
    },
    {
      id: 'track-04',
      slug: 'ai-machine-learning',
      code: '04',
      title: 'AI / MACHINE LEARNING',
      description: 'Explore neural networks, computer vision, natural language processing, LLM fine-tuning, and modern RAG architectures.',
      totalModules: 14,
      estimatedMonths: 10,
      highlightSkills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Transformers', 'LangChain'],
      modules: [
        { id: 'm-ai-1', title: 'Python for Scientific Computing', level: 'Beginner', description: 'NumPy, Pandas, Matplotlib, linear algebra basics', topics: ['Vectorization', 'Matrix Operations', 'Data Cleaning'] },
        { id: 'm-ai-2', title: 'Classical Machine Learning', level: 'Intermediate', description: 'Linear regression, decision trees, random forests, clustering', topics: ['Cost Functions', 'Gradient Descent', 'Ensemble Methods'] },
        { id: 'm-ai-3', title: 'Deep Learning & Neural Networks', level: 'Intermediate', description: 'Backpropagation, PyTorch tensors, activation functions', topics: ['CNNs', 'RNNs', 'PyTorch Training Loops'] },
        { id: 'm-ai-4', title: 'Modern NLP, Transformers & LLMs', level: 'Advanced', description: 'Attention mechanisms, BERT, GPT, fine-tuning and RAG', topics: ['Self-Attention', 'Hugging Face', 'Vector DBs', 'RAG'] },
      ],
    },
    {
      id: 'track-05',
      slug: 'data-science',
      code: '05',
      title: 'DATA SCIENCE',
      description: 'Transform raw data into strategic intelligence using statistical modeling, exploratory analysis, and visualization pipelines.',
      totalModules: 11,
      estimatedMonths: 8,
      highlightSkills: ['SQL', 'Python', 'Exploratory Analysis', 'Statistics', 'Tableau', 'PowerBI'],
      modules: [
        { id: 'm-ds-1', title: 'Advanced SQL & Data Wrangling', level: 'Beginner', description: 'Window functions, CTEs, aggregation, data munging', topics: ['PARTITION BY', 'CTEs', 'Pandas Merges'] },
        { id: 'm-ds-2', title: 'Applied Probability & Statistics', level: 'Intermediate', description: 'Hypothesis testing, distributions, p-values, A/B testing', topics: ['Normal Distribution', 'T-Tests', 'Confidence Intervals'] },
      ],
    },
    {
      id: 'track-06',
      slug: 'cyber-security',
      code: '06',
      title: 'CYBER SECURITY',
      description: 'Master offensive and defensive security, penetration testing, cryptography, network defense, and secure coding practices.',
      totalModules: 13,
      estimatedMonths: 10,
      highlightSkills: ['Linux', 'Network Protocols', 'Wireshark', 'Burp Suite', 'Cryptography', 'OWASP Top 10'],
      modules: [
        { id: 'm-cs-1', title: 'Networking & Linux Systems', level: 'Beginner', description: 'TCP/IP model, DNS, subnets, Linux permissions and bash', topics: ['OSI Layers', 'Packet Analysis', 'Bash Scripting'] },
        { id: 'm-cs-2', title: 'Web Application Security', level: 'Intermediate', description: 'OWASP Top 10 vulnerabilities and exploit mitigations', topics: ['SQLi', 'XSS', 'CSRF', 'SSRF', 'IDOR'] },
      ],
    },
    {
      id: 'track-07',
      slug: 'mobile-development',
      code: '07',
      title: 'MOBILE DEVELOPMENT',
      description: 'Build native and cross-platform mobile apps for Android and iOS using Flutter, Kotlin, and React Native.',
      totalModules: 10,
      estimatedMonths: 7,
      highlightSkills: ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Mobile UI', 'Offline Sync'],
      modules: [
        { id: 'm-mob-1', title: 'Cross-Platform App Development', level: 'Intermediate', description: 'State management, navigation, REST APIs, local SQLite', topics: ['Provider/Bloc', 'Async Storage', 'Responsive Screens'] },
      ],
    },
    {
      id: 'track-08',
      slug: 'devops-cloud',
      code: '08',
      title: 'DEVOPS / CLOUD',
      description: 'Containerization, Kubernetes orchestration, CI/CD automation, Infrastructure as Code, and AWS/Cloudflare architecture.',
      totalModules: 12,
      estimatedMonths: 9,
      highlightSkills: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Nginx'],
      modules: [
        { id: 'm-do-1', title: 'Docker Containers & Compose', level: 'Beginner', description: 'Multi-stage builds, networking, persistent volumes', topics: ['Dockerfile', 'Docker Compose', 'Image Optimization'] },
        { id: 'm-do-2', title: 'CI/CD Automation & Cloud Deployment', level: 'Intermediate', description: 'GitHub Actions, automated testing, cloud VMs', topics: ['Pipelines', 'SSH Deployment', 'SSL Setup'] },
      ],
    },
    {
      id: 'track-09',
      slug: 'ui-ux-engineering',
      code: '09',
      title: 'UI/UX DESIGN & DESIGN SYSTEMS',
      description: 'Figma prototyping, human-computer interaction principles, accessibility (WCAG), and component library engineering.',
      totalModules: 9,
      estimatedMonths: 6,
      highlightSkills: ['Figma', 'Design Systems', 'WCAG', 'Typography', 'Micro-interactions', 'Tailwind'],
      modules: [
        { id: 'm-ux-1', title: 'Design Foundations & Heuristics', level: 'Beginner', description: 'Visual hierarchy, color theory, layout grids, usability testing', topics: ['Fitts Law', 'Contrast Ratios', 'Typography Scales'] },
      ],
    },
    {
      id: 'track-10',
      slug: 'other-cse-careers',
      code: '10',
      title: 'OTHER CSE SPECIALIZATIONS',
      description: 'Game development with Unity, Embedded Systems/IoT with Arduino/ESP32, Quantum Computing, and QA Automation.',
      totalModules: 8,
      estimatedMonths: 6,
      highlightSkills: ['C#', 'IoT', 'Embedded C', 'Robotics', 'Cypress', 'Playwright'],
      modules: [
        { id: 'm-oth-1', title: 'Embedded Systems & Hardware Interfacing', level: 'Beginner', description: 'Microcontrollers, sensors, I2C, SPI protocols', topics: ['GPIO Pins', 'ADC', 'Serial Communication'] },
      ],
    },
  ];

  getAllTracks() {
    return this.tracks;
  }

  getTrackBySlug(slug: string) {
    return this.tracks.find((t) => t.slug === slug);
  }
}
