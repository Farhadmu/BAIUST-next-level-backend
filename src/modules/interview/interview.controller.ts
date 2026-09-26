import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { InterviewService, StartInterviewDto, SubmitInterviewAnswerDto } from './interview.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start')
  async startSession(@Request() req: any, @Body() dto: StartInterviewDto) {
    return this.interviewService.startSession(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('answer')
  async submitAnswer(@Request() req: any, @Body() dto: SubmitInterviewAnswerDto) {
    return this.interviewService.submitAnswer(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('complete/:sessionId')
  async completeSession(@Request() req: any, @Param('sessionId') sessionId: string) {
    return this.interviewService.completeSession(req.user.id, sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-sessions')
  async getRecentSessions(@Request() req: any) {
    return this.interviewService.getRecentSessions(req.user.id);
  }
}
