import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';
import companyData from '../data/companies.json';

const Students = () => {
  const totalStudents = 50;  // Example value
  const placedStudents = 21; // Example value
  const rejectedStudents = totalStudents - placedStudents;

  return (
    <div className='p-6 bg-[#222222]'>
      <div className='mb-6'>
        <Link to='/dashboard/edit-profile'>
          <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white cursor-pointer text-center'>
            <h2 className='text-lg font-semibold'>Edit Profile</h2>
          </div>
        </Link>
      </div>
      
      <DashboardCards />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold'>Rejected Students</h2>
          <p className='text-2xl font-bold text-red-400'>{rejectedStudents}</p>
        </div>

        <div className='col-span-1 lg:col-span-3 bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold mb-4'>Companies</h2>
          <table className='w-full'>
            <thead>
              <tr className='text-left'>
                <th className='pb-2 pr-4 font-bold'>Name</th>
                <th className='pb-2 pr-4 font-bold'>Department</th>
                <th className='pb-2 pr-4 font-bold'>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((company, index) => (
                <tr key={index} className='border-t border-gray-700'>
                  <td className='py-2 pr-4'>{company.name}</td>
                  <td className='py-2 pr-4'>{company.department}</td>
                  <td className='py-2 pr-4'>
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(company.status)}`}> 
                      {company.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Students;
