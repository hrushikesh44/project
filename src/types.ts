export interface DeceasedRecord {
  id: string;
  name: string;
  dateOfDeath: string;
  ssn: string;
  status: 'pending' | 'verified' | 'processed';
  documentVerified: boolean;
  lastUpdated: string;
  medicalNotes?: string;
  verifiedBy?: string;
}

export interface VerificationStats {
  total: number;
  pending: number;
  verified: number;
  processed: number;
}

export interface UpdateRecordData {
  status: DeceasedRecord['status'];
  medicalNotes: string;
  verifiedBy: string;
}