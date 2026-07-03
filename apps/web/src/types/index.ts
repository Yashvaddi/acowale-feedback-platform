export enum FeedbackCategory {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  SUPPORT = 'SUPPORT',
  BILLING = 'BILLING',
  OTHER = 'OTHER',
}

export enum FeedbackStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  category: FeedbackCategory;
  comment: string;
  rating: number;
  status: FeedbackStatus;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalFeedbacks: number;
  averageRating: number;
  todayCount: number;
  weeklyCount: number;
  categoryDistribution: {
    category: FeedbackCategory;
    count: number;
  }[];
  recentFeedbacks: Feedback[];
}

export interface TrendData {
  date: string;
  dateKey: string;
  count: number;
}
