import { Controller, Get, Put, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ResumeService, UpdateResumeDto } from './resume.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-resume')
  async getResume(@Request() req: any) {
    return this.resumeService.getResume(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-resume')
  async updateResume(@Request() req: any, @Body() dto: UpdateResumeDto) {
    return this.resumeService.updateResume(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('analyze-ats')
  async analyzeWithAts(@Request() req: any) {
    return this.resumeService.analyzeWithAts(req.user.id);
  }
}
