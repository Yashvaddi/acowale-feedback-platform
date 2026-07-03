import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const totalFeedbacks = await this.prisma.feedback.count();
    
    const ratingAggregate = await this.prisma.feedback.aggregate({
      _avg: {
        rating: true,
      },
    });

    const categoryDistribution = await this.prisma.feedback.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    });

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

    const todayCount = await this.prisma.feedback.count({
      where: { createdAt: { gte: startOfToday } },
    });

    const weeklyCount = await this.prisma.feedback.count({
      where: { createdAt: { gte: startOfWeek } },
    });

    const recentFeedbacks = await this.prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return {
      totalFeedbacks,
      averageRating: ratingAggregate._avg.rating || 0,
      todayCount,
      weeklyCount,
      categoryDistribution: categoryDistribution.map(c => ({
        category: c.category,
        count: c._count.category,
      })),
      recentFeedbacks,
    };
  }

  async getTrends(days: number = 30) {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);

    // Get feedback counts grouped by date
    const feedbacks = await this.prisma.feedback.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Post-process to group by day string (YYYY-MM-DD)
    const dailyCounts: Record<string, number> = {};
    for (const f of feedbacks) {
      const dateStr = f.createdAt.toISOString().split('T')[0];
      dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + f._count.id;
    }

    // Fill in missing days
    const trendData = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      // Format as "May 11" for frontend
      const displayDate = d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
      trendData.push({
        date: displayDate,
        dateKey: dateStr,
        count: dailyCounts[dateStr] || 0,
      });
    }

    return trendData;
  }
}
