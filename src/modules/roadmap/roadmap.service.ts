import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillsService } from '../skills/skills.service';

export interface MilestoneTemplate {
  order: number;
  title: string;
  description: string;
  skillSlug: string;
  type: string;
  estimatedTime: string;
  why: string;
  unlocks: string[];
}

export const BASE_ROADMAP_TEMPLATES: Record<string, MilestoneTemplate[]> = {
  'full-stack-developer': [
    {
      order: 1,
      title: 'Modern HTML5 & Semantic Web Architecture',
      description: 'Semantic tags, DOM structure, accessibility standards (WCAG), and responsive layouts.',
      skillSlug: 'javascript',
      type: 'THEORY',
      estimatedTime: '1 week',
      why: 'Fundamental base for all web frontends',
      unlocks: ['2'],
    },
    {
      order: 2,
      title: 'JavaScript ES6+ & TypeScript Strict Typing',
      description: 'Event loop, promises, async/await, interfaces, generics, and strict compile options.',
      skillSlug: 'typescript',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Ensures type safety and enterprise code reliability',
      unlocks: ['3', '4'],
    },
    {
      order: 3,
      title: 'React 19 Hooks & State Architecture',
      description: 'Component lifecycles, custom hooks, context, state machines, and memoization.',
      skillSlug: 'react',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Core view engine for modern web apps',
      unlocks: ['5'],
    },
    {
      order: 4,
      title: 'Node.js & NestJS Modular REST APIs',
      description: 'Dependency injection, controllers, providers, guards, interceptors, and Swagger DTOs.',
      skillSlug: 'nestjs',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Backbone of robust backend services',
      unlocks: ['5', '6'],
    },
    {
      order: 5,
      title: 'Next.js App Router & Server Components',
      description: 'Full-stack Next.js 16, React Server Components (RSC), Server Actions, and Turbopack.',
      skillSlug: 'nextjs',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Modern industry standard for high-performance web applications',
      unlocks: ['7'],
    },
    {
      order: 6,
      title: 'PostgreSQL Relational DB & Prisma ORM',
      description: 'Schema modeling, indexing, ACID transactions, migrations, and query optimization.',
      skillSlug: 'postgresql',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Persistent relational data storage and integrity',
      unlocks: ['7'],
    },
    {
      order: 7,
      title: 'Docker Containerization & CI/CD Cloud Deployment',
      description: 'Multi-stage Dockerfiles, Docker Compose, GitHub Actions, and production container deployment.',
      skillSlug: 'docker',
      type: 'PROJECT',
      estimatedTime: '2 weeks',
      why: 'Guarantees consistent deployment and production readiness',
      unlocks: [],
    },
  ],
  'software-engineer': [
    {
      order: 1,
      title: 'Advanced Data Structures (Trees, Heaps & Graphs)',
      description: 'Binary indexed trees, AVL trees, disjoint set unions, and graph representations.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Required for technical interviews and optimal algorithm selection',
      unlocks: ['2', '3'],
    },
    {
      order: 2,
      title: 'Dynamic Programming & Complexity Optimization',
      description: 'Tabulation, memoization, state compression, and asymptotic complexity reduction.',
      skillSlug: 'dsa',
      type: 'CODE',
      estimatedTime: '3 weeks',
      why: 'Crucial for high-tier engineering interviews and competitive performance',
      unlocks: ['4'],
    },
    {
      order: 3,
      title: 'Object-Oriented Design & SOLID Architecture',
      description: 'Design patterns (Factory, Strategy, Observer, Repository) and clean architecture.',
      skillSlug: 'oop',
      type: 'CODE',
      estimatedTime: '2 weeks',
      why: 'Ensures enterprise-scale maintainability and decoupling',
      unlocks: ['4'],
    },
    {
      order: 4,
      title: 'Distributed System Design & Scalability',
      description: 'Load balancers, distributed caching, CAP theorem, database sharding, and message queues.',
      skillSlug: 'system-design',
      type: 'THEORY',
      estimatedTime: '3 weeks',
      why: 'Key requirement for senior engineering readiness',
      unlocks: [],
    },
  ],
};

@Injectable()
export class RoadmapService {
  constructor(
    private prisma: PrismaService,
    private skillsService: SkillsService,
  ) {}

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
    const templates = BASE_ROADMAP_TEMPLATES[targetRoleSlug] || BASE_ROADMAP_TEMPLATES['full-stack-developer'];
    return {
      id: `roadmap-fallback-${userId}`,
      userId,
      targetRole: targetRoleSlug,
      status: 'ACTIVE',
      createdAt: new Date(),
      milestones: templates.map((tmpl, idx) => ({
        id: `ms-${idx + 1}`,
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
      })),
    };
  }

  async generatePersonalizedRoadmap(userId: string, targetRoleSlug: string = 'full-stack-developer') {
    const normalizedRole = targetRoleSlug.toLowerCase().replace(/\s+/g, '-');
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

      return await this.prisma.personalizedRoadmap.findUnique({
        where: { id: newRoadmap.id },
        include: {
          milestones: {
            orderBy: { order: 'asc' },
          },
        },
      });
    } catch (e) {
      return this.getDefaultFallbackRoadmap(userId, normalizedRole) as any;
    }
  }

  async toggleMilestone(userId: string, milestoneId: string) {
    const milestone = await this.prisma.roadmapMilestone.findUnique({
      where: { id: milestoneId },
      include: { roadmap: true },
    });

    if (!milestone || milestone.roadmap.userId !== userId) {
      throw new NotFoundException('Milestone not found');
    }

    const nextStatus = milestone.status === 'COMPLETED' ? 'CURRENT' : 'COMPLETED';

    const updated = await this.prisma.roadmapMilestone.update({
      where: { id: milestoneId },
      data: { status: nextStatus },
    });

    // If completed, award XP and increment practice points
    if (nextStatus === 'COMPLETED') {
      try {
        await this.prisma.userGamification.upsert({
          where: { userId },
          update: {
            totalXp: { increment: 50 },
            lastActiveAt: new Date(),
          },
          create: {
            userId,
            totalXp: 50,
            currentLevel: 1,
            gemsBalance: 25,
          },
        });

        await this.prisma.xPTransaction.create({
          data: {
            userId,
            amount: 50,
            actionType: 'MILESTONE_UNLOCKED',
            referenceId: milestoneId,
            description: `Completed roadmap milestone: ${milestone.title}`,
          },
        });

        // Boost practice score of associated skill
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
}
