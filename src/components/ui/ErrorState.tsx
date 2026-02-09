'use client';

import { memo } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = memo(({ message = 'Something went wrong', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Error Loading Data
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
});

ErrorState.displayName = 'ErrorState';

export default ErrorState;
