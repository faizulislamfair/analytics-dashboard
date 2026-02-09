'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import UserDistributionChart from '@/components/charts/UserDistributionChart';
import ErrorState from '@/components/ui/ErrorState';
import { Users, UserPlus, Shield, UserCheck, User } from 'lucide-react';

export default function UsersPage() {
  const { users, loading, error } = useDashboardData();
  const { userRole } = useDashboardStore();
  const isAdmin = userRole === 'admin';

  if (error) {
    return (
      <div className="p-6">
        <ErrorState message={error} />
      </div>
    );
  }

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Premium', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Enterprise', status: 'Active', joinDate: '2024-01-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', type: 'Free', status: 'Active', joinDate: '2024-01-20' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', type: 'Premium', status: 'Inactive', joinDate: '2023-12-15' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', type: 'Enterprise', status: 'Active', joinDate: '2024-01-05' },
  ];

  const typeColors = {
    Free: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    Premium: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    Enterprise: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  };

  const typeIcons = {
    Free: User,
    Premium: UserCheck,
    Enterprise: Shield,
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view all user accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Users
            </h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">1,245</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Free Users
            </h3>
            <User className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">750</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Premium Users
            </h3>
            <UserCheck className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">350</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Enterprise Users
            </h3>
            <Shield className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">145</p>
        </div>
      </div>

      {/* User Distribution Chart - Only for Admin */}
      {isAdmin ? (
        <UserDistributionChart data={users} loading={loading} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            User distribution charts are only available to Admin users
          </p>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Users
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockUsers.map((user) => {
                const TypeIcon = typeIcons[user.type as keyof typeof typeIcons];
                return (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[user.type as keyof typeof typeColors]}`}
                      >
                        <TypeIcon className="h-3 w-3" />
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
