export interface KPIData {
  totalRevenue: number;
  totalUsers: number;
  orders: number;
  conversionRate: number;
}

export interface KPICard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon?: React.ReactNode;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface OrderData {
  month: string;
  orders: number;
}

export interface UserDistribution {
  type: string;
  value: number;
  color?: string;
}

export interface TrafficSource {
  source: string;
  value: number;
  color?: string;
}

export type DateRange = '7d' | '30d' | '12m';
export type UserType = 'all' | 'free' | 'premium' | 'enterprise';

export interface DashboardFilters {
  dateRange: DateRange;
  userType: UserType;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
