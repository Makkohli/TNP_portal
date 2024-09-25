import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';

const Students = () => {
  const totalStudents = 50; // Example value
  const placedStudents = 21; // Example value
  const rejectedStudents = totalStudents - placedStudents;

  const [notices, setNotices] = useState([]);
  const [companies, setCompanies] = useState([]); // New state for companies

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/notices/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('API Response Data:', data); // Log to ensure data is correct
  
          // Sort notices by creation date in descending order (newest first)
          const sortedNotices = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  
          // Limit to 9 most recent notices
          setNotices(sortedNotices.slice(0, 9));
        } else {
          console.error('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
  
    fetchNotices();
  }, []);
  
  

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/company/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Company API Response:', data);
          setCompanies(data); // Set company data from API response
        } else {
          console.error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className='p-6 bg-[#222222]'>
      <div className='mb-6'>
        <Link to='/dashboard/edit-profile'>
          <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white cursor-pointer text-center'>
            <h2 className='text-lg font-semibold'>Edit Profile</h2>
          </div>
        </Link>
      </div>

      {/* Display upcoming events/notices */}
      <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
        <h2 className='text-lg font-semibold mb-4'>Upcoming Events/Notices</h2>
        {notices && notices.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notices.map((notice, index) => (
              <div key={index} className='bg-[#2C2C2C] p-4 rounded-lg shadow-md text-white'>
                <h3 className='text-md font-semibold'>{notice.title}</h3>
                <p className='text-sm'>{notice.description}</p>
                <p className='text-xs text-gray-400'>{new Date(notice.dateCreated).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-gray-400'>No upcoming events or notices available.</p>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
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
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <tr key={index} className='border-t border-gray-700'>
                    <td className='py-2 pr-4'>{company.name}</td>
                    <td className='py-2 pr-4'>{company.department}</td>
                    <td className='py-2 pr-4'>
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(company.status)}`}>
                        {company.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400">
                    No companies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
