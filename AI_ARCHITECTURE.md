# BAIUST AI Architecture & Multi-Tier Inference Gateway

## 1. Overview

The AI layer in BAIUST CSE HUB is built on a **Resilient Multi-Tier Gateway** designed to provide 100% platform availability with zero 500 runtime crashes, even in the event of external model downtime, rate limits, or network partitions.

```text
               Client Request (Student Context & Prompt)
                                   │
                                   ▼
                       [AI Gateway Multi-Tier Router]
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       ▼                           ▼                           ▼
[Tier 1: Groq Round-Robin]  [Tier 2: Google Gemini]    [Tier 3: Mistral AI]
  (4-Key Auto-Rotation)        (gemini-2.5-flash)       (mistral-small)
       │                           │                           │
       └──────────────┬────────────┴───────────────────────────┘
                      │ (If all remote providers rate-limited / offline)
                      ▼
       [Tier 4: Deterministic Offline Rule Engine]
                      │
                      ▼
               Sanitized JSON / Markdown Completion
                      │
                      ▼
             Usage Logged to AiUsageLog DB
```

---

## 2. Multi-Provider Cascade & Circuit Breaker

### 2.1 Provider Rotation Pool
1. **Tier 1 — Groq Round-Robin:**
   - Multi-key rotation pool distributing traffic across up to 4 accounts:
     - `GROQ_API_KEY`
     - `GROQ_API_KEY_SECONDARY`
     - `GROQ_API_KEY_3`
     - `GROQ_API_KEY_4`
   - Primary Model: `llama-3.3-70b-versatile` / `qwen/qwen3.8-27b`
2. **Tier 2 — Google Gemini:**
   - Provider: `@google/genai`
   - Model: `gemini-2.5-flash`
3. **Tier 3 — Mistral AI:**
   - Provider: `@mistralai/mistralai`
   - Model: `mistral-small-latest`
4. **Tier 4 — Deterministic Zero-500 Offline Fallback:**
   - Provides domain-curated responses and structured JSON specifications if external APIs are unreachable or offline.

### 2.2 Circuit Breaker & Cooldowns
- If any provider or API key encounters HTTP 429 (`rate_limit_exceeded`), the circuit breaker places that specific key in a cooldown map for 30–60 seconds.
- Requests immediately fall through to the next active key or provider without stalling the user.

---

## 3. Student Context Injection (RAG Pipeline)

The AI Copilot does not operate as a generic ChatGPT clone. Every student prompt is dynamically enriched with verified database facts before inference:

```text
Student Database Facts:
├── Name, Student ID & Email
├── Batch, Current Semester (e.g. Semester 3)
├── Enrolled Semester Courses (e.g. CSE-311 DBMS, CSE-211 DSA)
├── Target Career Goal (e.g. Full Stack Developer)
├── 4-Pillar Skill Baseline (Knowledge %, Practice %, Project %, Evidence %)
├── Critical Skill Gaps
├── Verified Project Evidence Count
└── Competitive Programming Rating & Solved Count
```

This context guarantees that responses are calibrated to BAIUST's curriculum, exam realities, and the student's individual learning progress.

---

## 4. Self-Healing JSON Sanitizer

When requesting structured JSON (e.g., project specifications, ATS resumes, or interview evaluations), the AI Gateway runs the response through a self-healing sanitizer:
- Strips Markdown code blocks (` ```json ` ... ` ``` `).
- Removes commentary and trailing commas.
- Validates the resulting payload to prevent runtime parsing exceptions.
