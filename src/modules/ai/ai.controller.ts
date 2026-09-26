import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService, ChatMessage } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

export class ChatWithCopilotDto {
  messages: ChatMessage[];
}

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('chat')
  async chatWithCopilot(@Request() req: any, @Body() dto: ChatWithCopilotDto) {
    const systemPrompt = await this.aiService.buildStudentContextPrompt(req.user.id);
    return this.aiService.generateCompletion({
      feature: 'COPILOT',
      systemPrompt,
      messages: dto.messages,
      userId: req.user.id,
      temperature: 0.7,
    });
  }
}
