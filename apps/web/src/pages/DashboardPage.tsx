import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary, getTrends } from '../services/api';
import StatsCards from '../components/StatsCards';
import CategoryChart from '../components/CategoryChart';
import FeedbackTrendChart from '../components/FeedbackTrendChart';
import AdminLayout from '../components/AdminLayout';
import { useState } from 'react';

export default function DashboardPage() {
  
  const { data, isLoading } = useQuery({
    queryKey: ['analyticsSummary'],
    queryFn: getAnalyticsSummary,
    refetchInterval: 30000,
  });

  const [trendDays, setTrendDays] = useState(30);
  const { data: trendData } = useQuery({
    queryKey: ['trends', trendDays],
    queryFn: () => getTrends(trendDays),
    refetchInterval: 30000,
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Overview</h2>
          <p className="text-sm font-medium text-slate-500">Real-time summary of customer feedback</p>
        </div>
      </div>

      {data && (
        <div className="mb-6">
          <StatsCards 
            total={data.totalFeedbacks} 
            averageRating={data.averageRating} 
            todayCount={data.todayCount}
            weeklyCount={data.weeklyCount}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {data && (
          <CategoryChart data={data.categoryDistribution} />
        )}
        {trendData && (
          <FeedbackTrendChart 
            data={trendData} 
            days={trendDays} 
            onDaysChange={setTrendDays} 
          />
        )}
      </div>
    </AdminLayout>
  );
}
