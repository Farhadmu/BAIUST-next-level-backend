import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { DiagnosticService, StartDiagnosticDto, SubmitAnswerDto } from './diagnostic.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private diagnosticService: DiagnosticService) {}

  @Get('questions')
  async getQuestions(@Query('category') category?: string) {
    return this.diagnosticService.getQuestions(category);
  }

  @UseGuards(JwtAuthGuard)
  @Post('start')
  async startAttempt(@Request() req: any, @Body() dto: StartDiagnosticDto) {
    return this.diagnosticService.startAttempt(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('answer')
  async submitAnswer(@Request() req: any, @Body() dto: SubmitAnswerDto) {
    return this.diagnosticService.submitAnswer(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('complete/:attemptId')
  async completeAttempt(@Request() req: any, @Param('attemptId') attemptId: string) {
    return this.diagnosticService.completeAttempt(req.user.id, attemptId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('latest')
  async getLatestAttempt(@Request() req: any) {
    return this.diagnosticService.getLatestAttempt(req.user.id);
  }
}
