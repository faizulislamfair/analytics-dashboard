'use client';

import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPICard } from '@/types';

interface KPICardProps {
  data: KPICard;
}

const KPICardComponent = memo(({ data }: KPICardProps) => {
  const isPositive = data.changeType === 'increase';
  const changeColor = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor = isPositive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{data.title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data.title === 'Total Revenue' && typeof data.value === 'number' && 
              `$${data.value.toLocaleString('en-US')}`}
            {data.title === 'Conversion Rate' && typeof data.value === 'number' && 
              `${data.value}%`}
            {data.title !== 'Total Revenue' && data.title !== 'Conversion Rate' && 
              typeof data.value === 'number' && data.value.toLocaleString('en-US')}
            {typeof data.value === 'string' && data.value}
          </p>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${bgColor}`}>
            {isPositive ? (
              <TrendingUp className={`h-4 w-4 ${changeColor}`} />
            ) : (
              <TrendingDown className={`h-4 w-4 ${changeColor}`} />
            )}
            <span className={`text-sm font-medium ${changeColor}`}>
              {isPositive ? '+' : ''}{data.change}%
            </span>
          </div>
        </div>
        {data.icon && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-2xl">{data.icon}</span>
          </div>
        )}
      </div>
    </div>
  );
});

KPICardComponent.displayName = 'KPICard';

export default KPICardComponent;
