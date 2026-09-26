import { Controller, Get, Post, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CpService } from './cp.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('cp')
export class CpController {
  constructor(private cpService: CpService) {}

  @Get('problems')
  async getProblems(@Query('topic') topic?: string, @Query('difficulty') difficulty?: string) {
    return this.cpService.getProblems(topic, difficulty);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-progress')
  async getStudentProgress(@Request() req: any) {
    return this.cpService.getStudentProgress(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('solve/:problemId')
  async recordSolve(@Request() req: any, @Param('problemId') problemId: string) {
    return this.cpService.recordSolve(req.user.id, problemId);
  }
}
