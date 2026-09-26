import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [PrismaModule, SkillsModule],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}
