import { KPIData, RevenueData, OrderData, UserDistribution } from '@/types';

export const exportToCSV = (data: {
  kpis?: KPIData;
  revenue?: RevenueData[];
  orders?: OrderData[];
  users?: UserDistribution[];
}) => {
  const csvRows: string[] = [];

  // Export KPIs
  if (data.kpis) {
    csvRows.push('KPI Metrics');
    csvRows.push('Metric,Value');
    csvRows.push(`Total Revenue,${data.kpis.totalRevenue}`);
    csvRows.push(`Total Users,${data.kpis.totalUsers}`);
    csvRows.push(`Orders,${data.kpis.orders}`);
    csvRows.push(`Conversion Rate,${data.kpis.conversionRate}%`);
    csvRows.push('');
  }

  // Export Revenue
  if (data.revenue && data.revenue.length > 0) {
    csvRows.push('Revenue Over Time');
    csvRows.push('Month,Revenue');
    data.revenue.forEach((item) => {
      csvRows.push(`${item.month},${item.revenue}`);
    });
    csvRows.push('');
  }

  // Export Orders
  if (data.orders && data.orders.length > 0) {
    csvRows.push('Orders Per Month');
    csvRows.push('Month,Orders');
    data.orders.forEach((item) => {
      csvRows.push(`${item.month},${item.orders}`);
    });
    csvRows.push('');
  }

  // Export User Distribution
  if (data.users && data.users.length > 0) {
    csvRows.push('User Distribution');
    csvRows.push('Type,Count');
    data.users.forEach((item) => {
      csvRows.push(`${item.type},${item.value}`);
    });
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
