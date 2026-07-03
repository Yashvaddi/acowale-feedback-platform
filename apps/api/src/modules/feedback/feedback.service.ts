import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.prisma.feedback.create({
      data: createFeedbackDto,
    });
    return { success: true, message: 'Feedback submitted', data: feedback };
  }

  async findAll(page = 1, limit = 10, search?: string, category?: string, rating?: number, dateRange?: string, sortBy = 'createdAt', sortOrder = 'desc') {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (search) {
      where.OR = [
        { comment: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) {
      where.category = category;
    }
    if (rating) {
      where.rating = rating;
    }
    if (dateRange) {
      const now = new Date();
      if (dateRange === 'today') {
        where.createdAt = { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) };
      } else if (dateRange === '7days') {
        where.createdAt = { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7) };
      } else if (dateRange === '30days') {
        where.createdAt = { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30) };
      }
    }

    const orderBy: any = {};
    if (sortBy === 'name') {
      orderBy.name = sortOrder;
    } else if (sortBy === 'comment') {
      orderBy.comment = sortOrder;
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder;
    } else if (sortBy === 'rating') {
      orderBy.rating = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    const [data, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async exportAll() {
    const feedbacks = await this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let csv = 'Name,Email,Category,Rating,Date,Comment\n';
    for (const f of feedbacks) {
      const date = f.createdAt.toISOString().split('T')[0];
      const comment = `"${f.comment.replace(/"/g, '""')}"`;
      const name = `"${(f.name || '').replace(/"/g, '""')}"`;
      const email = `"${(f.email || '').replace(/"/g, '""')}"`;
      csv += `${name},${email},${f.category},${f.rating},${date},${comment}\n`;
    }
    
    return csv;
  }
}
