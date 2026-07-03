import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, Check } from 'lucide-react';
import { TrendData } from '../types';
import { useState } from 'react';

interface FeedbackTrendChartProps {
  data: TrendData[];
  days: number;
  onDaysChange: (days: number) => void;
}

export default function FeedbackTrendChart({ data, days, onDaysChange }: FeedbackTrendChartProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { value: 7, label: 'Last 7 Days' },
    { value: 30, label: 'Last 30 Days' },
    { value: 90, label: 'Last 90 Days' },
  ];
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6 relative">
        <h3 className="font-bold text-slate-900">Feedback Trend</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            {options.find(o => o.value === days)?.label || 'Last 30 Days'}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 py-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onDaysChange(opt.value);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    {opt.label}
                    {days === opt.value && <Check className="w-3.5 h-3.5 text-[#5D3FD3]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5D3FD3" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5D3FD3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', padding: '12px 16px' }}
              labelStyle={{ color: '#64748b', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: '#0f172a', fontSize: '14px', fontWeight: 700 }}
              formatter={(value) => [value, 'Total Feedback']}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#5D3FD3" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
