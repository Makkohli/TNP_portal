import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Companies = () => {
  const [companyData, setCompanyData] = useState([]); // State to store the company data from the API

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch('http://localhost:3000/api/v1/company/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCompanyData(data); // Set the response data
        } else {
          console.error('Failed to fetch company data');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <div className='p-6 bg-[#222222]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {companyData.length > 0 ? (
          companyData.map((company) => (
            <div key={company._id} className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
              <h2 className='text-lg font-semibold mb-2'>{company.name}</h2>
              <p className='text-md mb-2'><strong>Job Profile:</strong> {company.jobRole}</p>
              <p className='text-md mb-2'><strong>Location:</strong> {company.placeOfPosting}</p>
              <p className='text-md mb-2'>
                <strong>Status:</strong>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(company.status)}`}>
                  {company.status}
                </span>
              </p>
              <p className='text-md mb-2'>
                <strong>Time:</strong> {new Date(company.updatedAt || company.createdAt).toLocaleString()}
              </p>
              <Link to={`/company/${company._id}`} className='text-blue-400 hover:underline'>View Details</Link>
            </div>
          ))
        ) : (
          <p className='text-white'>No company data available.</p>
        )}
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
