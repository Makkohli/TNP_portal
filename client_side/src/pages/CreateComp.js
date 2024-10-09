import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const CompanyForm = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    department: '',
    status: 'Pending',
    location: '',
    jobRole: '',
    placeOfPosting: 'Remote',
    isRemote: false,
    batch: '',
    ctc: '',
    cgpa: '',
    category: '',
    backlogs: '',
    allowedBranches: '',
    registrationLastDate: '',
    coordinators: '',
    jobDescription: '',
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  // Handle boolean checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCompanyData({
      ...companyData,
      [name]: checked,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/company/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({
          ...companyData,
          allowedBranches: companyData.allowedBranches.split(',').map(branch => branch.trim()), // Convert to array
          coordinators: companyData.coordinators.split(',').map(name => ({ name: name.trim() })), // Convert to array of objects
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Company added successfully!');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage('Error adding company. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="p-6 ">
      <motion.h2 
        className="text-white text-2xl font-bold mb-6" 
        initial="hidden" 
        animate="visible" 
        variants={fadeIn}
      >
        Add New Company
      </motion.h2>
      <motion.form 
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 "
      >
        {/* Form fields with fade-in animation */}
        {Object.keys(companyData).map((field, index) => (
          <motion.div key={index} variants={fadeIn} className="bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-lg shadow-md text-white">
            <label className="block text-sm font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            {field === 'jobDescription' ? (
              <textarea 
                name={field} 
                value={companyData[field]} 
                onChange={handleChange} 
                className="w-full bg-[#222222] p-2 mt-2 rounded-md text-white" 
              />
            ) : field === 'isRemote' ? (
                <div className="flex items-center mt-2">
                  <input 
                    type="checkbox" 
                    name={field} 
                    checked={companyData[field]} 
                    onChange={handleCheckboxChange} 
                    className="mr-2"
                  />
                  <label className="text-sm font-semibold">
                    {companyData[field] ? 'Yes' : 'No'}
                  </label>
                </div>
              ) : (
                <input 
                  type={field === 'registrationLastDate' ? 'date' : 'text'} 
                  name={field} 
                  value={companyData[field]} 
                  onChange={handleChange} 
                  className="w-full bg-[#222222] p-2 mt-2 rounded-md text-white" 
                />
              )}
              
          </motion.div>
        ))}

        {/* Submit Button */}
        <motion.div variants={slideIn} className="col-span-2">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Add Company
          </button>
        </motion.div>
      </motion.form>

      {/* Success or Error Message */}
      {message && (
        <motion.p 
          className="mt-4 text-center text-yellow-400 font-bold" 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default CompanyForm;
