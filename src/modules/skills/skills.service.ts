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

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async getAllSkills() {
    return this.prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
  }

  async getStudentSkillProfile(userId: string) {
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

    // Calculate aggregated telemetry
    const totalSkills = states.length;
    let avgKnowledge = 0;
    let avgPractice = 0;
    let avgProject = 0;
    let avgEvidence = 0;

    if (totalSkills > 0) {
      avgKnowledge = Math.round(states.reduce((acc, s) => acc + s.knowledgeScore, 0) / totalSkills);
      avgPractice = Math.round(states.reduce((acc, s) => acc + s.practiceScore, 0) / totalSkills);
      avgProject = Math.round(states.reduce((acc, s) => acc + s.projectScore, 0) / totalSkills);
      avgEvidence = Math.round(states.reduce((acc, s) => acc + s.evidenceScore, 0) / totalSkills);
    }

    // Weighted Overall Skill Score
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

  async getSkillGaps(userId: string, targetRoleSlug: string = 'full-stack-developer') {
    const normalizedRole = targetRoleSlug.toLowerCase().replace(/\s+/g, '-');
    const requirements = ROLE_SKILL_MAP[normalizedRole] || ROLE_SKILL_MAP['full-stack-developer'];

    const userStates = await this.prisma.studentSkillState.findMany({
      where: { userId },
    });

    const stateMap = new Map<string, typeof userStates[0]>();
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
