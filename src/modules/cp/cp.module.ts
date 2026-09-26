import { Module } from '@nestjs/common';
import { CpController } from './cp.controller';
import { CpService } from './cp.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CpController],
  providers: [CpService],
  exports: [CpService],
})
export class CpModule {}
