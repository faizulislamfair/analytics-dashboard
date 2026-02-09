'use client';

import { lazy, Suspense } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import RevenueChart from '@/components/charts/RevenueChart';
import UserDistributionChart from '@/components/charts/UserDistributionChart';
import ErrorState from '@/components/ui/ErrorState';
import { BarChart3, TrendingUp } from 'lucide-react';

const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-96 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
    <div className="h-full bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

export default function AnalyticsPage() {
  const { revenue, users, loading, error } = useDashboardData();
  const { userRole } = useDashboardStore();
  const isAdmin = userRole === 'admin';

  if (error) {
    return (
      <div className="p-6">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed analytics and insights for your business
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Views
            </h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">24.5K</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            +12.5% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg. Session
            </h3>
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3m 24s</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
            +8.2% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Bounce Rate
            </h3>
            <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">42.3%</p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            -2.1% from last month
          </p>
        </div>
      </div>

      {/* Charts */}
      {isAdmin ? (
        <>
          <RevenueChart data={revenue} loading={loading} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserDistributionChart data={users} loading={loading} />
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Traffic Sources
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Organic</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      45%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Paid</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '30%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      30%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Social</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      15%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Referral</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-orange-500 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      10%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Advanced analytics are only available to Admin users
          </p>
        </div>
      )}
    </div>
  );
}
