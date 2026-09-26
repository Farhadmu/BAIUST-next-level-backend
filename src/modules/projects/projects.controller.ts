import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService, GenerateSpecDto, ImportGithubProjectDto } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-projects')
  async getStudentProjects(@Request() req: any) {
    return this.projectsService.getStudentProjects(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-spec')
  async generateBuildSpec(@Request() req: any, @Body() dto: GenerateSpecDto) {
    return this.projectsService.generateBuildSpec(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('import-github')
  async importGithubProject(@Request() req: any, @Body() dto: ImportGithubProjectDto) {
    return this.projectsService.importGithubProject(req.user.id, dto);
  }

  // Public endpoint for recruiters to verify proof tokens!
  @Get('verify/:token')
  async verifyProofToken(@Param('token') token: string) {
    return this.projectsService.getPublicProofToken(token);
  }
}
