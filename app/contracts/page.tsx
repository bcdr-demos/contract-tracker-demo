'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockContracts, formatCurrency } from '../../utils/mockData';
import { Contract, ContractStatus } from '../../types/contract';

export default function ContractsPage() {
  const [filter, setFilter] = useState<ContractStatus | 'all'>('all');
  
  // Bug #3: Incorrect filtering logic - doesn't properly filter 'expired' status
  const filteredContracts = filter === 'all' 
    ? mockContracts 
    : mockContracts.filter(contract => filter === 'expired' ? false : contract.status === filter);
  
  // Styling issue #1: Inconsistent padding in status badges (intentional bug)
  const getStatusClass = (status: ContractStatus) => {
    switch(status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-md';
      case 'active':
        return 'bg-green-100 text-green-800 p-2 rounded-md';
      case 'expired':
        return 'bg-amber-100 text-amber-800 px-2 rounded-md';
      case 'terminated':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-md';
      default:
        return 'bg-gray-100 text-gray-800 p-1 rounded-md';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Contracts</h1>
        <Link href="/contracts/new" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          Add Contract
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-md font-medium ${filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={`px-4 py-2 rounded-md font-medium ${filter === 'active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Active
        </button>
        <button 
          onClick={() => setFilter('draft')} 
          className={`px-4 py-2 rounded-md font-medium ${filter === 'draft' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Draft
        </button>
        <button 
          onClick={() => setFilter('expired')} 
          className={`px-4 py-2 rounded-md font-medium ${filter === 'expired' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Expired
        </button>
        <button 
          onClick={() => setFilter('terminated')} 
          className={`px-4 py-2 rounded-md font-medium ${filter === 'terminated' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Terminated
        </button>
      </div>
      
      {/* Bug: Overflow issues on small screens due to no responsive design */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Title</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Client</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Value</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Start Date</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">End Date</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{contract.title}</td>
                <td className="py-3 px-4">{contract.clientName}</td>
                <td className="py-3 px-4 font-medium">{formatCurrency(contract.value)}</td>
                <td className="py-3 px-4">{new Date(contract.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(contract.endDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={getStatusClass(contract.status)}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Link href={`/contracts/${contract.id}`} className="text-blue-600 hover:text-blue-900">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filteredContracts.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-700">
                  No contracts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}