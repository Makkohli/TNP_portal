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
    <div className='p-6 bg-[#222222] flex-1 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'>
        <h1 className='text-2xl font-bold mb-4'>Submit a Query</h1>
        <div className='mb-4'>
          <label className='block mb-2'>
            <span className='text-white'>Select Company:</span>
            <select
              className='w-full p-2 mt-2 bg-[#222222] text-white rounded'
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
        <div className='mb-4'>
          <label className='block mb-2'>
            <span className='text-white'>Your Query:</span>
            <textarea
              className='w-full p-2 mt-2 bg-[#222222] text-white rounded'
              rows='5'
              value={query}
              onChange={handleQueryChange}
            />
          </label>
        </div>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          onClick={handleSubmit}
        >
          Submit Query here
        </button>
      </div>
    </div>
  );
};

export default Query;
