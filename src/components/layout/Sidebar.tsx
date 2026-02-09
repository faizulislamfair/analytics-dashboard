'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Home, BarChart3, Users, ShoppingCart, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = memo(() => {
  const { sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen } = useDashboardStore();
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 lg:static lg:z-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarOpen ? 'w-64' : 'w-20'} lg:block`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            )}
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${!sidebarOpen && 'justify-center'}`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
