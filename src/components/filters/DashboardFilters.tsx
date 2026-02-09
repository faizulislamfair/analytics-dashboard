'use client';

import { memo } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Calendar, Users } from 'lucide-react';
import { DateRange, UserType } from '@/types';

const DashboardFilters = memo(() => {
  const { filters, setFilters } = useDashboardStore();

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '12m', label: 'Last 12 months' },
  ];

  const userTypeOptions: { value: UserType; label: string }[] = [
    { value: 'all', label: 'All Users' },
    { value: 'free', label: 'Free Users' },
    { value: 'premium', label: 'Premium Users' },
    { value: 'enterprise', label: 'Enterprise Users' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Date Range Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Date Range
        </label>
        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({ dateRange: e.target.value as DateRange })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {dateRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* User Type Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Users className="inline h-4 w-4 mr-1" />
          User Type
        </label>
        <select
          value={filters.userType}
          onChange={(e) => setFilters({ userType: e.target.value as UserType })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {userTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

DashboardFilters.displayName = 'DashboardFilters';

export default DashboardFilters;
