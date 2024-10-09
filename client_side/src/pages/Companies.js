import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Companies = () => {
  const [companyData, setCompanyData] = useState([]); // State to store the company data from the API

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/company/list`, {
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className='p-6 bg-[#222222] min-h-screen flex-1 overflow-auto font-sans'>
      <motion.div
        className='max-w-6xl mx-auto'
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1 className='text-3xl font-bold mb-6 text-white' variants={fadeIn}>Companies</motion.h1>
        <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' variants={fadeIn}>
          {companyData.length > 0 ? (
            companyData.map((company) => (
              <motion.div
                key={company._id}
                className='bg-[#373737] p-4 rounded-lg shadow-md text-white'
                variants={slideIn}
              >
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
              </motion.div>
            ))
          ) : (
            <motion.p className='text-white' variants={fadeIn}>No company data available.</motion.p>
          )}
        </motion.div>
      </motion.div>
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

export default Companies;