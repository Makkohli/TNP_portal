import React, { useState } from 'react';
import companyData from '../data/companies.json';
import { motion } from 'framer-motion';

const Query = () => {
  const [query, setQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(companyData[0].name);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleSubmit = () => {
    const company = companyData.find(company => company.name === selectedCompany);
    if (company) {
      alert(`Query sent to ${company.coordinators[0].name} at ${company.coordinators[0].phone}`);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className='p-6 bg-[#222222] min-h-screen flex-1 overflow-auto font-sans'>
      <motion.div
        className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1 className='text-3xl font-bold mb-6' variants={fadeIn}>Submit a Query</motion.h1>
        <motion.div variants={fadeIn} className='mb-6'>
          <label className='block mb-4'>
            <span className='text-xl font-semibold'>Select Company:</span>
            <select
              className='w-full p-3 mt-2 bg-[#222222] text-white rounded'
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              {companyData.map((company, index) => (
                <option key={index} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
        </motion.div>
        <motion.div variants={fadeIn} className='mb-6'>
          <label className='block mb-4'>
            <span className='text-xl font-semibold'>Your Query:</span>
            <textarea
              className='w-full p-3 mt-2 bg-[#222222] text-white rounded'
              rows='5'
              value={query}
              onChange={handleQueryChange}
            />
          </label>
        </motion.div>
        <motion.button
          className='bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 font-bold'
          onClick={handleSubmit}
          variants={fadeIn}
        >
          Submit Query
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Query;