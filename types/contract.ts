export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated';

export type Contract = {
  id: string;
  title: string;
  clientName: string;
  startDate: string;
  endDate: string;
  value: number;
  status: ContractStatus;
  description?: string;
  contactPerson?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
};