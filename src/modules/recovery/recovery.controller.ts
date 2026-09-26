import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('recovery')
export class RecoveryController {
  constructor(private recoveryService: RecoveryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('plan')
  async getAdaptiveRecoveryPlan(@Request() req: any) {
    return this.recoveryService.getAdaptiveRecoveryPlan(req.user.id);
  }
}
