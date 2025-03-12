import React, { useEffect, useState } from 'react';
import { BarChart3, Users, FileCheck2, AlertCircle } from 'lucide-react';
import type { VerificationStats } from '../types';
import { api } from '../api';

export function Dashboard() {
  const [stats, setStats] = useState<VerificationStats>({
    total: 0,
    pending: 0,
    verified: 0,
    processed: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Cases</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <AlertCircle className="h-8 w-8 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <FileCheck2 className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Verified</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.verified}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processed</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.processed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}