import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    department: 'Computer Science',
    cgpa: '3.8',
    batch: '2024',
    resume: '/path/to/resume.pdf'
  });

  return (
    <div className='p-6 bg-[#222222] flex-1 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'>
        <h1 className='text-2xl font-bold mb-4'>Profile</h1>
        <div className='mb-4'>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Department:</strong> {profile.department}</p>
          <p><strong>CGPA:</strong> {profile.cgpa}</p>
          <p><strong>Batch:</strong> {profile.batch}</p>
          <p><strong>Resume:</strong> {profile.resume ? <a href={profile.resume} className='text-blue-400 hover:underline'>View Resume</a> : 'N/A'}</p>
          {/* Add more profile fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
