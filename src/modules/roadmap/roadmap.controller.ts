import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('roadmap')
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @Get('tracks')
  async getTrackCatalog() {
    return this.roadmapService.getTrackCatalog();
  }

  @UseGuards(JwtAuthGuard)
  @Get('active')
  async getActiveRoadmap(@Request() req: any) {
    return this.roadmapService.getActiveRoadmap(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generatePersonalizedRoadmap(@Request() req: any, @Body('targetRole') targetRole?: string) {
    return this.roadmapService.generatePersonalizedRoadmap(req.user.id, targetRole);
  }

  @UseGuards(JwtAuthGuard)
  @Post('milestone/:milestoneId/toggle')
  async toggleMilestone(@Request() req: any, @Param('milestoneId') milestoneId: string) {
    return this.roadmapService.toggleMilestone(req.user.id, milestoneId);
  }
}
