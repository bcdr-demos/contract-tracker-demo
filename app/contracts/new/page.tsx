'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ContractStatus } from '../../../types/contract';

export default function NewContract() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    startDate: '',
    endDate: '',
    value: '',
    status: 'draft' as ContractStatus,
    description: '',
    contactPerson: '',
    contactEmail: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Contract title is required';
    }
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.value) {
      newErrors.value = 'Contract value is required';
    } else if (isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = 'Contract value must be a positive number';
    }

    // Bug #3: Email validation is broken, doesn't properly validate email format
    if (formData.contactEmail && !formData.contactEmail.includes('@')) {
      // This validation logic should check more than just '@' 
      // but intentionally left incomplete as a bug
      newErrors.contactEmail = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would save the contract here
      console.log('Form submitted successfully', formData);
      
      // Simulate successful creation
      alert('Contract created successfully!');
      
      // Redirect to contracts page
      router.push('/contracts');
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link href="/contracts" className="text-purple-600 hover:underline mb-2 inline-block">
          &larr; Back to Contracts
        </Link>
        <h1 className="text-2xl font-bold">Create New Contract</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                Contract Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="clientName" className="block font-medium text-gray-700 mb-1">
                Client Name*
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
            </div>
            
            <div>
              <label htmlFor="startDate" className="block font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            
            <div>
              <label htmlFor="endDate" className="block font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
            
            <div>
              <label htmlFor="value" className="block font-medium text-gray-700 mb-1">
                Contract Value*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className={`w-full pl-7 px-3 py-2 border rounded-md ${errors.value ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
            </div>
            
            <div>
              <label htmlFor="status" className="block font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="contactPerson" className="block font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
          </div>
          
          <div className="border-t pt-6 flex justify-end space-x-3">
            <button 
              type="button"
              onClick={() => router.push('/contracts')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}