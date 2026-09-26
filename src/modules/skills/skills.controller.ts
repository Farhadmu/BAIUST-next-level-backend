import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get('catalog')
  async getAllSkills() {
    return this.skillsService.getAllSkills();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getStudentSkillProfile(@Request() req: any) {
    return this.skillsService.getStudentSkillProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('gaps')
  async getSkillGaps(@Request() req: any, @Query('targetRole') targetRole?: string) {
    return this.skillsService.getSkillGaps(req.user.id, targetRole);
  }
}
