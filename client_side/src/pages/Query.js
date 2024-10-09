import React, { useState } from 'react';
import companyData from '../data/companies.json';

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

  return (
    <div className='p-6 min-h-screen flex-1 overflow-auto font-sans'>
      <div className='max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg text-white'>
        <h1 className='text-3xl font-bold mb-6'>Submit a Query</h1>
        <div className='mb-6'>
          <label className='block mb-4'>
            <span className='text-lg font-semibold'>Select Company:</span>
            <select
              className='w-full p-3 mt-2 bg-[#222222] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
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
        </div>
        <div className='mb-6'>
          <label className='block mb-4'>
            <span className='text-lg font-semibold'>Your Query:</span>
            <textarea
              className='w-full p-3 mt-2 bg-[#222222] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              rows='5'
              value={query}
              onChange={handleQueryChange}
            />
          </label>
        </div>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out font-bold shadow-lg'
          onClick={handleSubmit}
        >
          Submit Query
        </button>
      </div>
    </div>
  );
};

export default Query;