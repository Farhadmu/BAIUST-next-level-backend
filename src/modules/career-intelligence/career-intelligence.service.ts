import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillsService } from '../skills/skills.service';

export interface UpdateCareerProfileDto {
  targetRole?: string;
  targetRoleName?: string;
  experienceLevel?: string;
  weeklyAvailableHours?: number;
}

export type CareerDecisionStatus = 'APPLY_NOW' | 'PREPARE_THEN_APPLY' | 'BUILD_MORE_EVIDENCE' | 'NOT_READY';

@Injectable()
export class CareerIntelligenceService {
  constructor(
    private prisma: PrismaService,
    private skillsService: SkillsService,
  ) {}

  async getProfile(userId: string) {
    let profile = await this.prisma.careerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await this.prisma.careerProfile.create({
        data: {
          userId,
          targetRole: 'full-stack-developer',
          targetRoleName: 'Full Stack Developer',
          experienceLevel: 'BEGINNER',
          weeklyAvailableHours: 10,
          onboardingCompleted: false,
        },
      });
    }

    return profile;
  }

  async updateProfile(userId: string, dto: UpdateCareerProfileDto) {
    return this.prisma.careerProfile.upsert({
      where: { userId },
      update: {
        ...(dto.targetRole ? { targetRole: dto.targetRole } : {}),
        ...(dto.targetRoleName ? { targetRoleName: dto.targetRoleName } : {}),
        ...(dto.experienceLevel ? { experienceLevel: dto.experienceLevel } : {}),
        ...(dto.weeklyAvailableHours ? { weeklyAvailableHours: dto.weeklyAvailableHours } : {}),
        onboardingCompleted: true,
      },
      create: {
        userId,
        targetRole: dto.targetRole || 'full-stack-developer',
        targetRoleName: dto.targetRoleName || 'Full Stack Developer',
        experienceLevel: dto.experienceLevel || 'BEGINNER',
        weeklyAvailableHours: dto.weeklyAvailableHours || 10,
        onboardingCompleted: true,
      },
    });
  }

  async getCareerTwin(userId: string) {
    const profile = await this.getProfile(userId);
    const skillData = await this.skillsService.getStudentSkillProfile(userId);
    const gapsData = await this.skillsService.getSkillGaps(userId, profile.targetRole);

    const [projects, diagnosticAttempts, cpSolved] = await Promise.all([
      this.prisma.studentProject.findMany({
        where: { userId },
        include: { evidence: true },
      }),
      this.prisma.diagnosticAttempt.findMany({
        where: { userId, status: 'COMPLETED' },
      }),
      this.prisma.studentProblemProgress.count({
        where: { userId },
      }),
    ]);

    const verifiedProjects = projects.filter((p) => p.isVerified);
    const totalEvidencePoints = projects.reduce((acc, p) => acc + (p.evidence ? p.evidence.length : 0), 0);

    // 4-Pillar Readiness Model
    const knowledge = skillData.telemetry.avgKnowledge;
    const practice = Math.min(100, Math.round(cpSolved * 5 + skillData.telemetry.avgPractice * 0.5));
    const projectScore = Math.min(100, verifiedProjects.length * 30 + projects.length * 10);
    const evidenceScore = Math.min(100, totalEvidencePoints * 25 + (verifiedProjects.length > 0 ? 30 : 0));

    const readinessScore = Math.round(
      knowledge * 0.35 + practice * 0.30 + projectScore * 0.20 + evidenceScore * 0.15
    );

    // Employer Confidence Signal
    const employerConfidence = Math.round(
      (verifiedProjects.length > 0 ? 40 : 0) +
      Math.min(30, totalEvidencePoints * 10) +
      Math.min(30, (knowledge / 100) * 30)
    );

    // Decision Engine Logic
    let decision: CareerDecisionStatus = 'NOT_READY';
    let decisionTitle = '';
    let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';

    if (readinessScore >= 75 && employerConfidence >= 65) {
      decision = 'APPLY_NOW';
      priority = 'LOW';
      decisionTitle = `High readiness detected for ${profile.targetRoleName}. Ready to apply for internships & junior roles!`;
    } else if (knowledge >= 60 && employerConfidence < 40) {
      decision = 'BUILD_MORE_EVIDENCE';
      priority = 'HIGH';
      decisionTitle = `Solid theoretical knowledge, but verified project evidence is low for ${profile.targetRoleName}.`;
    } else if (readinessScore >= 45) {
      decision = 'PREPARE_THEN_APPLY';
      priority = 'MEDIUM';
      decisionTitle = `Promising baseline for ${profile.targetRoleName}. Focus on target skill gaps before applying.`;
    } else {
      decision = 'NOT_READY';
      priority = 'HIGH';
      decisionTitle = `Currently building foundational CSE competencies for ${profile.targetRoleName}.`;
    }

    // Determine Next Best Action
    let nextBestAction = {
      type: 'TAKE_DIAGNOSTIC',
      title: 'Complete Comprehensive CSE Diagnostic',
      description: 'Establish baseline skill confidence across algorithms, databases, and web frameworks.',
      actionUrl: '/dashboard/diagnostic',
    };

    if (diagnosticAttempts.length === 0) {
      nextBestAction = {
        type: 'TAKE_DIAGNOSTIC',
        title: 'Take the Diagnostic Assessment',
        description: 'Take 25 questions to reveal your strengths and calculate your personalized skill graph.',
        actionUrl: '/dashboard/diagnostic',
      };
    } else if (gapsData.criticalGapsCount > 0) {
      const topGap = gapsData.gaps.find((g) => g.status === 'CRITICAL_GAP');
      nextBestAction = {
        type: 'LEARN_SKILL',
        title: `Bridge Critical Gap: ${topGap?.name || 'Core Skills'}`,
        description: `Your knowledge is at ${topGap?.currentKnowledge || 0}%, below the required ${topGap?.requiredKnowledge || 60}%. Complete recommended learning modules.`,
        actionUrl: '/dashboard/roadmap',
      };
    } else if (verifiedProjects.length === 0) {
      nextBestAction = {
        type: 'BUILD_PROJECT',
        title: `Build & Verify a Portfolio Project for ${profile.targetRoleName}`,
        description: 'Create a full-stack project or import a GitHub repository to earn cryptographic skill evidence.',
        actionUrl: '/dashboard/projects',
      };
    } else if (practice < 50) {
      nextBestAction = {
        type: 'PRACTICE_CP',
        title: 'Solve Competitive Programming Problems',
        description: 'Level up your algorithmic problem-solving confidence on Virtual Judge / Codeforces.',
        actionUrl: '/dashboard/cp',
      };
    }

    // Industry Benchmark Comparison
    const seniorBenchmark = {
      role: profile.targetRoleName,
      seniorPercentile: 90,
      benchmarks: {
        knowledge: 85,
        practice: 80,
        projects: 90,
        evidence: 85,
      },
      studentScores: {
        knowledge,
        practice,
        projects: projectScore,
        evidence: evidenceScore,
      },
    };

    return {
      profile,
      readiness: {
        score: readinessScore,
        scores: {
          knowledge,
          practice,
          projects: projectScore,
          evidence: evidenceScore,
        },
        employerConfidenceSignal: employerConfidence,
      },
      decision: {
        status: decision,
        priority,
        title: decisionTitle,
      },
      nextBestAction,
      seniorBenchmark,
      criticalGaps: gapsData.gaps.filter((g) => g.status === 'CRITICAL_GAP'),
    };
  }
}
