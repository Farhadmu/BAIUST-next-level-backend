import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cseSkills = [
  // Programming & Core
  { slug: 'cpp', name: 'C++', category: 'PROGRAMMING', description: 'Systems programming, STL, templates, memory management' },
  { slug: 'python', name: 'Python', category: 'PROGRAMMING', description: 'Scripting, scientific computing, AI/ML foundations' },
  { slug: 'javascript', name: 'JavaScript', category: 'FRONTEND', description: 'ES6+, asynchronous event loop, DOM manipulation' },
  { slug: 'typescript', name: 'TypeScript', category: 'FRONTEND', description: 'Static typing, interfaces, generics, type narrowing' },
  { slug: 'dsa', name: 'Data Structures & Algorithms', category: 'DSA', description: 'Graphs, trees, dynamic programming, complexity analysis' },
  { slug: 'oop', name: 'Object-Oriented Programming', category: 'CORE', description: 'Encapsulation, inheritance, polymorphism, design patterns' },
  
  // Frontend
  { slug: 'react', name: 'React', category: 'FRONTEND', description: 'Hooks, virtual DOM, component lifecycles, state management' },
  { slug: 'nextjs', name: 'Next.js', category: 'FRONTEND', description: 'App router, Server Components, SSR, static optimization' },
  { slug: 'tailwind', name: 'Tailwind CSS', category: 'FRONTEND', description: 'Utility-first styling, design tokens, responsive UI' },
  
  // Backend & Databases
  { slug: 'nodejs', name: 'Node.js', category: 'BACKEND', description: 'Server runtimes, non-blocking I/O, event emitters' },
  { slug: 'nestjs', name: 'NestJS', category: 'BACKEND', description: 'Enterprise modular architecture, dependency injection, guards' },
  { slug: 'postgresql', name: 'PostgreSQL', category: 'DATABASE', description: 'Relational modeling, indexing, transactions, ACID compliance' },
  { slug: 'prisma', name: 'Prisma ORM', category: 'DATABASE', description: 'Type-safe queries, schema migrations, relational joins' },
  { slug: 'rest-api', name: 'RESTful API Design', category: 'BACKEND', description: 'HTTP verbs, status codes, authentication, validation DTOs' },
  
  // DevOps & Systems
  { slug: 'git', name: 'Git & GitHub', category: 'DEVOPS', description: 'Branching, PRs, merge conflict resolution, CI workflows' },
  { slug: 'docker', name: 'Docker Containerization', category: 'DEVOPS', description: 'Dockerfiles, multi-stage builds, container networking' },
  { slug: 'system-design', name: 'System Design', category: 'CORE', description: 'Scalability, caching, load balancers, database partitioning' },
  { slug: 'linux', name: 'Linux & Shell', category: 'CORE', description: 'Bash scripting, file permissions, process management' },
  
  // Specializations
  { slug: 'ai-ml', name: 'AI & Machine Learning', category: 'AI', description: 'Model training, neural networks, LLMs, prompt engineering' },
  { slug: 'cybersecurity', name: 'Cyber Security', category: 'CORE', description: 'OWASP Top 10, cryptography, secure authentication' },
];

export const cseDiagnosticQuestions = [
  // 1. Programming & Fundamentals
  {
    order: 1,
    question: "In C/C++, what is the consequence of dereferencing a dangling pointer?",
    description: "Evaluates low-level memory safety and pointer lifecycle comprehension.",
    category: "PROGRAMMING",
    skill: "cpp",
    options: [
      "A guaranteed compile-time syntax error",
      "Undefined behavior, potentially leading to memory corruption or segmentation fault",
      "Automatic reallocation to heap memory by the runtime",
      "Immediate garbage collection of the pointed address"
    ],
    correctAnswer: "Undefined behavior, potentially leading to memory corruption or segmentation fault",
    difficulty: "BEGINNER"
  },
  {
    order: 2,
    question: "Which keyword in JavaScript provides block-scoped variables that cannot be reassigned?",
    description: "Evaluates JavaScript ES6 scoping fundamentals.",
    category: "PROGRAMMING",
    skill: "javascript",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
    difficulty: "BEGINNER"
  },
  {
    order: 3,
    question: "What is the primary benefit of TypeScript's static type checking over standard JavaScript?",
    description: "Evaluates TypeScript type system understanding.",
    category: "FRONTEND",
    skill: "typescript",
    options: [
      "It automatically compiles JavaScript code directly into native assembly language",
      "It catches type errors and interface contract violations at compile-time before runtime execution",
      "It eliminates the need for unit testing completely",
      "It enforces that all numbers are 64-bit floating point at the hardware level"
    ],
    correctAnswer: "It catches type errors and interface contract violations at compile-time before runtime execution",
    difficulty: "BEGINNER"
  },

  // 2. Data Structures & Algorithms
  {
    order: 4,
    question: "What is the worst-case time complexity of searching an element in a balanced Binary Search Tree (e.g., AVL tree) with N nodes?",
    description: "Evaluates tree data structure complexity analysis.",
    category: "DSA",
    skill: "dsa",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: "O(log N)",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 5,
    question: "Which algorithmic paradigm does Dijkstra's shortest path algorithm use?",
    description: "Evaluates graph algorithm paradigms.",
    category: "DSA",
    skill: "dsa",
    options: ["Divide and Conquer", "Greedy approach with priority queue", "Dynamic Programming with memoization", "Pure Randomization"],
    correctAnswer: "Greedy approach with priority queue",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 6,
    question: "What is the average time complexity of lookups in a Hash Table with a well-distributed hash function?",
    description: "Evaluates hash table mechanics.",
    category: "DSA",
    skill: "dsa",
    options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
    correctAnswer: "O(1)",
    difficulty: "BEGINNER"
  },
  {
    order: 7,
    question: "In Dynamic Programming, what are the two essential properties a problem must satisfy?",
    description: "Evaluates foundational dynamic programming principles.",
    category: "DSA",
    skill: "dsa",
    options: [
      "Optimal substructure and overlapping subproblems",
      "Linear equations and greedy choice property",
      "Sorted input and binary searchability",
      "Monotonicity and asymptotic convergence"
    ],
    correctAnswer: "Optimal substructure and overlapping subproblems",
    difficulty: "ADVANCED"
  },

  // 3. OOP & Software Architecture
  {
    order: 8,
    question: "In Object-Oriented Programming, which principle states that high-level modules should depend on abstractions rather than concrete implementations?",
    description: "Evaluates SOLID design principles.",
    category: "CORE",
    skill: "oop",
    options: [
      "Single Responsibility Principle (SRP)",
      "Open-Closed Principle (OCP)",
      "Liskov Substitution Principle (LSP)",
      "Dependency Inversion Principle (DIP)"
    ],
    correctAnswer: "Dependency Inversion Principle (DIP)",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 9,
    question: "What is the key difference between an Abstract Class and an Interface in modern languages like TypeScript or Java?",
    description: "Evaluates class abstraction vs contract specification.",
    category: "CORE",
    skill: "oop",
    options: [
      "An abstract class can contain concrete method implementations and state, while an interface is purely a contract (or default signatures)",
      "Interfaces can only be instantiated once as singletons",
      "Abstract classes cannot have constructors",
      "Interfaces cannot be implemented by more than one class"
    ],
    correctAnswer: "An abstract class can contain concrete method implementations and state, while an interface is purely a contract (or default signatures)",
    difficulty: "INTERMEDIATE"
  },

  // 4. Databases & Persistence
  {
    order: 10,
    question: "In relational databases, what does the 'I' in ACID transactions stand for?",
    description: "Evaluates database transaction guarantees.",
    category: "DATABASE",
    skill: "postgresql",
    options: ["Integrity", "Isolation", "Indexing", "Inheritance"],
    correctAnswer: "Isolation",
    difficulty: "BEGINNER"
  },
  {
    order: 11,
    question: "Which database index structure is most widely used in relational engines like PostgreSQL for range queries and equality lookups?",
    description: "Evaluates database indexing internals.",
    category: "DATABASE",
    skill: "postgresql",
    options: ["Hash Index", "B-Tree / B+ Tree", "Inverted List", "Bloom Filter"],
    correctAnswer: "B-Tree / B+ Tree",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 12,
    question: "What is the primary purpose of database normalization up to Third Normal Form (3NF)?",
    description: "Evaluates schema design and redundancy elimination.",
    category: "DATABASE",
    skill: "postgresql",
    options: [
      "To compress data on disk to save storage costs",
      "To eliminate transitive dependencies and reduce data redundancy",
      "To automatically create read replicas across cloud regions",
      "To convert SQL queries into JSON responses"
    ],
    correctAnswer: "To eliminate transitive dependencies and reduce data redundancy",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 13,
    question: "What is Prisma's role in a modern Node.js/NestJS application?",
    description: "Evaluates ORM understanding in backend ecosystems.",
    category: "DATABASE",
    skill: "prisma",
    options: [
      "A frontend CSS animation compiler",
      "A type-safe Next-generation Object-Relational Mapper (ORM) and migration tool",
      "A cloud PostgreSQL hosting provider like AWS RDS",
      "A client-side state management library like Redux"
    ],
    correctAnswer: "A type-safe Next-generation Object-Relational Mapper (ORM) and migration tool",
    difficulty: "BEGINNER"
  },

  // 5. Frontend & Modern Web
  {
    order: 14,
    question: "Which React hook is designed to synchronize a component with an external system or perform side effects after rendering?",
    description: "Evaluates React hook architecture.",
    category: "FRONTEND",
    skill: "react",
    options: ["useState", "useMemo", "useEffect", "useCallback"],
    correctAnswer: "useEffect",
    difficulty: "BEGINNER"
  },
  {
    order: 15,
    question: "In Next.js App Router (React 19), what is a key architectural advantage of React Server Components (RSC)?",
    description: "Evaluates modern React/Next.js architecture.",
    category: "FRONTEND",
    skill: "nextjs",
    options: [
      "They run exclusively in browser web workers to keep the main thread smooth",
      "They execute on the server, zeroing client bundle size for those components and enabling direct DB queries",
      "They automatically style DOM elements without CSS",
      "They eliminate the need for HTTP status codes"
    ],
    correctAnswer: "They execute on the server, zeroing client bundle size for those components and enabling direct DB queries",
    difficulty: "INTERMEDIATE"
  },

  // 6. Backend & REST Architecture
  {
    order: 16,
    question: "What does Node.js's event loop allow the runtime to accomplish despite being single-threaded?",
    description: "Evaluates Node.js asynchronous architecture.",
    category: "BACKEND",
    skill: "nodejs",
    options: [
      "Execute C++ multithreaded CPU operations across multiple cores directly",
      "Handle high-concurrency non-blocking I/O operations asynchronously via libuv",
      "Run multiple JavaScript execution threads simultaneously sharing mutable heap memory",
      "Bypass operating system kernel network calls"
    ],
    correctAnswer: "Handle high-concurrency non-blocking I/O operations asynchronously via libuv",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 17,
    question: "In a RESTful API, which HTTP status code should be returned when a resource is successfully created?",
    description: "Evaluates HTTP status code standards.",
    category: "BACKEND",
    skill: "rest-api",
    options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
    correctAnswer: "201 Created",
    difficulty: "BEGINNER"
  },
  {
    order: 18,
    question: "In NestJS architecture, what mechanism is typically used to validate request payloads against DTOs before reaching the controller handler?",
    description: "Evaluates NestJS enterprise pipeline patterns.",
    category: "BACKEND",
    skill: "nestjs",
    options: ["Interceptors", "ValidationPipe with class-validator", "Middleware", "Guards"],
    correctAnswer: "ValidationPipe with class-validator",
    difficulty: "INTERMEDIATE"
  },

  // 7. DevOps & Version Control
  {
    order: 19,
    question: "What is the difference between `git merge` and `git rebase`?",
    description: "Evaluates Git workflow comprehension.",
    category: "DEVOPS",
    skill: "git",
    options: [
      "`git merge` preserves historical branch topology with a merge commit, while `git rebase` reapplies commits linearly on top of the base branch",
      "`git rebase` deletes all remote branches permanently",
      "`git merge` only works on the master branch",
      "They are identical commands with different names for backwards compatibility"
    ],
    correctAnswer: "`git merge` preserves historical branch topology with a merge commit, while `git rebase` reapplies commits linearly on top of the base branch",
    difficulty: "INTERMEDIATE"
  },
  {
    order: 20,
    question: "What is a major advantage of a Docker multi-stage build?",
    description: "Evaluates container optimization.",
    category: "DEVOPS",
    skill: "docker",
    options: [
      "It runs multiple containers concurrently inside a single pod",
      "It separates the build environment from the final runtime image, drastically reducing production image size and security attack surface",
      "It eliminates the need for a Docker daemon",
      "It allows Docker to run on machines without an operating system"
    ],
    correctAnswer: "It separates the build environment from the final runtime image, drastically reducing production image size and security attack surface",
    difficulty: "INTERMEDIATE"
  },

  // 8. System Design & Security
  {
    order: 21,
    question: "According to the CAP theorem in distributed systems, what can a distributed datastore guarantee during a network partition (P)?",
    description: "Evaluates distributed systems fundamentals.",
    category: "CORE",
    skill: "system-design",
    options: [
      "Both Consistency (C) and Availability (A) simultaneously",
      "Either Consistency (C) or Availability (A), but not both",
      "Neither Consistency nor Availability",
      "Infinite latency and zero throughput"
    ],
    correctAnswer: "Either Consistency (C) or Availability (A), but not both",
    difficulty: "ADVANCED"
  },
  {
    order: 22,
    question: "Which security vulnerability allows an attacker to manipulate backend SQL statements via unsanitized user inputs?",
    description: "Evaluates web security fundamentals.",
    category: "CORE",
    skill: "cybersecurity",
    options: [
      "Cross-Site Scripting (XSS)",
      "SQL Injection (SQLi)",
      "Cross-Site Request Forgery (CSRF)",
      "Server-Side Request Forgery (SSRF)"
    ],
    correctAnswer: "SQL Injection (SQLi)",
    difficulty: "BEGINNER"
  },
  {
    order: 23,
    question: "In modern stateless web authentication, how does a backend verify the integrity of a JSON Web Token (JWT)?",
    description: "Evaluates token security architecture.",
    category: "BACKEND",
    skill: "rest-api",
    options: [
      "By querying the database on every request to check password hashes",
      "By validating the cryptographic signature generated using the secret key against header and payload",
      "By asking the client browser to decrypt the token locally",
      "By hashing the user's IP address with MD5"
    ],
    correctAnswer: "By validating the cryptographic signature generated using the secret key against header and payload",
    difficulty: "INTERMEDIATE"
  },

  // 9. AI / ML Foundations
  {
    order: 24,
    question: "What problem occurs in machine learning when a model learns the training data and noise too well, failing to generalize to unseen test data?",
    description: "Evaluates machine learning concepts.",
    category: "AI",
    skill: "ai-ml",
    options: ["Underfitting", "Overfitting", "Gradient Explosion", "Mode Collapse"],
    correctAnswer: "Overfitting",
    difficulty: "BEGINNER"
  },
  {
    order: 25,
    question: "In Large Language Model (LLM) applications, what is Retrieval-Augmented Generation (RAG)?",
    description: "Evaluates modern AI architecture and RAG pattern.",
    category: "AI",
    skill: "ai-ml",
    options: [
      "Fine-tuning model weights using backpropagation on millions of GPUs",
      "Retrieving relevant domain documents from a vector or relational database and augmenting the LLM prompt with context to reduce hallucination",
      "Converting LLM output into vector embeddings",
      "A compression algorithm for neural network quantization"
    ],
    correctAnswer: "Retrieving relevant domain documents from a vector or relational database and augmenting the LLM prompt with context to reduce hallucination",
    difficulty: "INTERMEDIATE"
  }
];

export async function main() {
  console.log('[Seed] Seeding CSE Skills catalog...');
  for (const skill of cseSkills) {
    await prisma.skill.upsert({
      where: { slug: skill.slug },
      update: { name: skill.name, category: skill.category, description: skill.description },
      create: skill,
    });
  }
  console.log(`[Seed] Seeded ${cseSkills.length} CSE skills.`);

  console.log('[Seed] Seeding Diagnostic Questions...');
  for (const q of cseDiagnosticQuestions) {
    await prisma.diagnosticQuestion.upsert({
      where: { id: `diag-q-${q.order}` },
      update: {
        question: q.question,
        description: q.description,
        category: q.category,
        skill: q.skill,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty,
        order: q.order,
        isActive: true,
      },
      create: {
        id: `diag-q-${q.order}` ,
        question: q.question,
        description: q.description,
        category: q.category,
        skill: q.skill,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty,
        order: q.order,
        isActive: true,
      },
    });
  }
  console.log(`[Seed] Seeded ${cseDiagnosticQuestions.length} CSE diagnostic questions.`);
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
