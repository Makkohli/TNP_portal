// src/components/Header.js
import { Search, Bell } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className='p-5 flex justify-between items-center'>
      <div className='flex items-center gap-4 flex-grow'>
        <div className='flex gap-3 items-center p-3 rounded-md max-w-6xl w-full bg-[#373737] shadow-md'>
          <Search className='text-white text-xl' />
          <input 
            type='text' 
            placeholder='Search...'
            className='bg-transparent w-full outline-none text-white placeholder-white text-lg'
            style={{ border: 'none' }}
          />
        </div>
        <div className='relative'>
          <Bell className='text-white text-2xl cursor-pointer' />
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>3</span>
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        {/* <UserButton /> */}
      </div>
    </div>
  );
}

export default Header;