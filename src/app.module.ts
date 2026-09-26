import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { CareerModule } from './modules/career/career.module';
import { AcademicModule } from './modules/academic/academic.module';
import { ToolsModule } from './modules/tools/tools.module';
import { AdminModule } from './modules/admin/admin.module';

// Integrated AIPather Intelligence Modules
import { DiagnosticModule } from './modules/diagnostic/diagnostic.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CareerIntelligenceModule } from './modules/career-intelligence/career-intelligence.module';
import { RoadmapModule } from './modules/roadmap/roadmap.module';
import { AiModule } from './modules/ai/ai.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { CpModule } from './modules/cp/cp.module';
import { InterviewModule } from './modules/interview/interview.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ReadinessModule } from './modules/readiness/readiness.module';
import { RecoveryModule } from './modules/recovery/recovery.module';
import { GamificationModule } from './modules/gamification/gamification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    AnnouncementsModule,
    CareerModule,
    AcademicModule,
    ToolsModule,
    AdminModule,

    // Intelligence Engines
    DiagnosticModule,
    SkillsModule,
    CareerIntelligenceModule,
    RoadmapModule,
    AiModule,
    ProjectsModule,
    CpModule,
    InterviewModule,
    ResumeModule,
    ReadinessModule,
    RecoveryModule,
    GamificationModule,
  ],
})
export class AppModule {}

