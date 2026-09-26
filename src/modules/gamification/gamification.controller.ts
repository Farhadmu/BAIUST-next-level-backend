import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('gamification')
export class GamificationController {
  constructor(private gamificationService: GamificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getUserGamification(@Request() req: any) {
    return this.gamificationService.getUserGamification(req.user.id);
  }
}
