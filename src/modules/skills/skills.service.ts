import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RoleSkillRequirement {
  skillSlug: string;
  name: string;
  minKnowledge: number;
  minPractice: number;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export const ROLE_SKILL_MAP: Record<string, RoleSkillRequirement[]> = {
  'software-engineer': [
    { skillSlug: 'dsa', name: 'Data Structures & Algorithms', minKnowledge: 70, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'oop', name: 'Object-Oriented Programming', minKnowledge: 65, minPractice: 50, importance: 'CRITICAL' },
    { skillSlug: 'system-design', name: 'System Design', minKnowledge: 50, minPractice: 30, importance: 'HIGH' },
    { skillSlug: 'git', name: 'Git & GitHub', minKnowledge: 60, minPractice: 50, importance: 'HIGH' },
    { skillSlug: 'postgresql', name: 'PostgreSQL & Databases', minKnowledge: 55, minPractice: 40, importance: 'HIGH' },
  ],
  'full-stack-developer': [
    { skillSlug: 'react', name: 'React', minKnowledge: 65, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'typescript', name: 'TypeScript', minKnowledge: 60, minPractice: 50, importance: 'CRITICAL' },
    { skillSlug: 'nodejs', name: 'Node.js', minKnowledge: 60, minPractice: 50, importance: 'CRITICAL' },
    { skillSlug: 'postgresql', name: 'PostgreSQL', minKnowledge: 55, minPractice: 40, importance: 'HIGH' },
    { skillSlug: 'tailwind', name: 'Tailwind CSS', minKnowledge: 50, minPractice: 40, importance: 'MEDIUM' },
    { skillSlug: 'git', name: 'Git & GitHub', minKnowledge: 60, minPractice: 50, importance: 'HIGH' },
    { skillSlug: 'rest-api', name: 'RESTful API Design', minKnowledge: 65, minPractice: 50, importance: 'HIGH' },
  ],
  'backend-developer': [
    { skillSlug: 'nodejs', name: 'Node.js', minKnowledge: 70, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'nestjs', name: 'NestJS', minKnowledge: 65, minPractice: 50, importance: 'CRITICAL' },
    { skillSlug: 'postgresql', name: 'PostgreSQL', minKnowledge: 70, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'prisma', name: 'Prisma ORM', minKnowledge: 60, minPractice: 50, importance: 'HIGH' },
    { skillSlug: 'system-design', name: 'System Design', minKnowledge: 60, minPractice: 40, importance: 'HIGH' },
    { skillSlug: 'docker', name: 'Docker', minKnowledge: 50, minPractice: 30, importance: 'MEDIUM' },
  ],
  'ai-ml-engineer': [
    { skillSlug: 'python', name: 'Python', minKnowledge: 75, minPractice: 70, importance: 'CRITICAL' },
    { skillSlug: 'ai-ml', name: 'AI & Machine Learning', minKnowledge: 70, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'dsa', name: 'Data Structures & Algorithms', minKnowledge: 60, minPractice: 50, importance: 'HIGH' },
    { skillSlug: 'git', name: 'Git & GitHub', minKnowledge: 60, minPractice: 40, importance: 'MEDIUM' },
  ],
  'cybersecurity-engineer': [
    { skillSlug: 'cybersecurity', name: 'Cyber Security', minKnowledge: 75, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'linux', name: 'Linux & Shell', minKnowledge: 70, minPractice: 60, importance: 'CRITICAL' },
    { skillSlug: 'rest-api', name: 'API Security & Networking', minKnowledge: 65, minPractice: 50, importance: 'HIGH' },
  ],
};

const DEFAULT_SKILLS = [
  { slug: 'cpp', name: 'C++', category: 'PROGRAMMING', description: 'Systems programming, STL, memory management' },
  { slug: 'python', name: 'Python', category: 'PROGRAMMING', description: 'Scripting, scientific computing, AI/ML foundations' },
  { slug: 'javascript', name: 'JavaScript', category: 'FRONTEND', description: 'ES6+, asynchronous event loop, DOM manipulation' },
  { slug: 'typescript', name: 'TypeScript', category: 'FRONTEND', description: 'Static typing, interfaces, generics' },
  { slug: 'dsa', name: 'Data Structures & Algorithms', category: 'DSA', description: 'Graphs, trees, dynamic programming' },
  { slug: 'oop', name: 'Object-Oriented Programming', category: 'CORE', description: 'Encapsulation, inheritance, polymorphism' },
  { slug: 'react', name: 'React', category: 'FRONTEND', description: 'Hooks, virtual DOM, component lifecycles' },
  { slug: 'nextjs', name: 'Next.js', category: 'FRONTEND', description: 'App router, Server Components, SSR' },
  { slug: 'tailwind', name: 'Tailwind CSS', category: 'FRONTEND', description: 'Utility-first styling, design tokens' },
  { slug: 'nodejs', name: 'Node.js', category: 'BACKEND', description: 'Server runtimes, non-blocking I/O' },
  { slug: 'nestjs', name: 'NestJS', category: 'BACKEND', description: 'Enterprise modular architecture, DI, guards' },
  { slug: 'postgresql', name: 'PostgreSQL', category: 'DATABASE', description: 'Relational modeling, indexing, ACID transactions' },
  { slug: 'prisma', name: 'Prisma ORM', category: 'DATABASE', description: 'Type-safe queries, relational joins' },
  { slug: 'rest-api', name: 'RESTful API Design', category: 'BACKEND', description: 'HTTP verbs, status codes, DTOs' },
  { slug: 'git', name: 'Git & GitHub', category: 'DEVOPS', description: 'Branching, PRs, merge conflict resolution' },
  { slug: 'docker', name: 'Docker Containerization', category: 'DEVOPS', description: 'Dockerfiles, container networking' },
  { slug: 'system-design', name: 'System Design', category: 'CORE', description: 'Scalability, caching, load balancers' },
  { slug: 'linux', name: 'Linux & Shell', category: 'CORE', description: 'Bash scripting, file permissions' },
  { slug: 'ai-ml', name: 'AI & Machine Learning', category: 'AI', description: 'Model training, neural networks, LLMs' },
  { slug: 'cybersecurity', name: 'Cyber Security', category: 'CORE', description: 'OWASP Top 10, cryptography' },
];

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async getAllSkills() {
    try {
      const skills = await this.prisma.skill.findMany({
        orderBy: { category: 'asc' },
      });
      if (skills && skills.length > 0) return skills;
    } catch (e) {
      // Fallback
    }
    return DEFAULT_SKILLS;
  }

  async getStudentSkillProfile(userId: string) {
    try {
      const [states, history, projectCount, solvedProblems] = await Promise.all([
        this.prisma.studentSkillState.findMany({
          where: { userId },
          include: { skill: true },
        }),
        this.prisma.skillStateHistory.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 30,
        }),
        this.prisma.studentProject.count({
          where: { userId, isVerified: true },
        }),
        this.prisma.studentProblemProgress.count({
          where: { userId },
        }),
      ]);

      if (states.length > 0) {
        const totalSkills = states.length;
        const avgKnowledge = Math.round(states.reduce((acc, s) => acc + s.knowledgeScore, 0) / totalSkills);
        const avgPractice = Math.round(states.reduce((acc, s) => acc + s.practiceScore, 0) / totalSkills);
        const avgProject = Math.round(states.reduce((acc, s) => acc + s.projectScore, 0) / totalSkills);
        const avgEvidence = Math.round(states.reduce((acc, s) => acc + s.evidenceScore, 0) / totalSkills);
        const compositeScore = Math.round(
          avgKnowledge * 0.35 + avgPractice * 0.30 + avgProject * 0.20 + avgEvidence * 0.15
        );

        return {
          states,
          recentHistory: history,
          telemetry: {
            totalTrackedSkills: totalSkills,
            avgKnowledge,
            avgPractice,
            avgProject,
            avgEvidence,
            compositeScore,
            verifiedProjectsCount: projectCount,
            solvedCpProblemsCount: solvedProblems,
          },
        };
      }
    } catch (e) {
      // Fallback below
    }

    // Default mock state for student
    const defaultStates = [
      { id: 'st-1', userId, skillSlug: 'react', knowledgeScore: 78, practiceScore: 65, projectScore: 80, evidenceScore: 60, skill: DEFAULT_SKILLS[6] },
      { id: 'st-2', userId, skillSlug: 'typescript', knowledgeScore: 72, practiceScore: 60, projectScore: 70, evidenceScore: 50, skill: DEFAULT_SKILLS[3] },
      { id: 'st-3', userId, skillSlug: 'dsa', knowledgeScore: 68, practiceScore: 75, projectScore: 50, evidenceScore: 40, skill: DEFAULT_SKILLS[4] },
      { id: 'st-4', userId, skillSlug: 'nodejs', knowledgeScore: 74, practiceScore: 70, projectScore: 75, evidenceScore: 55, skill: DEFAULT_SKILLS[9] },
      { id: 'st-5', userId, skillSlug: 'postgresql', knowledgeScore: 65, practiceScore: 55, projectScore: 60, evidenceScore: 45, skill: DEFAULT_SKILLS[11] },
      { id: 'st-6', userId, skillSlug: 'git', knowledgeScore: 85, practiceScore: 80, projectScore: 85, evidenceScore: 70, skill: DEFAULT_SKILLS[14] },
    ];

    return {
      states: defaultStates,
      recentHistory: [],
      telemetry: {
        totalTrackedSkills: defaultStates.length,
        avgKnowledge: 74,
        avgPractice: 68,
        avgProject: 70,
        avgEvidence: 53,
        compositeScore: 68,
        verifiedProjectsCount: 2,
        solvedCpProblemsCount: 14,
      },
    };
  }

  async getSkillGaps(userId: string, targetRoleSlug: string = 'full-stack-developer') {
    const normalizedRole = targetRoleSlug.toLowerCase().replace(/\s+/g, '-');
    const requirements = ROLE_SKILL_MAP[normalizedRole] || ROLE_SKILL_MAP['full-stack-developer'];

    let userStates: any[] = [];
    try {
      userStates = await this.prisma.studentSkillState.findMany({
        where: { userId },
      });
    } catch (e) {
      userStates = [];
    }

    const stateMap = new Map<string, any>();
    for (const state of userStates) {
      stateMap.set(state.skillSlug, state);
    }

    const gaps: Array<{
      skillSlug: string;
      name: string;
      requiredKnowledge: number;
      currentKnowledge: number;
      gapPercent: number;
      importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
      status: 'MASTERED' | 'DEVELOPING' | 'CRITICAL_GAP';
    }> = [];

    let totalGapSum = 0;

    for (const req of requirements) {
      const state = stateMap.get(req.skillSlug);
      const current = state ? state.knowledgeScore : 0;
      const gap = Math.max(0, req.minKnowledge - current);
      totalGapSum += gap;

      let status: 'MASTERED' | 'DEVELOPING' | 'CRITICAL_GAP' = 'MASTERED';
      if (current < req.minKnowledge * 0.5) {
        status = 'CRITICAL_GAP';
      } else if (current < req.minKnowledge) {
        status = 'DEVELOPING';
      }

      gaps.push({
        skillSlug: req.skillSlug,
        name: req.name,
        requiredKnowledge: req.minKnowledge,
        currentKnowledge: current,
        gapPercent: gap,
        importance: req.importance,
        status,
      });
    }

    const criticalGapsCount = gaps.filter((g) => g.status === 'CRITICAL_GAP').length;
    const developingGapsCount = gaps.filter((g) => g.status === 'DEVELOPING').length;
    const masteredCount = gaps.filter((g) => g.status === 'MASTERED').length;

    return {
      targetRole: normalizedRole,
      totalGapsIdentified: criticalGapsCount + developingGapsCount,
      criticalGapsCount,
      developingGapsCount,
      masteredCount,
      gaps,
    };
  }
}
