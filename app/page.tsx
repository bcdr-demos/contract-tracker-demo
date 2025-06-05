'use client';

import Link from "next/link";
import { mockContracts, getActiveContracts, formatCurrency, calculateRemainingDays } from "../utils/mockData";

export default function Home() {
  const activeContracts = getActiveContracts();
  const totalContractValue = mockContracts.reduce((sum, contract) => sum + contract.value, 0);
  const expiringSoon = mockContracts
    .filter(contract => contract.status === 'active' && calculateRemainingDays(contract.endDate) < 30)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

  // Calculate status counts
  const statusCounts = mockContracts.reduce((counts, contract) => {
    counts[contract.status] = (counts[contract.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-8">Contract Dashboard</h1>
        
        {/* Summary stats - Styling issue #2: Inconsistent spacing (intentional bug) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Total Contracts</h3>
            <p className="text-3xl font-bold">{mockContracts.length}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Active Contracts</h3>
            <p className="text-3xl font-bold">{statusCounts.active || 0}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-indigo-500">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Total Value</h3>
            <p className="text-3xl font-bold">{formatCurrency(totalContractValue)}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Expiring Soon</h3>
            <p className="text-3xl font-bold">{expiringSoon.length}</p>
          </div>
        </div>
      </div>
      
      {/* Contracts expiring soon */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Contracts Expiring Soon</h2>
          <Link href="/contracts" className="text-blue-600 hover:underline">View All</Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {expiringSoon.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contract</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Days Left</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expiringSoon.map(contract => (
                    <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">{contract.title}</td>
                      <td className="py-4 px-4 text-gray-700">{contract.clientName}</td>
                      <td className="py-4 px-4 font-medium">{formatCurrency(contract.value)}</td>
                      <td className="py-4 px-4 text-gray-700">{new Date(contract.endDate).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          {calculateRemainingDays(contract.endDate)} days
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link href={`/contracts/${contract.id}`} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No contracts expiring soon.</div>
          )}
        </div>
      </div>
      
      {/* Quick actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link 
            href="/contracts/new" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center shadow-md"
          >
            <span className="font-medium">Add New Contract</span>
          </Link>
          <Link 
            href="/contracts" 
            className="bg-white text-blue-600 border border-blue-300 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <span className="font-medium">View All Contracts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}