'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getContractById, formatCurrency, calculateRemainingDays } from '../../../utils/mockData';
import { ContractStatus } from '../../../types/contract';

export default function ContractDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const contract = getContractById(id);
  
  if (!contract) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Contract Not Found</h2>
        <p className="text-gray-700 mb-6">The contract you are looking for does not exist or has been deleted.</p>
        <Link href="/contracts" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Return to Contracts
        </Link>
      </div>
    );
  }
  
  // Get days remaining for active contracts
  const daysRemaining = contract.status === 'active' ? calculateRemainingDays(contract.endDate) : null;
  
  const getStatusBadge = (status: ContractStatus) => {
    switch(status) {
      case 'draft':
        return <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md">Draft</span>;
      case 'active':
        return <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md">Active</span>;
      case 'expired':
        return <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md">Expired</span>;
      case 'terminated':
        return <span className="bg-red-200 text-red-800 px-3 py-1 rounded-md">Terminated</span>;
      default:
        return <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/contracts" className="text-blue-600 hover:underline mb-2 inline-block">
            &larr; Back to Contracts
          </Link>
          <h1 className="text-2xl font-bold">{contract.title}</h1>
        </div>
        <div className="flex space-x-2">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Edit
          </button>
          {/* Bug: This alert button incorrectly shows "Are you sure you want to delete?" but doesn't actually delete */}
          <button 
            className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
            onClick={() => {
              alert('Are you sure you want to delete?');
              // Should delete the contract, but it doesn't
            }}
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-gray-700 text-sm">Client</p>
              <p className="text-xl font-semibold">{contract.clientName}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm">Status</p>
              <div className="mt-1">{getStatusBadge(contract.status)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-gray-700 text-sm">Contract Value</p>
              <p className="font-semibold">{formatCurrency(contract.value)}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm">Start Date</p>
              <p className="font-semibold">{new Date(contract.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm">End Date</p>
              <p className="font-semibold">{new Date(contract.endDate).toLocaleDateString()}</p>
            </div>
            {daysRemaining !== null && (
              <div>
                <p className="text-gray-700 text-sm">Remaining</p>
                <p className="font-semibold">
                  <span className={`${daysRemaining < 30 ? 'text-red-600' : ''}`}>
                    {daysRemaining} days
                  </span>
                </p>
              </div>
            )}
          </div>
          
          {contract.description && (
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Description</p>
              <p className="bg-gray-50 dark:bg-gray-700 p-4 rounded">{contract.description}</p>
            </div>
          )}
          
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contract.contactPerson && (
                <div>
                  <p className="text-gray-700 text-sm">Contact Person</p>
                  <p className="font-medium">{contract.contactPerson}</p>
                </div>
              )}
              {contract.contactEmail && (
                <div>
                  <p className="text-gray-700 text-sm">Contact Email</p>
                  <p className="font-medium">{contract.contactEmail}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3">Contract Timeline</h3>
          <div className="border-l-2 border-gray-200 pl-4 space-y-4">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full -ml-[22px]"></div>
                <p className="ml-4 font-medium">Contract Created</p>
              </div>
              <p className="text-gray-500 text-sm ml-4">{new Date(contract.createdAt).toLocaleString()}</p>
            </div>
            
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full -ml-[22px]"></div>
                <p className="ml-4 font-medium">Contract Start Date</p>
              </div>
              <p className="text-gray-500 text-sm ml-4">{new Date(contract.startDate).toLocaleDateString()}</p>
            </div>
            
            {contract.status === 'active' && (
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full -ml-[22px]"></div>
                  <p className="ml-4 font-medium">Current Date</p>
                </div>
                <p className="text-gray-500 text-sm ml-4">{new Date().toLocaleDateString()}</p>
              </div>
            )}
            
            <div>
              <div className="flex items-center">
                <div className={`w-3 h-3 ${contract.status === 'expired' ? 'bg-yellow-500' : 'bg-gray-300'} rounded-full -ml-[22px]`}></div>
                <p className="ml-4 font-medium">Contract End Date</p>
              </div>
              <p className="text-gray-500 text-sm ml-4">{new Date(contract.endDate).toLocaleDateString()}</p>
            </div>
            
            {contract.status === 'terminated' && (
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full -ml-[22px]"></div>
                  <p className="ml-4 font-medium">Contract Terminated</p>
                </div>
                <p className="text-gray-500 text-sm ml-4">{new Date(contract.updatedAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}