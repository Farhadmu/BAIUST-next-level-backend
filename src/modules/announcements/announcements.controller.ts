import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnnouncementsService, CreateAnnouncementDto } from './announcements.service';
import { AnnouncementCategory, UserRoleType } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get('ticker')
  @ApiOperation({ summary: 'Fetch live announcements ticker stream' })
  async getTicker() {
    const items = await this.announcementsService.getTickerItems();
    return { success: true, data: items };
  }

  @Get('feed')
  @ApiOperation({ summary: 'Fetch paginated editorial announcements feed' })
  async getFeed(@Query('category') category?: AnnouncementCategory) {
    const items = await this.announcementsService.getEditorialFeed(category);
    return { success: true, data: items };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleType.MODERATOR, UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new announcement or ticker notice' })
  async create(@Body() dto: CreateAnnouncementDto, @CurrentUser('id') authorId: string) {
    const item = await this.announcementsService.create(dto, authorId || 'admin-system');
    return { success: true, data: item };
  }
}
