import { Module } from '@nestjs/common';
import { ReadinessController } from './readiness.controller';
import { ReadinessService } from './readiness.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [PrismaModule, SkillsModule],
  controllers: [ReadinessController],
  providers: [ReadinessService],
  exports: [ReadinessService],
})
export class ReadinessModule {}
