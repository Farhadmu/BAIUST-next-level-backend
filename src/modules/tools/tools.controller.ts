import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ToolsService } from './tools.service';

@ApiTags('Student Tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('catalog')
  @ApiOperation({ summary: 'Get list of available student utilities and productivity tools' })
  getCatalog() {
    return {
      success: true,
      data: this.toolsService.getToolsCatalog(),
    };
  }
}
