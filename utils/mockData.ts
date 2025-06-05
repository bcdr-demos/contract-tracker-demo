import { Contract } from '../types/contract';

export const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    clientName: 'Acme Corporation',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    value: 25000,
    status: 'active',
    description: 'Complete redesign of corporate website with new CMS implementation.',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@acme.com',
    createdAt: '2024-12-15T12:00:00Z',
    updatedAt: '2024-12-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'IT Infrastructure Upgrade',
    clientName: 'TechSolutions Inc.',
    startDate: '2025-02-15',
    endDate: '2025-05-15',
    value: 75000,
    status: 'active',
    description: 'Server migration and network infrastructure upgrade.',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sjohnson@techsolutions.com',
    createdAt: '2025-01-20T09:30:00Z',
    updatedAt: '2025-01-20T09:30:00Z',
  },
  {
    id: '3',
    title: 'Software Maintenance Agreement',
    clientName: 'Global Services LLC',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    value: 12000,
    status: 'active',
    description: 'Annual software maintenance and support agreement.',
    contactPerson: 'Michael Chen',
    contactEmail: 'mchen@globalservices.com',
    createdAt: '2024-07-15T14:45:00Z',
    updatedAt: '2024-07-15T14:45:00Z',
  },
  {
    id: '4',
    title: 'Mobile App Development',
    clientName: 'FitLife Fitness',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    value: 45000,
    status: 'draft',
    description: 'Development of fitness tracking mobile application for iOS and Android.',
    contactPerson: 'Jessica Williams',
    contactEmail: 'jwilliams@fitlife.com',
    createdAt: '2025-02-10T11:20:00Z',
    updatedAt: '2025-02-10T11:20:00Z',
  },
  {
    id: '5',
    title: 'Data Center Migration',
    clientName: 'National Bank',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    value: 150000,
    status: 'expired',
    description: 'Migration of on-premises data center to cloud infrastructure.',
    contactPerson: 'Robert Taylor',
    contactEmail: 'rtaylor@nationalbank.com',
    createdAt: '2024-09-01T08:15:00Z',
    updatedAt: '2025-01-05T16:30:00Z',
  },
  {
    id: '6',
    title: 'Digital Marketing Campaign',
    clientName: 'EcoFriendly Products',
    startDate: '2025-04-01',
    endDate: '2025-09-30',
    value: 30000,
    status: 'active',
    description: 'Comprehensive digital marketing campaign for new product line.',
    contactPerson: 'Amanda Green',
    contactEmail: 'agreen@ecofriendly.com',
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
  },
  {
    id: '7',
    title: 'Security Assessment',
    clientName: 'HealthCare Systems',
    startDate: '2025-02-01',
    endDate: '2025-03-15',
    value: 18500,
    status: 'terminated',
    description: 'Comprehensive security assessment and penetration testing.',
    contactPerson: 'David Miller',
    contactEmail: 'dmiller@healthcare.com',
    createdAt: '2025-01-10T13:45:00Z',
    updatedAt: '2025-03-20T09:15:00Z',
  },
];

// Bug #1: This function sometimes returns incorrect results due to wrong date comparison
export const getActiveContracts = () => {
  const today = new Date();
  return mockContracts.filter(contract => 
    contract.status === 'active' && 
    new Date(contract.endDate) > today
  );
};

export const getContractById = (id: string): Contract | undefined => {
  return mockContracts.find(contract => contract.id === id);
};

// Function to format currency (intentionally missing handling for negative numbers)
export const formatCurrency = (amount: number): string => {
  return '$' + amount.toLocaleString('en-US');
};

// Bug #2: This functions incorrectly calculates remaining days
export const calculateRemainingDays = (endDate: string): number => {
  const end = new Date(endDate);
  const today = new Date();
  // Intentional bug: not accounting for timezone differences
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};