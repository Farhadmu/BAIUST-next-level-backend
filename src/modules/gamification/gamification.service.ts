import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export const SYSTEM_ACHIEVEMENTS = [
  { code: 'FIRST_DIAGNOSTIC', title: 'First Diagnostic', description: 'Completed baseline CSE diagnostic assessment', badgeIcon: '🧭', category: 'ONBOARDING', xpReward: 100 },
  { code: 'FIRST_MILESTONE', title: 'Roadmap Initiator', description: 'Mastered your first learning milestone', badgeIcon: '🚀', category: 'ROADMAP', xpReward: 50 },
  { code: 'CP_CENTURION', title: 'Problem Solver', description: 'Solved competitive programming problems on the platform', badgeIcon: '⚡', category: 'CP', xpReward: 75 },
  { code: 'PROOF_OF_WORK', title: 'Cryptographic Proof', description: 'Verified a public GitHub portfolio project', badgeIcon: '🛡️', category: 'PROJECT', xpReward: 150 },
  { code: 'INTERVIEW_READY', title: 'Interview Warrior', description: 'Completed an AI technical mock interview session', badgeIcon: '🎯', category: 'CAREER', xpReward: 120 },
];

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getUserGamification(userId: string) {
    let gamification = await this.prisma.userGamification.findUnique({
      where: { userId },
    });

    if (!gamification) {
      gamification = await this.prisma.userGamification.create({
        data: {
          userId,
          totalXp: 150,
          currentLevel: 1,
          gemsBalance: 25,
          streakDays: 1,
          lastActiveAt: new Date(),
        },
      });
    }

    const [transactions, achievements] = await Promise.all([
      this.prisma.xPTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      this.prisma.userAchievement.findMany({
        where: { userId },
        orderBy: { unlockedAt: 'desc' },
      }),
    ]);

    // Calculate level based on XP (every 250 XP = +1 Level)
    const calculatedLevel = Math.max(1, Math.floor(gamification.totalXp / 250) + 1);
    const xpInCurrentLevel = gamification.totalXp % 250;
    const xpToNextLevel = 250 - xpInCurrentLevel;

    if (calculatedLevel !== gamification.currentLevel) {
      gamification = await this.prisma.userGamification.update({
        where: { userId },
        data: { currentLevel: calculatedLevel },
      });
    }

    return {
      gamification: {
        ...gamification,
        xpInCurrentLevel,
        xpToNextLevel,
        progressPercent: Math.round((xpInCurrentLevel / 250) * 100),
      },
      recentTransactions: transactions,
      unlockedAchievements: achievements,
      catalog: SYSTEM_ACHIEVEMENTS,
    };
  }
}
