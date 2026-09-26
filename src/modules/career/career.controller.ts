import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CareerService } from './career.service';

@ApiTags('Career Roadmaps')
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get('tracks')
  @ApiOperation({ summary: 'Get all CSE career roadmaps with modules count' })
  getAllTracks() {
    return {
      success: true,
      data: this.careerService.getAllTracks(),
    };
  }

  @Get('tracks/:slug')
  @ApiOperation({ summary: 'Get detailed roadmap, prerequisites and topics for a career track' })
  getTrack(@Param('slug') slug: string) {
    const track = this.careerService.getTrackBySlug(slug);
    if (!track) {
      throw new NotFoundException(`Career track '${slug}' not found`);
    }
    return {
      success: true,
      data: track,
    };
  }
}
