# BAIUST CSE HUB — REST API Endpoints Specification

All endpoints are hosted on the NestJS backend (Default Port: `5000`).
Authenticated endpoints require a Bearer token: `Authorization: Bearer <accessToken>`.

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register student, batch, and profile | Public |
| `POST` | `/auth/login` | Login and obtain JWT tokens | Public |
| `POST` | `/auth/refresh` | Rotate and issue new access token | Refresh Token |
| `GET` | `/auth/me` | Fetch authenticated user profile | Bearer |

---

## 2. Diagnostic Assessment (`/diagnostic`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/diagnostic/questions` | Get active diagnostic questions | Public |
| `POST` | `/diagnostic/start` | Start diagnostic attempt | Bearer |
| `POST` | `/diagnostic/answer` | Submit answer for a question | Bearer |
| `POST` | `/diagnostic/complete/:id`| Finalize attempt and update skill graph | Bearer |
| `GET` | `/diagnostic/latest` | Retrieve latest attempt & breakdown | Bearer |

---

## 3. Skill Intelligence (`/skills`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/skills/catalog` | Get all system skills | Public |
| `GET` | `/skills/profile` | Get student 4-pillar skill breakdown | Bearer |
| `GET` | `/skills/gaps` | Get gaps relative to target career role | Bearer |

---

## 4. Career Intelligence & Twin (`/career-intelligence`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/career-intelligence/profile` | Get student career profile | Bearer |
| `PUT` | `/career-intelligence/profile` | Update target role & weekly hours | Bearer |
| `GET` | `/career-intelligence/twin` | Get Career Twin, readiness score, Next Best Action | Bearer |

---

## 5. Personalized Roadmap (`/roadmap`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/roadmap/active` | Get active roadmap & DAG milestones | Bearer |
| `POST` | `/roadmap/generate` | Generate personalized roadmap | Bearer |
| `POST` | `/roadmap/milestone/:id/toggle` | Toggle milestone completion & award XP | Bearer |

---

## 6. AI Copilot (`/ai`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/ai/chat` | Context-aware chat with student RAG prompt | Bearer |

---

## 7. Project Studio & Proof Graph (`/projects`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects/my-projects` | Get student projects & evidence | Bearer |
| `POST` | `/projects/generate-spec` | Generate AI full-stack spec (Flow A) | Bearer |
| `POST` | `/projects/import-github` | Import & verify GitHub repo (Flow B) | Bearer |
| `GET` | `/projects/verify/:token` | Public recruiter proof verification | Public |

---

## 8. Competitive Programming (`/cp`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/cp/problems` | Get CP problems filtered by topic | Public |
| `GET` | `/cp/my-progress` | Get student solved count & topic radar | Bearer |
| `POST` | `/cp/solve/:id` | Record solve & update DSA practice score | Bearer |

---

## 9. AI Mock Interview (`/interview`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/interview/start` | Start calibrated mock interview | Bearer |
| `POST` | `/interview/answer` | Submit answer for AI feedback | Bearer |
| `POST` | `/interview/complete/:id`| Complete interview & calculate score | Bearer |
| `GET` | `/interview/my-sessions` | Get recent interview history | Bearer |

---

## 10. ATS Resume Scanner (`/resume`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/resume/my-resume` | Get synced resume profile | Bearer |
| `PUT` | `/resume/my-resume` | Update resume sections | Bearer |
| `POST` | `/resume/analyze-ats` | Run ATS 4-pillar scanner | Bearer |

---

## 11. Application Readiness (`/readiness`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/readiness/jobs` | Compare verified skills with tech jobs | Bearer |

---

## 12. Adaptive Recovery & Gamification (`/recovery`, `/gamification`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/recovery/plan` | Get 4-day non-punitive catch-up plan | Bearer |
| `GET` | `/gamification/summary` | Get XP, level, badges, and gems | Bearer |

---

## 13. Admin Observability (`/admin`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/overview` | Real database KPIs & activity | Public/Admin |
| `GET` | `/admin/ai-usage` | Token consumption by provider | Public/Admin |
| `GET` | `/admin/system-health` | DB ping, memory, and uptime | Public/Admin |
| `GET` | `/admin/students` | Registered student directory | Admin / Super Admin |
