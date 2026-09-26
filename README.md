# BAIUST AI-Powered CSE Student Ecosystem

> Bangladesh Army International University of Science and Technology (BAIUST)  
> Department of Computer Science & Engineering (CSE)

A unified, production-oriented student learning and career intelligence platform. Combines BAIUST's complete academic ecosystem (courses, syllabi, previous papers, cover sheet generator, competitive programming, and alumni mentorship) with **AIPather's** adaptive intelligence engine.

---

## 🌟 Core Integrated Subsystems

1. **Academic Hub & Student Tools:** Department course catalog, semester syllabi, lecture notes, lab manuals, and official A4 cover page vector generator.
2. **Diagnostic Assessment Engine:** 25+ question adaptive test establishing baseline technical proficiencies across C++, DSA, OOP, PostgreSQL, Web, DevOps, and AI.
3. **4-Pillar Skill Health Radar:** Real-time tracking of Knowledge, Practice, Project, and Evidence scores per skill with complete temporal history logs.
4. **Career Twin & Readiness Engine:** Mathematical readiness scoring benchmarking candidate profiles against senior industry percentiles ($0.35 \times \text{Knowledge} + 0.30 \times \text{Practice} + 0.20 \times \text{Project} + 0.15 \times \text{Evidence}$).
5. **Personalized DAG Learning Roadmap:** Prerequisite milestone unlock graph adapting automatically to detected skill debts.
6. **Multi-Tier AI Copilot Gateway:** Cascading inference router across Groq (4-key round-robin rotation), Google Gemini, Mistral AI, and deterministic offline rule engine with context-aware university RAG.
7. **Project Studio & Cryptographic Proof:** Flow A (AI architecture specifications) + Flow B (GitHub repository inspection) issuing tamper-proof HMAC verification tokens.
8. **Competitive Programming Intelligence:** Syncs problem solve records with algorithmic practice points and topic mastery radars.
9. **AI Technical Mock Interview Simulator:** Calibrated technical and behavioral interview sessions with real-time feedback on depth, clarity, and trade-offs.
10. **ATS 4-Pillar Resume Builder & Scanner:** Scans resume alignment, impact metrics, and missing keywords with direct student profile synchronization.
11. **Job Readiness Matcher:** Compares student verified skills with active tech job requirements without false guarantees.
12. **Zero-Guilt Adaptive Recovery:** Non-punitive 4-day catch-up micro-plans and velocity calculator for returning students.
13. **Gamification & Atomic XP Ledger:** XP transactions, streak counter, gems economy, and achievement badges.
14. **Enterprise Observability & Health:** Real-time database queries for platform KPIs, AI token consumption, error logs, and system health telemetry.

---

## 🚀 Quick Start

### Backend
```bash
cd BAIUST-next-level-backend-main
npm install --legacy-peer-deps
npx prisma generate
npm run build
npm run start:dev
```

### Frontend
```bash
cd BAIUST-next-level-frontend-main
npm install --legacy-peer-deps
npm run build
npm run dev
```

Visit: `http://localhost:3000`

---

## 📚 Technical Documentation

- [ARCHITECTURE.md](file:///m:/New%20folder/ARCHITECTURE.md): High-level system architecture and module mapping.
- [AI_ARCHITECTURE.md](file:///m:/New%20folder/AI_ARCHITECTURE.md): Multi-tier AI Gateway, round-robin key rotation, and RAG context pipeline.
- [DATABASE.md](file:///m:/New%20folder/DATABASE.md): Complete Prisma database schema and entity relationships.
- [API_DOCUMENTATION.md](file:///m:/New%20folder/API_DOCUMENTATION.md): Complete REST API specification for all 13 modules.
- [DEPLOYMENT.md](file:///m:/New%20folder/DEPLOYMENT.md): Production deployment and environment setup instructions.
