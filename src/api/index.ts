import axios from 'axios';
import type { DeceasedRecord, UpdateRecordData, VerificationStats } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = {
  async getRecords(): Promise<DeceasedRecord[]> {
    const { data } = await axios.get(`${API_URL}/records`);
    return data;
  },

  async getStats(): Promise<VerificationStats> {
    const { data } = await axios.get(`${API_URL}/stats`);
    return data;
  },

  async updateRecord(id: string, updateData: UpdateRecordData): Promise<DeceasedRecord> {
    const { data } = await axios.put(`${API_URL}/records/${id}`, updateData);
    return data;
  },

  async createRecord(record: Omit<DeceasedRecord, 'id'>): Promise<DeceasedRecord> {
    const { data } = await axios.post(`${API_URL}/records`, record);
    return data;
  },

  async deleteRecord(id: string): Promise<void> {
    await axios.delete(`${API_URL}/records/${id}`);
  }
};