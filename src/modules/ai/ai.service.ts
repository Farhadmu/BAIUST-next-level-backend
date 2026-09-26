import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Groq from 'groq-sdk';
import { GoogleGenAI } from '@google/genai';
import { Mistral } from '@mistralai/mistralai';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AiInferenceOptions {
  feature: 'COPILOT' | 'DIAGNOSTIC' | 'INTERVIEW' | 'RESUME' | 'PROJECT_SPEC' | 'RECOVERY';
  systemPrompt?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  userId?: string;
}

export interface AiInferenceResult {
  reply: string;
  provider: string;
  model: string;
  durationMs: number;
  status: 'SUCCESS' | 'FALLBACK';
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private groqClients: Array<{ name: string; client: Groq }> = [];
  private groqNextIndex = 0;
  private geminiClient: GoogleGenAI | null = null;
  private mistralClient: Mistral | null = null;
  private modelCooldowns = new Map<string, number>();

  constructor(private prisma: PrismaService) {
    this.initProviders();
  }

  private initProviders() {
    // 1. Groq multi-key pool
    const groqKeys = [
      process.env.GROQ_API_KEY,
      process.env.GROQ_API_KEY_SECONDARY,
      process.env.GROQ_API_KEY_3,
      process.env.GROQ_API_KEY_4,
    ].filter((k): k is string => Boolean(k && k.trim()));

    this.groqClients = groqKeys.map((apiKey, idx) => ({
      name: `Groq-Key-${idx + 1}`,
      client: new Groq({ apiKey }),
    }));

    if (this.groqClients.length > 0) {
      this.logger.log(`[AI Gateway] Initialized ${this.groqClients.length} Groq rotated client(s).`);
    }

    // 2. Google Gemini
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      this.geminiClient = new GoogleGenAI({ apiKey: geminiKey });
      this.logger.log('[AI Gateway] Initialized Google Gemini client.');
    }

    // 3. Mistral AI
    const mistralKey = process.env.MISTRAL_API_KEY;
    if (mistralKey) {
      this.mistralClient = new Mistral({ apiKey: mistralKey });
      this.logger.log('[AI Gateway] Initialized Mistral client.');
    }
  }

  private isCoolingDown(key: string): boolean {
    const until = this.modelCooldowns.get(key);
    if (!until) return false;
    if (Date.now() > until) {
      this.modelCooldowns.delete(key);
      return false;
    }
    return true;
  }

  private setCooldown(key: string, durationMs: number = 30000) {
    this.modelCooldowns.set(key, Date.now() + durationMs);
    this.logger.warn(`[AI CircuitBreaker] Key/Model "${key}" in cooldown for ${durationMs / 1000}s`);
  }

  private getRotatedGroqClient(): { name: string; client: Groq } | null {
    if (this.groqClients.length === 0) return null;
    const available = this.groqClients.filter((g) => !this.isCoolingDown(g.name));
    if (available.length === 0) return null;

    const selected = available[this.groqNextIndex % available.length];
    this.groqNextIndex = (this.groqNextIndex + 1) % available.length;
    return selected;
  }

  async generateCompletion(options: AiInferenceOptions): Promise<AiInferenceResult> {
    const startTime = Date.now();

    // 1. Try Groq Primary (Qwen 2.5 / Llama 3.3)
    const groqEntry = this.getRotatedGroqClient();
    if (groqEntry) {
      try {
        const groqMessages = [
          ...(options.systemPrompt ? [{ role: 'system' as const, content: options.systemPrompt }] : []),
          ...options.messages.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
        ];

        const completion = await groqEntry.client.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 1500,
          response_format: options.jsonMode ? { type: 'json_object' } : undefined,
        });

        const reply = completion.choices[0]?.message?.content || '';
        const durationMs = Date.now() - startTime;

        await this.logUsage({
          provider: groqEntry.name,
          model: 'llama-3.3-70b-versatile',
          feature: options.feature,
          status: 'SUCCESS',
          durationMs,
          tokensUsed: completion.usage?.total_tokens || 0,
          userId: options.userId,
        });

        return {
          reply: options.jsonMode ? this.sanitizeJsonString(reply) : reply,
          provider: groqEntry.name,
          model: 'llama-3.3-70b-versatile',
          durationMs,
          status: 'SUCCESS',
        };
      } catch (err: any) {
        this.logger.warn(`[Groq Error] ${err.message}. Cascading to Gemini.`);
        if (err.status === 429 || err.message?.includes('rate_limit')) {
          this.setCooldown(groqEntry.name, 45000);
        }
      }
    }

    // 2. Try Google Gemini Fallback
    if (this.geminiClient && !this.isCoolingDown('gemini')) {
      try {
        const prompt = [
          options.systemPrompt ? `System Instructions:\n${options.systemPrompt}\n\n` : '',
          ...options.messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`),
        ].join('\n\n');

        const response = await this.geminiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const reply = response.text || '';
        const durationMs = Date.now() - startTime;

        await this.logUsage({
          provider: 'GOOGLE_GEMINI',
          model: 'gemini-2.5-flash',
          feature: options.feature,
          status: 'SUCCESS',
          durationMs,
          userId: options.userId,
        });

        return {
          reply: options.jsonMode ? this.sanitizeJsonString(reply) : reply,
          provider: 'GOOGLE_GEMINI',
          model: 'gemini-2.5-flash',
          durationMs,
          status: 'SUCCESS',
        };
      } catch (err: any) {
        this.logger.warn(`[Gemini Error] ${err.message}. Cascading to Mistral.`);
        if (err.status === 429) this.setCooldown('gemini', 60000);
      }
    }

    // 3. Try Mistral AI Fallback
    if (this.mistralClient && !this.isCoolingDown('mistral')) {
      try {
        const mistralMessages = [
          ...(options.systemPrompt ? [{ role: 'system' as const, content: options.systemPrompt }] : []),
          ...options.messages.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
        ];

        const response = await this.mistralClient.chat.complete({
          model: 'mistral-small-latest',
          messages: mistralMessages,
        });

        const reply = typeof response.choices?.[0]?.message?.content === 'string'
          ? response.choices[0].message.content
          : '';
        const durationMs = Date.now() - startTime;

        await this.logUsage({
          provider: 'MISTRAL_AI',
          model: 'mistral-small-latest',
          feature: options.feature,
          status: 'SUCCESS',
          durationMs,
          userId: options.userId,
        });

        return {
          reply: options.jsonMode ? this.sanitizeJsonString(reply) : reply,
          provider: 'MISTRAL_AI',
          model: 'mistral-small-latest',
          durationMs,
          status: 'SUCCESS',
        };
      } catch (err: any) {
        this.logger.warn(`[Mistral Error] ${err.message}. Engaging deterministic fallback.`);
        if (err.status === 429) this.setCooldown('mistral', 60000);
      }
    }

    // 4. Deterministic Offline Fallback (Guaranteed Zero-Crash)
    const durationMs = Date.now() - startTime;
    const fallbackText = this.generateDeterministicFallback(options);

    await this.logUsage({
      provider: 'DETERMINISTIC_ENGINE',
      model: 'offline-rule-based',
      feature: options.feature,
      status: 'FALLBACK',
      durationMs,
      userId: options.userId,
    });

    return {
      reply: fallbackText,
      provider: 'DETERMINISTIC_ENGINE',
      model: 'offline-rule-based',
      durationMs,
      status: 'FALLBACK',
    };
  }

  public sanitizeJsonString(raw: string): string {
    let clean = raw.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return clean.trim();
  }

  private generateDeterministicFallback(options: AiInferenceOptions): string {
    if (options.jsonMode) {
      if (options.feature === 'PROJECT_SPEC') {
        return JSON.stringify({
          title: 'Full-Stack Student Management System',
          description: 'A modular NestJS and React application implementing authentication, course enrollments, and PostgreSQL indexing.',
          techStack: ['TypeScript', 'NestJS', 'React', 'PostgreSQL', 'Prisma'],
          milestones: [
            { order: 1, title: 'Prisma Schema & Relational Design', duration: '3 days' },
            { order: 2, title: 'Modular Authentication & RBAC Guards', duration: '4 days' },
            { order: 3, title: 'React Dashboard & Component Architecture', duration: '5 days' },
          ],
        });
      }
      return JSON.stringify({
        status: 'OFFLINE_READY',
        message: 'Deterministic response generated by BAIUST CSE HUB intelligence engine.',
      });
    }

    const lastUserMsg = options.messages.filter((m) => m.role === 'user').pop()?.content || '';

    return `Hello! I am your **BAIUST AI Copilot**. Currently external AI provider endpoints are undergoing rate-limiting or maintenance, so I am operating in **Deterministic Knowledge Engine Mode**.

Based on your academic profile at BAIUST Department of CSE:
- **Career Preparation:** Focus on closing your highest priority skill gaps.
- **Academic Sync:** Align your weekly study time with your semester courses (e.g. DBMS, Algorithms, or Operating Systems).
- **Practical Proof:** Build a full-stack project or solve 3-5 problems on Virtual Judge / Codeforces to reinforce your skill state.

*Query processed:* "${lastUserMsg.slice(0, 100)}..."`;
  }

  private async logUsage(data: {
    provider: string;
    model: string;
    feature: string;
    status: string;
    durationMs: number;
    tokensUsed?: number;
    errorMessage?: string;
    userId?: string;
  }) {
    try {
      await this.prisma.aiUsageLog.create({
        data: {
          provider: data.provider,
          model: data.model,
          feature: data.feature,
          status: data.status,
          durationMs: data.durationMs,
          tokensUsed: data.tokensUsed || 0,
          errorMessage: data.errorMessage,
          userId: data.userId,
        },
      });
    } catch (e) {
      // Non-blocking telemetry
    }
  }

  async buildStudentContextPrompt(userId: string): Promise<string> {
    try {
      const [user, profile, skillStates, projects, cpSolved] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          include: { studentProfile: { include: { batch: true } } },
        }),
        this.prisma.careerProfile.findUnique({ where: { userId } }),
        this.prisma.studentSkillState.findMany({ where: { userId }, take: 10 }),
        this.prisma.studentProject.findMany({ where: { userId }, select: { title: true, isVerified: true } }),
        this.prisma.studentProblemProgress.count({ where: { userId } }),
      ]);

      const semester = user?.studentProfile?.currentSemester || 1;
      const batch = user?.studentProfile?.batch?.batchNumber || 40;
      const targetRole = profile?.targetRoleName || 'Full Stack Developer';

      const skillsSummary = skillStates.length > 0
        ? skillStates.map((s) => `${s.skillSlug}: ${s.knowledgeScore}%`).join(', ')
        : 'Diagnostic not yet completed';

      return `You are BAIUST AI Copilot, an elite technical mentor and career intelligence engine for Bangladesh Army International University of Science and Technology (BAIUST), Department of Computer Science & Engineering (CSE).

STUDENT CONTEXT:
- Name: ${user?.fullName || 'Student'}
- Student ID: ${user?.studentProfile?.studentId || 'N/A'}
- Academic: Batch ${batch}, Current Semester ${semester}, Dept. of CSE
- Target Career Goal: ${targetRole}
- Assessed Skills Baseline: ${skillsSummary}
- Verified Portfolio Projects: ${projects.filter((p) => p.isVerified).length} verified
- Solved CP Problems: ${cpSolved} problems

GUIDELINES:
1. Provide concrete, supportive, and technically rigorous CSE advice.
2. If the student speaks Bengali/Banglish, answer warmly in natural Bengali or English as appropriate.
3. Reference real academic realities (lab reports, midterms, semester courses) and practical developer tools (Git, NestJS, React, Docker).
4. Never make up fake stats or falsely guarantee jobs. Give actionable next steps.`;
    } catch (e) {
      return 'You are the BAIUST AI Copilot assisting a CSE student at Bangladesh Army International University of Science and Technology.';
    }
  }
}
