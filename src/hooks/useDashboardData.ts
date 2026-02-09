import { useState, useEffect } from 'react';
import { dashboardAPI } from '@/lib/api';
import { KPIData, RevenueData, OrderData, UserDistribution } from '@/types';
import { useDashboardStore } from '@/store/dashboardStore';

interface DashboardData {
  kpis: KPIData | null;
  revenue: RevenueData[];
  orders: OrderData[];
  users: UserDistribution[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = () => {
  const { filters } = useDashboardStore();
  const [data, setData] = useState<DashboardData>({
    kpis: null,
    revenue: [],
    orders: [],
    users: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const [kpis, revenue, orders, users] = await Promise.all([
          dashboardAPI.getKPIs(),
          dashboardAPI.getRevenue(),
          dashboardAPI.getOrders(),
          dashboardAPI.getUsers(),
        ]);

        setData({
          kpis,
          revenue,
          orders,
          users,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
        }));
      }
    };

    fetchData();
  }, [filters.dateRange, filters.userType]);

  return data;
};
