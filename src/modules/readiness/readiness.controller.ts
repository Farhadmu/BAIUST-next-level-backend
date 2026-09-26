import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ReadinessService } from './readiness.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('readiness')
export class ReadinessController {
  constructor(private readinessService: ReadinessService) {}

  @UseGuards(JwtAuthGuard)
  @Get('jobs')
  async getJobsWithReadiness(@Request() req: any) {
    return this.readinessService.getJobsWithReadiness(req.user.id);
  }
}
