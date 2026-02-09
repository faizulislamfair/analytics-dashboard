import { KPIData, RevenueData, OrderData, UserDistribution, TrafficSource } from '@/types';
import * as data from '@/data/dashboardData';

// Simulate a small delay for realistic loading states (optional, good for UX)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LOAD_DELAY_MS = 400;

export const dashboardAPI = {
  getKPIs: async (): Promise<KPIData> => {
    await delay(LOAD_DELAY_MS);
    return data.stats;
  },

  getRevenue: async (): Promise<RevenueData[]> => {
    await delay(LOAD_DELAY_MS);
    return data.revenue;
  },

  getOrders: async (): Promise<OrderData[]> => {
    await delay(LOAD_DELAY_MS);
    return data.orders;
  },

  getUsers: async (): Promise<UserDistribution[]> => {
    await delay(LOAD_DELAY_MS);
    return data.users;
  },

  getTraffic: async (): Promise<TrafficSource[]> => {
    await delay(LOAD_DELAY_MS);
    return data.traffic;
  },
};
