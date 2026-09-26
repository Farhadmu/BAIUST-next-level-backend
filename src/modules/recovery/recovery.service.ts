import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecoveryService {
  constructor(private prisma: PrismaService) {}

  async getAdaptiveRecoveryPlan(userId: string) {
    const [gamification, roadmap] = await Promise.all([
      this.prisma.userGamification.findUnique({ where: { userId } }),
      this.prisma.personalizedRoadmap.findFirst({
        where: { userId, status: 'ACTIVE' },
        include: { milestones: true },
      }),
    ]);

    const lastActive = gamification?.lastActiveAt || new Date();
    const daysInactive = Math.max(0, Math.floor((Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24)));

    const pendingMilestones = roadmap?.milestones.filter((m) => m.status !== 'COMPLETED') || [];
    const learningDebtHours = Math.min(40, pendingMilestones.length * 6);

    // Supportive zero-guilt micro-tasks
    const recoveryPlan = [
      {
        day: 1,
        title: 'Gentle Warm-up: 15-Minute Concept Review',
        task: 'Read over your current roadmap notes without coding pressure.',
        durationMinutes: 15,
        xpReward: 20,
      },
      {
        day: 2,
        title: 'Core Refresh: Solve 1 Easy Problem or Lab Exercise',
        task: 'Tackle a single easy question on Virtual Judge or review lab syntax.',
        durationMinutes: 25,
        xpReward: 35,
      },
      {
        day: 3,
        title: 'Hands-on Momentum: 30-Minute Code Snippet',
        task: 'Write a small controller or component for your current project.',
        durationMinutes: 30,
        xpReward: 40,
      },
      {
        day: 4,
        title: 'Full Velocity Resumption',
        task: 'Resume your active roadmap milestone with zero backlog guilt.',
        durationMinutes: 45,
        xpReward: 50,
      },
    ];

    return {
      status: daysInactive >= 5 ? 'NEEDS_RECOVERY' : 'ON_TRACK',
      daysInactive,
      learningDebtHours,
      supportiveMessage: daysInactive >= 5
        ? 'Welcome back! Life and university exams happen. Your progress is completely preserved. Here is a low-stress, zero-guilt catch-up plan to regain your momentum.'
        : 'You are doing great! Keep building steady daily consistency.',
      recommendedVelocityHoursPerWeek: 8,
      plan: recoveryPlan,
    };
  }
}
