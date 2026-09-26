import { Module } from '@nestjs/common';
import { CareerIntelligenceController } from './career-intelligence.controller';
import { CareerIntelligenceService } from './career-intelligence.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [PrismaModule, SkillsModule],
  controllers: [CareerIntelligenceController],
  providers: [CareerIntelligenceService],
  exports: [CareerIntelligenceService],
})
export class CareerIntelligenceModule {}
