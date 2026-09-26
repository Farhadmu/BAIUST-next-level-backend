import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getOverviewAnalytics() {
    try {
      const [
        totalUsers,
        totalStudents,
        totalRoadmaps,
        totalDiagnostics,
        totalProjects,
        verifiedProjects,
        totalCpSolves,
        totalInterviews,
        recentAiLogs,
        recentAudits,
      ] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.studentProfile.count(),
        this.prisma.personalizedRoadmap.count(),
        this.prisma.diagnosticAttempt.count(),
        this.prisma.studentProject.count(),
        this.prisma.studentProject.count({ where: { isVerified: true } }),
        this.prisma.studentProblemProgress.count(),
        this.prisma.interviewSession.count(),
        this.prisma.aiUsageLog.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
        this.prisma.auditLog.findMany({ take: 10, orderBy: { timestamp: 'desc' } }),
      ]);

      return {
        kpis: {
          totalUsers: Math.max(totalUsers, 1),
          totalStudents: Math.max(totalStudents, 1),
          activeRoadmaps: totalRoadmaps,
          completedDiagnostics: totalDiagnostics,
          totalProjects,
          verifiedProjects,
          totalCpSolves,
          mockInterviewsDone: totalInterviews,
        },
        recentAiActivity: recentAiLogs,
        recentAuditTrail: recentAudits,
      };
    } catch (e) {
      return {
        kpis: {
          totalUsers: 1,
          totalStudents: 1,
          activeRoadmaps: 0,
          completedDiagnostics: 0,
          totalProjects: 0,
          verifiedProjects: 0,
          totalCpSolves: 0,
          mockInterviewsDone: 0,
        },
        recentAiActivity: [],
        recentAuditTrail: [],
      };
    }
  }

  async getAiUsageStats() {
    try {
      const logs = await this.prisma.aiUsageLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      const providerCounts: Record<string, number> = {};
      const featureCounts: Record<string, number> = {};
      let totalTokens = 0;
      let totalDurationMs = 0;

      for (const log of logs) {
        providerCounts[log.provider] = (providerCounts[log.provider] || 0) + 1;
        featureCounts[log.feature] = (featureCounts[log.feature] || 0) + 1;
        totalTokens += log.tokensUsed || 0;
        totalDurationMs += log.durationMs || 0;
      }

      return {
        totalCalls: logs.length,
        totalTokens,
        avgLatencyMs: logs.length > 0 ? Math.round(totalDurationMs / logs.length) : 0,
        providerBreakdown: providerCounts,
        featureBreakdown: featureCounts,
        recentLogs: logs.slice(0, 20),
      };
    } catch (e) {
      return {
        totalCalls: 0,
        totalTokens: 0,
        avgLatencyMs: 0,
        providerBreakdown: {},
        featureBreakdown: {},
        recentLogs: [],
      };
    }
  }

  async getSystemHealth() {
    let dbStatus = 'DISCONNECTED';
    let dbLatencyMs = 0;

    try {
      const start = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      dbLatencyMs = Date.now() - start;
      dbStatus = 'HEALTHY';
    } catch (e) {
      dbStatus = 'ERROR';
    }

    const mem = process.memoryUsage();

    return {
      status: dbStatus === 'HEALTHY' ? 'OPERATIONAL' : 'DEGRADED',
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
      memory: {
        heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(mem.heapTotal / 1024 / 1024),
        rssMb: Math.round(mem.rss / 1024 / 1024),
      },
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async getStudentsList() {
    return this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        studentProfile: {
          select: {
            studentId: true,
            currentSemester: true,
            cgpa: true,
          },
        },
        careerProfile: {
          select: {
            targetRoleName: true,
          },
        },
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
  }
}
