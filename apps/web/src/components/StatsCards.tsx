import { MessageSquare, CheckCircle2, Clock, Star, ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  averageRating: number;
  todayCount: number;
  weeklyCount: number;
}

export default function StatsCards({ total, averageRating, todayCount, weeklyCount }: StatsCardsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Feedback */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-[#5D3FD3] fill-[#5D3FD3]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Total Feedback</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">
              {total.toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-slate-400">
          <span>Overall feedbacks received</span>
        </div>
      </div>

      {/* Avg Rating */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-blue-500 fill-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Avg Rating</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900 flex items-baseline gap-1">
              {averageRating.toFixed(1)} <span className="text-sm font-semibold text-slate-400">/ 5</span>
            </h3>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-slate-400">
          <span>Based on all reviews</span>
        </div>
      </div>

      {/* This Week */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-500 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">This Week</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">
              {weeklyCount.toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-slate-400">
          <span>Feedbacks this week</span>
        </div>
      </div>

      {/* Today */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-orange-500 fill-orange-500 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Today</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">
              {todayCount.toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-slate-400">
          <span>Feedbacks today</span>
        </div>
      </div>
    </div>
  );
}
