'use client';

import { memo } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Shield, UserCheck } from 'lucide-react';
import { UserRole } from '@/store/dashboardStore';

const RoleSelector = memo(() => {
  const { userRole, setUserRole } = useDashboardStore();

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role:</span>
      <div className="flex gap-2">
        <button
          onClick={() => setUserRole('admin')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            userRole === 'admin'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          <Shield className="h-4 w-4" />
          Admin
        </button>
        <button
          onClick={() => setUserRole('manager')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            userRole === 'manager'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Manager
        </button>
      </div>
    </div>
  );
});

RoleSelector.displayName = 'RoleSelector';

export default RoleSelector;
