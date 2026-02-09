'use client';

import { lazy, Suspense } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import KPIGrid from '@/components/dashboard/KPIGrid';
import DashboardFilters from '@/components/filters/DashboardFilters';
import ErrorState from '@/components/ui/ErrorState';
import RoleSelector from '@/components/dashboard/RoleSelector';
import ExportButton from '@/components/dashboard/ExportButton';
import { Shield, BarChart3 } from 'lucide-react';

// Lazy load charts for better performance
const RevenueChart = lazy(() => import('@/components/charts/RevenueChart'));
const OrdersChart = lazy(() => import('@/components/charts/OrdersChart'));
const UserDistributionChart = lazy(() => import('@/components/charts/UserDistributionChart'));

const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-96 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
    <div className="h-full bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

export default function Dashboard() {
  const { kpis, revenue, orders, users, loading, error } = useDashboardData();
  const { userRole } = useDashboardStore();

  if (error) {
    return (
      <div className="p-6">
        <ErrorState message={error} />
      </div>
    );
  }

  // Role-based access control
  const isAdmin = userRole === 'admin';
  const canViewRevenue = isAdmin; // Only admins can see revenue
  const canViewOrders = true; // Both roles can see orders
  const canViewUsers = isAdmin; // Only admins can see user distribution

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            {isAdmin && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Admin
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {isAdmin
              ? 'Full access to all business metrics and performance data'
              : 'Monitor your assigned metrics and performance'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <RoleSelector />
          <ExportButton
            data={{
              kpis: kpis || undefined,
              revenue: canViewRevenue ? revenue : undefined,
              orders: canViewOrders ? orders : undefined,
              users: canViewUsers ? users : undefined,
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <DashboardFilters />

      {/* KPI Cards - Show all for both roles */}
      <KPIGrid data={kpis || { totalRevenue: 0, totalUsers: 0, orders: 0, conversionRate: 0 }} loading={loading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {canViewRevenue ? (
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart data={revenue} loading={loading} />
          </Suspense>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Revenue data is only available to Admin users
              </p>
            </div>
          </div>
        )}

        {canViewOrders && (
          <Suspense fallback={<ChartSkeleton />}>
            <OrdersChart data={orders} loading={loading} />
          </Suspense>
        )}
      </div>

      {/* User Distribution - Only for Admin */}
      {canViewUsers ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <UserDistributionChart data={users} loading={loading} />
          </Suspense>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              User distribution data is only available to Admin users
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
