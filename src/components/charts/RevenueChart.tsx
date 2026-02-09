'use client';

import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RevenueData } from '@/types';

interface RevenueChartProps {
  data: RevenueData[];
  loading?: boolean;
}

const RevenueChart = memo(({ data, loading }: RevenueChartProps) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-96 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
        <div className="h-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Revenue Over Time
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
          />
          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              'Revenue',
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
