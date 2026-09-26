# BAIUST AI-Powered CSE Student Ecosystem — System Architecture

## 1. System Vision

**BAIUST CSE HUB** has been transformed from a traditional university information website into an **AI-Powered CSE Student Ecosystem**.

By integrating **AIPather's** adaptive intelligence subsystems, the platform now provides a complete digital career and learning journey for students from admission to industry employment:

```text
                         BAIUST CSE HUB
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
       UNIVERSITY ECOSYSTEM                AI INTELLIGENCE
              │                                   │
       Academic Courses                     Diagnostic Engine
       Syllabi & Handouts                   4-Pillar Skill Model
       Department Resources                 Career Twin
       Competitive Programming              Personalized DAG Roadmap
       Mentorship & Alumni                  Context-Aware Copilot
       Job Opportunities                    Project Studio (Flow A/B)
       Events & Notices                     HMAC Proof Tokens
       Cover Page Generator                 AI Technical Mock Interview
              │                             ATS Resume Scanner
              │                             Zero-Guilt Adaptive Recovery
              │                             Atomic Gamification Ledger
              │                             Admin Telemetry & Health
              └─────────────────┬─────────────────┘
                                │
                                ↓
                     PERSONALIZED CSE JOURNEY
```

---

## 2. Decoupled Monorepo Architecture

The platform is designed as two modern decoupled TypeScript codebases:

### 2.1 Backend (`BAIUST-next-level-backend-main`)
- **Runtime:** Node.js 20+
- **Framework:** NestJS 10.4 (Enterprise Modular Architecture)
- **Database ORM:** Prisma 6.19 Client with PostgreSQL
- **Security:** Passport JWT with access and refresh tokens, bcrypt password hashing, and custom RBAC guards
- **AI Gateway:** Multi-tier inference router (Groq round-robin, Google Gemini, Mistral AI, and deterministic offline rule engine)

### 2.2 Frontend (`BAIUST-next-level-frontend-main`)
- **Runtime:** Node.js 20+
- **Framework:** Next.js 16.3 (App Router with Turbopack) & React 19.2
- **Styling:** Tailwind CSS v4 with bespoke cyber-emerald dark aesthetic (`#07100C`, `#0B241A`, `#143526`, `#39D98A`)
- **Key Modules:**
  - Interactive Diagnostic Assessment Room
  - 4-Pillar Skill Health Radar
  - Dynamic Milestone DAG Learning Path
  - Project Studio with public HMAC proof verification
  - Competitive Programming Topic Mastery Radar
  - AI Mock Technical Interview Room
  - ATS 4-Pillar Resume Builder
  - Job Application Matcher
  - Zero-Guilt Adaptive Catch-Up Plans
  - XP Ledger & Badge Showcase
  - Persistent Floating AI Copilot

---

## 3. Modular Backend Service Mapping

| Module | Core Responsibilities | Key Entities Managed |
| :--- | :--- | :--- |
| `AuthModule` | Student registration, JWT generation, password hashing | `User`, `RefreshToken`, `StudentProfile` |
| `AcademicModule` | Courses, faculty allocations, syllabi, handouts, and bookmarks | `Course`, `Department`, `Batch`, `Resource` |
| `DiagnosticModule` | Question bank, test attempts, automated grading, and baseline seeding | `DiagnosticQuestion`, `DiagnosticAttempt`, `DiagnosticAnswer` |
| `SkillsModule` | 4-pillar calculations (Knowledge, Practice, Project, Evidence) & gaps | `Skill`, `StudentSkillState`, `SkillStateHistory` |
| `CareerIntelligenceModule` | Career Twin benchmarking, readiness scoring, and Next Best Action | `CareerProfile`, `StudentSkillState` |
| `RoadmapModule` | Prerequisite DAG generation and adaptive unlock progression | `PersonalizedRoadmap`, `RoadmapMilestone` |
| `AiModule` | Multi-tier provider gateway, circuit breaker, student context RAG | `AiUsageLog`, system prompts |
| `ProjectsModule` | Flow A AI specs, Flow B GitHub inspection, and HMAC proof tokens | `StudentProject`, `ProjectEvidence` |
| `CpModule` | Problem catalog, solved tracking, and DSA skill confidence sync | `CPProblem`, `StudentProblemProgress` |
| `InterviewModule` | Mock technical/DSA/behavioral interview sessions & evaluations | `InterviewSession`, `InterviewQuestion`, `InterviewAnswer` |
| `ResumeModule` | ATS 4-pillar keyword and impact scanner & synced resume profile | `ResumeProfile` |
| `ReadinessModule` | Job matching % and gap bridges comparing student skills with jobs | `JobPost`, `StudentSkillState` |
| `RecoveryModule` | Non-punitive 4-day catch-up micro-plans and velocity calculations | `UserGamification`, `PersonalizedRoadmap` |
| `GamificationModule` | Atomic XP transactions, badges, levels, and gems | `UserGamification`, `XPTransaction`, `UserAchievement` |
| `AdminModule` | Real-time platform metrics, AI token monitoring, and system health | `AuditLog`, `SystemErrorLog`, `PlatformAnalyticsSnapshot` |
