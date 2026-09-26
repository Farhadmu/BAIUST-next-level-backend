import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRoleType } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('overview')
  async getOverviewAnalytics() {
    return this.adminService.getOverviewAnalytics();
  }

  @Get('ai-usage')
  async getAiUsageStats() {
    return this.adminService.getAiUsageStats();
  }

  @Get('system-health')
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN)
  @Get('students')
  async getStudentsList() {
    return this.adminService.getStudentsList();
  }
}
