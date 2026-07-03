import { Controller, Get, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('analytics_summary')
  @CacheTTL(60000) // cache for 60 seconds
  @ApiOperation({ summary: 'Get analytics summary' })
  getSummary() {
    return this.analyticsService.getSummary();
  }
  @Get('trends')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get feedback trends' })
  getTrends(@Query('days') days?: string) {
    const parsedDays = days ? parseInt(days, 10) : 30;
    return this.analyticsService.getTrends(parsedDays);
  }
}
