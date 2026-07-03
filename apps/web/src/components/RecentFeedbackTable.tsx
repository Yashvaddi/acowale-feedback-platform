import { Feedback } from '../types';
import { ArrowRight, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeedbacks } from '../services/api';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';

interface RecentFeedbackTableProps {
  initialData?: Feedback[];
}

const CATEGORY_COLORS: Record<string, string> = {
  PRODUCT: 'bg-purple-100 text-purple-700',
  SERVICE: 'bg-blue-100 text-blue-700',
  SUPPORT: 'bg-emerald-100 text-emerald-700',
  BILLING: 'bg-pink-100 text-pink-700',
  OTHER: 'bg-slate-100 text-slate-700',
};

const CATEGORY_NAMES: Record<string, string> = {
  PRODUCT: 'Product',
  SERVICE: 'Service',
  SUPPORT: 'Support',
  BILLING: 'Billing',
  OTHER: 'Other',
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-red-50 text-red-600',
  IN_PROGRESS: 'bg-orange-50 text-orange-600',
  RESOLVED: 'bg-emerald-50 text-emerald-600',
};

const STATUS_NAMES: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', ''); // e.g. Jun 10 2024, 10:24 AM -> remove first comma if needed, or just leave it.
};

export default function RecentFeedbackTable({ initialData }: RecentFeedbackTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [category, setCategory] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading } = useQuery({
    queryKey: ['feedbacks', page, debouncedSearch, category, rating, dateRange, sortBy, sortOrder],
    queryFn: () => getFeedbacks(page, 10, debouncedSearch, category, rating ? Number(rating) : undefined, dateRange, sortBy, sortOrder),
    placeholderData: (prev) => prev,
  });

  const feedbacks = data?.data || initialData || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const handleExport = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/v1/feedback/export`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedback_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to export CSV', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-5 border-b border-slate-50 gap-4">
        <h3 className="font-bold text-slate-900 text-lg">All Feedback</h3>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 pl-9 pr-4 py-2 bg-[#F8F9FE] border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5D3FD3] outline-none font-medium text-slate-700"
            />
          </div>

          <select 
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
          >
            <option value="">All Categories</option>
            <option value="PRODUCT">Product</option>
            <option value="SERVICE">Service</option>
            <option value="SUPPORT">Support</option>
            <option value="BILLING">Billing</option>
            <option value="OTHER">Other</option>
          </select>

          <select 
            value={rating}
            onChange={(e) => { setRating(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select 
            value={dateRange}
            onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#F3F0FF] text-[#5D3FD3] border border-[#E9E4FF] rounded-lg text-sm font-bold hover:bg-[#E9E4FF] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th onClick={() => handleSort('comment')} className="px-6 py-4 text-xs font-bold text-slate-800 tracking-wide cursor-pointer hover:bg-slate-50">
                Feedback {sortBy === 'comment' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('category')} className="px-6 py-4 text-xs font-bold text-slate-800 tracking-wide cursor-pointer hover:bg-slate-50">
                Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')} className="px-6 py-4 text-xs font-bold text-slate-800 tracking-wide cursor-pointer hover:bg-slate-50">
                User {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('rating')} className="px-6 py-4 text-xs font-bold text-slate-800 tracking-wide cursor-pointer hover:bg-slate-50">
                Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('createdAt')} className="px-6 py-4 text-xs font-bold text-slate-800 tracking-wide cursor-pointer hover:bg-slate-50">
                Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/50">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                  No feedback found matching your criteria.
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600 w-1/3">
                    <div className="truncate pr-4" title={feedback.comment}>
                      {feedback.comment}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-bold rounded-md inline-block",
                      CATEGORY_COLORS[feedback.category] || CATEGORY_COLORS.OTHER
                    )}>
                      {CATEGORY_NAMES[feedback.category] || feedback.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#5D3FD3]">
                    <div className="flex flex-col">
                      <span>{feedback.name || 'Anonymous'}</span>
                      <span className="text-xs text-slate-400 font-medium">{feedback.email || 'No email provided'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 font-bold">★</span>
                      <span>{feedback.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {formatDate(feedback.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
        <div className="text-sm font-medium text-slate-500">
          Showing <span className="font-bold text-slate-900">{feedbacks.length}</span> of <span className="font-bold text-slate-900">{meta.total}</span> entries
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-sm font-bold text-slate-700 px-2">
            Page {page} of {meta.totalPages || 1}
          </div>
          <button 
            onClick={() => setPage(p => Math.min(meta.totalPages || 1, p + 1))}
            disabled={page >= (meta.totalPages || 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
