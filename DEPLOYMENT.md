# BAIUST CSE HUB — Production & Local Deployment Guide

## 1. Prerequisites
- Node.js 20.x or 24.x
- npm 10+
- PostgreSQL 15+ database (Local or Cloud e.g. Neon, Supabase, AWS RDS)

---

## 2. Backend Setup (`BAIUST-next-level-backend-main`)

### 2.1 Configuration
Create `.env` in the backend root directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN="http://localhost:3000"

# Security Secrets
JWT_ACCESS_SECRET="production_jwt_access_secret_super_secure_key_2026"
JWT_REFRESH_SECRET="production_jwt_refresh_secret_super_secure_key_2026"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/baiust_cse_hub?schema=public"

# AI Inference Gateway API Keys (Optional - Deterministic fallback always available)
GROQ_API_KEY=""
GROQ_API_KEY_SECONDARY=""
GROQ_API_KEY_3=""
GROQ_API_KEY_4=""
GEMINI_API_KEY=""
MISTRAL_API_KEY=""
```

### 2.2 Database Generation & Seeding
```bash
# Generate Prisma Client
npx prisma generate

# Apply Migrations
npx prisma migrate dev --name init_intelligence

# Seed Skills Catalog & 25+ CSE Diagnostic Questions
npx ts-node prisma/seed.ts
```

### 2.3 Starting Backend
```bash
# Development mode
npm run start:dev

# Production build & run
npm run build
npm run start:prod
```

---

## 3. Frontend Setup (`BAIUST-next-level-frontend-main`)

### 3.1 Configuration
Create `.env.local` in the frontend root directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 3.2 Starting Frontend
```bash
# Development server (Turbopack)
npm run dev

# Production build & run
npm run build
npm run start
```
Frontend runs at: `http://localhost:3000`
Backend runs at: `http://localhost:5000`
