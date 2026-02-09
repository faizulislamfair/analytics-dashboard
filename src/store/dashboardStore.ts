import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardFilters, DateRange, UserType } from '@/types';

export type UserRole = 'admin' | 'manager';

interface DashboardState {
  filters: DashboardFilters;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: 'light' | 'dark';
  userRole: UserRole;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setUserRole: (role: UserRole) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      filters: {
        dateRange: '30d',
        userType: 'all',
      },
      sidebarOpen: true,
      mobileMenuOpen: false,
      theme: 'light',
      userRole: 'admin',
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setUserRole: (role) => set({ userRole: role }),
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({ theme: state.theme, userRole: state.userRole }),
    }
  )
);
