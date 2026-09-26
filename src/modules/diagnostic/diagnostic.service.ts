import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface StartDiagnosticDto {
  targetRole?: string;
}

export interface SubmitAnswerDto {
  attemptId: string;
  questionId: string;
  selectedAnswer: string;
}

@Injectable()
export class DiagnosticService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(category?: string) {
    return this.prisma.diagnosticQuestion.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        question: true,
        description: true,
        category: true,
        skill: true,
        options: true,
        difficulty: true,
        order: true,
      },
    });
  }

  async startAttempt(userId: string, dto?: StartDiagnosticDto) {
    const totalQuestions = await this.prisma.diagnosticQuestion.count({
      where: { isActive: true },
    });

    const attempt = await this.prisma.diagnosticAttempt.create({
      data: {
        userId,
        targetRole: dto?.targetRole || 'Full Stack Developer',
        totalQuestions,
        answeredQuestions: 0,
        status: 'IN_PROGRESS',
      },
    });

    return attempt;
  }

  async submitAnswer(userId: string, dto: SubmitAnswerDto) {
    const attempt = await this.prisma.diagnosticAttempt.findUnique({
      where: { id: dto.attemptId },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new NotFoundException('Diagnostic attempt not found');
    }

    if (attempt.status === 'COMPLETED') {
      throw new BadRequestException('This diagnostic attempt is already completed');
    }

    const question = await this.prisma.diagnosticQuestion.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const isCorrect = dto.selectedAnswer.trim() === question.correctAnswer.trim();

    const answer = await this.prisma.diagnosticAnswer.upsert({
      where: {
        attemptId_questionId: {
          attemptId: dto.attemptId,
          questionId: dto.questionId,
        },
      },
      update: {
        selectedAnswer: dto.selectedAnswer,
        isCorrect,
      },
      create: {
        attemptId: dto.attemptId,
        questionId: dto.questionId,
        selectedAnswer: dto.selectedAnswer,
        isCorrect,
      },
    });

    const answeredCount = await this.prisma.diagnosticAnswer.count({
      where: { attemptId: dto.attemptId },
    });

    await this.prisma.diagnosticAttempt.update({
      where: { id: dto.attemptId },
      data: { answeredQuestions: answeredCount },
    });

    return {
      success: true,
      answerId: answer.id,
      isCorrect,
      answeredCount,
      totalQuestions: attempt.totalQuestions,
    };
  }

  async completeAttempt(userId: string, attemptId: string) {
    const attempt = await this.prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: {
          include: { question: true },
        },
      },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new NotFoundException('Diagnostic attempt not found');
    }

    const totalAnswered = attempt.answers.length;
    const correctCount = attempt.answers.filter((a) => a.isCorrect).length;
    const scorePercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    // Update attempt
    const completedAttempt = await this.prisma.diagnosticAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'COMPLETED',
        score: scorePercentage,
        completedAt: new Date(),
      },
    });

    // Compute skill breakdown and update StudentSkillState
    const skillStats: Record<string, { total: number; correct: number }> = {};
    for (const ans of attempt.answers) {
      const skillSlug = ans.question.skill.toLowerCase();
      if (!skillStats[skillSlug]) {
        skillStats[skillSlug] = { total: 0, correct: 0 };
      }
      skillStats[skillSlug].total += 1;
      if (ans.isCorrect) {
        skillStats[skillSlug].correct += 1;
      }
    }

    // Upsert StudentSkillState and log to SkillStateHistory
    for (const [skillSlug, stats] of Object.entries(skillStats)) {
      const calculatedKnowledge = Math.round((stats.correct / stats.total) * 100);

      await this.prisma.studentSkillState.upsert({
        where: {
          userId_skillSlug: {
            userId,
            skillSlug,
          },
        },
        update: {
          knowledgeScore: calculatedKnowledge,
          lastReviewed: new Date(),
        },
        create: {
          userId,
          skillSlug,
          knowledgeScore: calculatedKnowledge,
          practiceScore: 0,
          projectScore: 0,
          evidenceScore: 0,
        },
      });

      await this.prisma.skillStateHistory.create({
        data: {
          userId,
          skillSlug,
          knowledgeScore: calculatedKnowledge,
          practiceScore: 0,
          projectScore: 0,
          evidenceScore: 0,
        },
      });
    }

    // Award XP via Gamification if present
    try {
      await this.prisma.userGamification.upsert({
        where: { userId },
        update: {
          totalXp: { increment: 100 },
          lastActiveAt: new Date(),
        },
        create: {
          userId,
          totalXp: 100,
          currentLevel: 1,
          gemsBalance: 30,
        },
      });

      await this.prisma.xPTransaction.create({
        data: {
          userId,
          amount: 100,
          actionType: 'DIAGNOSTIC_COMPLETED',
          referenceId: attemptId,
          description: `Completed Diagnostic Assessment with score ${scorePercentage}%`,
        },
      });
    } catch (e) {
      // Gamification non-blocking
    }

    return {
      attemptId,
      status: 'COMPLETED',
      totalQuestions: attempt.totalQuestions,
      answeredCount: totalAnswered,
      correctCount,
      score: scorePercentage,
      skillBreakdown: skillStats,
      completedAt: completedAttempt.completedAt,
    };
  }

  async getLatestAttempt(userId: string) {
    return this.prisma.diagnosticAttempt.findFirst({
      where: { userId, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      include: {
        answers: {
          include: { question: true },
        },
      },
    });
  }
}
