// src/pages/Companies.js
import React from 'react';
import { Link } from 'react-router-dom';
import companyData from '../data/companies.json'; // Import JSON data

const Companies = () => {
  return (
    <div className='p-6 bg-[#222222]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {companyData.map((company) => (
          <div key={company.id} className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
            <h2 className='text-lg font-semibold mb-2'>{company.name}</h2>
            <p className='text-md mb-2'><strong>Job Profile:</strong> {company.jobRole}</p>
            <p className='text-md mb-2'>
              <strong>Status:</strong>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(company.status)}`}>
                {company.status}
              </span>
            </p>
            <p className='text-md mb-2'>
              <strong>Count:</strong> {company.studentsPlaced} of {company.studentsRequired}
            </p>
            <Link to={`/company/${company.id}`} className='text-blue-400 hover:underline'>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to determine badge classes based on status
const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-blue-500 text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    case 'scheduled':
    case 'completed':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default Companies;
