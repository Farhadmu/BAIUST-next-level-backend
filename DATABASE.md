# BAIUST CSE HUB — Relational Database Schema & Entities

## 1. Overview

The platform uses **Prisma ORM** with **PostgreSQL**, combining academic entities with career and learning intelligence models.

---

## 2. Core Entity Relationship Map

```text
[User]
  │
  ├── 1:1 ── [StudentProfile] ── M:1 ── [Batch] ── M:1 ── [Department]
  │                 └── M:N ── [Course] ── 1:M ── [Resource]
  │
  ├── 1:1 ── [CareerProfile]
  │
  ├── 1:M ── [StudentSkillState] ── M:1 ── [Skill]
  ├── 1:M ── [SkillStateHistory]
  │
  ├── 1:M ── [DiagnosticAttempt] ── 1:M ── [DiagnosticAnswer] ── M:1 ── [DiagnosticQuestion]
  │
  ├── 1:M ── [PersonalizedRoadmap] ── 1:M ── [RoadmapMilestone]
  │
  ├── 1:M ── [StudentProject] ── 1:M ── [ProjectEvidence]
  │
  ├── 1:M ── [StudentProblemProgress] ── M:1 ── [CPProblem]
  │
  ├── 1:M ── [InterviewSession] ── 1:M ── [InterviewQuestion] ── 1:1 ── [InterviewAnswer]
  │
  ├── 1:1 ── [ResumeProfile]
  │
  ├── 1:1 ── [UserGamification]
  ├── 1:M ── [XPTransaction]
  ├── 1:M ── [UserAchievement]
  │
  └── 1:M ── [AiUsageLog]
```

---

## 3. Key Model Definitions

### 3.1 `CareerProfile`
Stores the student's career target, experience level, and weekly availability:
- `targetRole`: Slug (e.g. `full-stack-developer`, `software-engineer`, `ai-ml-engineer`)
- `targetRoleName`: Display name
- `experienceLevel`: `BEGINNER`, `INTERMEDIATE`, `ADVANCED`
- `weeklyAvailableHours`: Default 10 hrs/week
- `onboardingCompleted`: Boolean flag

### 3.2 `StudentSkillState`
Tracks 4 distinct competency scores per skill:
- `knowledgeScore` (0-100%): Sourced from Diagnostic & assessment tests
- `practiceScore` (0-100%): Sourced from CP problems and coding drills
- `projectScore` (0-100%): Sourced from completed portfolio projects
- `evidenceScore` (0-100%): Sourced from verified GitHub repositories & tokens

### 3.3 `PersonalizedRoadmap` & `RoadmapMilestone`
Represents the student's prerequisite DAG:
- `order`: Topological sequence
- `status`: `UPCOMING`, `CURRENT`, `COMPLETED`, `LOCKED`
- `skillSlug`: Targeted skill slug
- `unlocks`: Array of milestone orders unlocked upon completion

### 3.4 `StudentProject` & `ProjectEvidence`
Supports dual-mode project engineering:
- `projectType`: `GENERATED` (Flow A) or `IMPORTED` (Flow B)
- `verificationToken`: Cryptographic HMAC-SHA256 token for public recruiter verification
- `evidence`: Relation detailing verified skills and repository URLs

### 3.5 `AiUsageLog`
Maintains administrative telemetry across all AI inferences:
- `provider`: `GROQ`, `GOOGLE_GEMINI`, `MISTRAL_AI`, `DETERMINISTIC_ENGINE`
- `model`: Model identifier
- `feature`: `COPILOT`, `DIAGNOSTIC`, `INTERVIEW`, `RESUME`, `PROJECT_SPEC`
- `status`: `SUCCESS`, `RATE_LIMIT`, `FALLBACK`
- `durationMs`: Response latency
- `tokensUsed`: Token count
