import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';

interface CategoryChartProps {
  data: { category: string; count: number }[];
}

const COLORS = {
  PRODUCT: '#5D3FD3', // Purple
  SERVICE: '#3B82F6', // Blue
  SUPPORT: '#10B981', // Green
  BILLING: '#F59E0B', // Orange
  OTHER: '#EC4899',   // Pink
};

const DISPLAY_NAMES: Record<string, string> = {
  PRODUCT: 'Product',
  SERVICE: 'Service',
  SUPPORT: 'Support',
  BILLING: 'Billing',
  OTHER: 'Other',
};

export default function CategoryChart({ data }: CategoryChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0) || 1; // prevent div by zero
  
  // Sort data by count descending
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900">Category Distribution</h3>
      </div>

      <div className="flex-1 flex items-center">
        {/* Chart */}
        <div className="w-1/2 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="count"
                stroke="none"
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.category as keyof typeof COLORS] || '#94A3B8'} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 600, color: '#1E293B' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-1/2 pl-4 flex flex-col gap-3 justify-center">
          {sortedData.map((item, index) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: COLORS[item.category as keyof typeof COLORS] || '#94A3B8' }}
                  ></div>
                  <span className="font-semibold text-slate-700">
                    {DISPLAY_NAMES[item.category] || item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-semibold">{percentage}%</span>
                  <span className="text-slate-400 font-medium text-xs">({item.count})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
