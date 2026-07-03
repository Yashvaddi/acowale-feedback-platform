import axios from 'axios';
import { Feedback, AnalyticsSummary, TrendData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const submitFeedback = async (data: any) => {
  const response = await api.post('/feedback', data);
  return response.data;
};

export const getFeedbacks = async (page = 1, limit = 10, search?: string, category?: string, rating?: number, dateRange?: string, sortBy?: string, sortOrder?: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (rating) params.append('rating', rating.toString());
  if (dateRange) params.append('dateRange', dateRange);
  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const response = await api.get<{ data: Feedback[]; meta: any }>(`/feedback?${params.toString()}`);
  return response.data;
};

export const getExportUrl = () => {
  return `${API_URL}/api/v1/feedback/export`;
};

export const getAnalyticsSummary = async () => {
  const response = await api.get<AnalyticsSummary>('/analytics/summary');
  return response.data;
};

export const getTrends = async (days: number = 30) => {
  const response = await api.get<TrendData[]>(`/analytics/trends?days=${days}`);
  return response.data;
};

export const loginAdmin = async (data: any) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};
