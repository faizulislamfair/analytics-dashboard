'use client';

import { memo, useMemo } from 'react';
import KPICard from './KPICard';
import { KPIData } from '@/types';
import { DollarSign, Users, ShoppingCart, Target } from 'lucide-react';

interface KPIGridProps {
  data: KPIData;
  loading?: boolean;
}

const KPIGrid = memo(({ data, loading }: KPIGridProps) => {
  const kpiCards = useMemo(() => {
    if (!data) return [];

    return [
      {
        title: 'Total Revenue',
        value: data.totalRevenue,
        change: 12.5,
        changeType: 'increase' as const,
        icon: <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      },
      {
        title: 'Total Users',
        value: data.totalUsers,
        change: 8.2,
        changeType: 'increase' as const,
        icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      },
      {
        title: 'Orders',
        value: data.orders,
        change: -2.4,
        changeType: 'decrease' as const,
        icon: <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />,
      },
      {
        title: 'Conversion Rate',
        value: data.conversionRate,
        change: 0.5,
        changeType: 'increase' as const,
        icon: <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      },
    ];
  }, [data]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiCards.map((card, index) => (
        <KPICard key={index} data={card} />
      ))}
    </div>
  );
});

KPIGrid.displayName = 'KPIGrid';

export default KPIGrid;
