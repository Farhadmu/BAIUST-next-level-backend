import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { CareerIntelligenceService, UpdateCareerProfileDto } from './career-intelligence.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('career-intelligence')
export class CareerIntelligenceController {
  constructor(private careerIntelligenceService: CareerIntelligenceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.careerIntelligenceService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req: any, @Body() dto: UpdateCareerProfileDto) {
    return this.careerIntelligenceService.updateProfile(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('twin')
  async getCareerTwin(@Request() req: any) {
    return this.careerIntelligenceService.getCareerTwin(req.user.id);
  }
}
