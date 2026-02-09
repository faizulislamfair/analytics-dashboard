'use client';

import { memo } from 'react';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/utils/csvExport';
import { KPIData, RevenueData, OrderData, UserDistribution } from '@/types';

interface ExportButtonProps {
  data: {
    kpis?: KPIData;
    revenue?: RevenueData[];
    orders?: OrderData[];
    users?: UserDistribution[];
  };
}

const ExportButton = memo(({ data }: ExportButtonProps) => {
  const handleExport = () => {
    exportToCSV(data);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
});

ExportButton.displayName = 'ExportButton';

export default ExportButton;
