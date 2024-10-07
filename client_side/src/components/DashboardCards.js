// src/components/DashboardCards.js
import React from 'react';

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Students Card */}
      <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
        <h2 className='text-lg font-semibold'>Total Students</h2>
        <p className='text-2xl font-bold text-blue-400'>50</p>
      </div>
      
      {/* Placed Students Card */}
      <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
        <h2 className='text-lg font-semibold'>Placed Students</h2>
        <p className='text-2xl font-bold text-red-400'>21</p>
      </div>
      
      {/* Time Left Card */}
      <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
        <h2 className='text-lg font-semibold'>Time Left</h2>
        <p className='text-2xl font-bold text-yellow-400'>16 Days</p>
      </div>
    </div>
  );
}

export default DashboardCards;
