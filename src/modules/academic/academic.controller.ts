import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AcademicService } from './academic.service';

@ApiTags('Academic Hub')
@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Get('courses')
  @ApiOperation({ summary: 'Get courses list with optional semester and search filter' })
  getCourses(@Query('semester') semester?: number, @Query('search') search?: string) {
    return {
      success: true,
      data: this.academicService.getCourses(semester, search),
    };
  }

  @Get('resources')
  @ApiOperation({ summary: 'Get academic resources with category and search filter' })
  getResources(
    @Query('category') category?: string,
    @Query('courseCode') courseCode?: string,
    @Query('search') search?: string,
  ) {
    return {
      success: true,
      data: this.academicService.getResources(category, courseCode, search),
    };
  }
}
