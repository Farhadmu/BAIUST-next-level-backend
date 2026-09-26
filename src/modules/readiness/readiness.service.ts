import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillsService } from '../skills/skills.service';

export const SAMPLE_TECH_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Full Stack Engineer',
    company: 'Optimizely / Brain Station 23',
    location: 'Dhaka (Hybrid)',
    jobType: 'FULL_TIME',
    requiredSkills: ['react', 'nodejs', 'typescript', 'postgresql'],
    preferredSkills: ['docker', 'nextjs', 'tailwind'],
    description: 'Looking for an enthusiastic CSE graduate proficient in React, Node.js, and relational databases.',
  },
  {
    id: 'job-2',
    title: 'Software Engineer (Backend)',
    company: 'Chaldal Tech',
    location: 'Dhaka (On-site)',
    jobType: 'FULL_TIME',
    requiredSkills: ['dsa', 'oop', 'postgresql', 'system-design'],
    preferredSkills: ['docker', 'linux', 'git'],
    description: 'Build high-scale distributed backend systems and optimize database queries.',
  },
  {
    id: 'job-3',
    title: 'Software Development Engineer in Test (SDET) Intern',
    company: 'Samsung R&D Institute Bangladesh',
    location: 'Dhaka (On-site)',
    jobType: 'INTERNSHIP',
    requiredSkills: ['cpp', 'dsa', 'git', 'oop'],
    preferredSkills: ['linux', 'python'],
    description: 'Exciting internship opportunity for pre-final and final year CSE undergraduates passionate about algorithms and systems.',
  },
];

@Injectable()
export class ReadinessService {
  constructor(
    private prisma: PrismaService,
    private skillsService: SkillsService,
  ) {}

  async getJobsWithReadiness(userId: string) {
    let studentSkills: any[] = [];
    try {
      studentSkills = await this.prisma.studentSkillState.findMany({
        where: { userId },
      });
    } catch (e) {
      studentSkills = [
        { skillSlug: 'react', knowledgeScore: 78 },
        { skillSlug: 'nodejs', knowledgeScore: 74 },
        { skillSlug: 'typescript', knowledgeScore: 72 },
        { skillSlug: 'dsa', knowledgeScore: 68 },
        { skillSlug: 'postgresql', knowledgeScore: 65 },
        { skillSlug: 'git', knowledgeScore: 85 },
      ];
    }

    const skillScoreMap = new Map<string, number>();
    for (const s of studentSkills) {
      skillScoreMap.set(s.skillSlug, s.knowledgeScore);
    }

    const evaluatedJobs = SAMPLE_TECH_JOBS.map((job) => {
      let matchedCount = 0;
      const missingSkills: string[] = [];

      for (const req of job.requiredSkills) {
        const score = skillScoreMap.get(req) || 0;
        if (score >= 60) {
          matchedCount += 1;
        } else {
          missingSkills.push(req);
        }
      }

      const matchPercent = Math.round((matchedCount / job.requiredSkills.length) * 100);

      let readinessStatus: 'HIGH_MATCH' | 'MODERATE_MATCH' | 'GAPS_PRESENT' = 'GAPS_PRESENT';
      if (matchPercent >= 75) readinessStatus = 'HIGH_MATCH';
      else if (matchPercent >= 50) readinessStatus = 'MODERATE_MATCH';

      return {
        ...job,
        matchPercent,
        readinessStatus,
        matchedSkillsCount: matchedCount,
        totalRequiredSkills: job.requiredSkills.length,
        missingSkills,
        suggestedAction: missingSkills.length > 0
          ? `Strengthen ${missingSkills.slice(0, 2).join(' & ')} via roadmap modules.`
          : 'High alignment! Review interview questions and submit your application.',
      };
    });

    return evaluatedJobs;
  }
}
