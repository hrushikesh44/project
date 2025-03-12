import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Pencil } from 'lucide-react';
import type { DeceasedRecord, UpdateRecordData } from '../types';
import { UpdateRecordModal } from './UpdateRecordModal';
import { api } from '../api';

export function RecordsList() {
  const [recordsList, setRecordsList] = useState<DeceasedRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<DeceasedRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await api.getRecords();
      setRecordsList(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch records');
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecord = async (id: string, data: UpdateRecordData) => {
    try {
      const updatedRecord = await api.updateRecord(id, data);
      setRecordsList(records => records.map(record => 
        record.id === id ? updatedRecord : record
      ));
      await fetchRecords(); // Refresh the list to get the latest data
    } catch (err) {
      console.error('Error updating record:', err);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Records</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recordsList.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{record.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SSN: {record.ssn}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <StatusBadge status={record.status} />
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Date of Death: {new Date(record.dateOfDeath).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Updated: {new Date(record.lastUpdated).toLocaleString()}
                </p>
                {record.medicalNotes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notes: {record.medicalNotes}
                  </p>
                )}
                {record.verifiedBy && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verified By: {record.verifiedBy}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRecord && (
        <UpdateRecordModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onUpdate={handleUpdateRecord}
        />
      )}
    </>
  );
}

function StatusBadge({ status }: { status: DeceasedRecord['status'] }) {
  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
    },
    verified: {
      icon: CheckCircle2,
      text: 'Verified',
      className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
    },
    processed: {
      icon: AlertTriangle,
      text: 'Processed',
      className: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.text}
    </span>
  );
}