import React, { useState } from 'react';
import type { DeceasedRecord, UpdateRecordData } from '../types';

interface UpdateRecordModalProps {
  record: DeceasedRecord;
  onClose: () => void;
  onUpdate: (id: string, data: UpdateRecordData) => void;
}

export function UpdateRecordModal({ record, onClose, onUpdate }: UpdateRecordModalProps) {
  const [formData, setFormData] = useState<UpdateRecordData>({
    status: record.status,
    medicalNotes: record.medicalNotes || '',
    verifiedBy: record.verifiedBy || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(record.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Update Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 dark:text-white"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DeceasedRecord['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="processed">Processed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Medical Notes
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 dark:text-white"
                rows={4}
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Verified By
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 dark:text-white"
                value={formData.verifiedBy}
                onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Update Record
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}