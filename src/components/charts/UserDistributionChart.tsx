'use client';

import { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserDistribution } from '@/types';

interface UserDistributionChartProps {
  data: UserDistribution[];
  loading?: boolean;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

const UserDistributionChart = memo(({ data, loading }: UserDistributionChartProps) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-96 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
        <div className="h-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        User Distribution
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [value, 'Users']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

UserDistributionChart.displayName = 'UserDistributionChart';

export default UserDistributionChart;
