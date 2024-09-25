import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    bloodGroup: 'A',
    class10Percent: 85.0,
    class12Percent: 78.5,
    dateOfBirth: '2000-05-15',
    gender: 'Male',
    batch: '2024',
    degree: 'BTech',
    graduationGPA: 8.0,
    category: 'General',
    collegeEmail: 'john.doe@college.edu',
    personalEmail: 'john.doe@example.com',
    rollNumber: '2021XYZ123',
    branch: 'CSE',
    contactNumber: '12345 67890',
    altContactNumber: '09876 54321',
    currentAddress: '123 Main St, Hometown, Country',
    permanentAddress: '456 Elm St, Hometown, Country',
    aadhaar: '1234 5678 9101',
    panCard: 'ABCDE1234F',
    resume: 'resume2.pdf',
    sem1GPA: 6.5,
    sem2GPA: 7.0,
    sem3GPA: 7.5,
    sem4GPA: 7.8,
    sem5GPA: 8.0,
    sem6GPA: 8.2,
    sem7GPA: 8.5,
    sem8GPA: 8.7,
    finalCGPA: 8.1,
    cgpaBeforeDrop: 8.0,
    graduationCGPA: '8.0',
    backlogs: 0,
    bans: 1,
  });

  const navigate = useNavigate();
  const studentId = localStorage.getItem('userId'); // Student ID to be updated
  const token = localStorage.getItem('token'); // Retrieve the token
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/editProf/edit-profile/${studentId}`, {
        method: 'PUT', // Change to 'POST' if your API requires it
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Pass the token here
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      alert('Profile updated successfully!'); // Optional: Show success message
      navigate('/dashboard/students');  // Redirect back to the Students page after updating
    } catch (error) {
      console.error(error);
      alert('Error updating profile: ' + error.message); // Optional: Show error message
    }
  };

  return (
    <div className='p-6 bg-[#222222]'>
      <h1 className='text-2xl font-bold text-white mb-4'>Edit Profile</h1>
      <form onSubmit={handleSubmit} className='bg-[#373737] p-6 rounded-lg'>
        {/* Form Fields */}
        <div>
          <label className='block text-white'>Name</label>
          <input type='text' name='name' value={profile.name} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Blood Group</label>
          <input type='text' name='bloodGroup' value={profile.bloodGroup} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Class 10 Percentage</label>
          <input type='number' name='class10Percent' value={profile.class10Percent} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Class 12 Percentage</label>
          <input type='number' name='class12Percent' value={profile.class12Percent} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Date of Birth</label>
          <input type='date' name='dateOfBirth' value={profile.dateOfBirth} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Gender</label>
          <select name='gender' value={profile.gender} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <label className='block text-white'>Batch</label>
          <input type='text' name='batch' value={profile.batch} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Degree</label>
          <input type='text' name='degree' value={profile.degree} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Graduation GPA</label>
          <input type='number' step='0.1' name='graduationGPA' value={profile.graduationGPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Category</label>
          <input type='text' name='category' value={profile.category} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>College Email</label>
          <input type='email' name='collegeEmail' value={profile.collegeEmail} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Personal Email</label>
          <input type='email' name='personalEmail' value={profile.personalEmail} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Roll Number</label>
          <input type='text' name='rollNumber' value={profile.rollNumber} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Branch</label>
          <input type='text' name='branch' value={profile.branch} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Contact Number</label>
          <input type='text' name='contactNumber' value={profile.contactNumber} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Alternate Contact Number</label>
          <input type='text' name='altContactNumber' value={profile.altContactNumber} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Current Address</label>
          <input type='text' name='currentAddress' value={profile.currentAddress} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Permanent Address</label>
          <input type='text' name='permanentAddress' value={profile.permanentAddress} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Aadhaar</label>
          <input type='text' name='aadhaar' value={profile.aadhaar} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>PAN Card</label>
          <input type='text' name='panCard' value={profile.panCard} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Resume</label>
          <input type='text' name='resume' value={profile.resume} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 1 GPA</label>
          <input type='number' step='0.1' name='sem1GPA' value={profile.sem1GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 2 GPA</label>
          <input type='number' step='0.1' name='sem2GPA' value={profile.sem2GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 3 GPA</label>
          <input type='number' step='0.1' name='sem3GPA' value={profile.sem3GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 4 GPA</label>
          <input type='number' step='0.1' name='sem4GPA' value={profile.sem4GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 5 GPA</label>
          <input type='number' step='0.1' name='sem5GPA' value={profile.sem5GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 6 GPA</label>
          <input type='number' step='0.1' name='sem6GPA' value={profile.sem6GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 7 GPA</label>
          <input type='number' step='0.1' name='sem7GPA' value={profile.sem7GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Sem 8 GPA</label>
          <input type='number' step='0.1' name='sem8GPA' value={profile.sem8GPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Final CGPA</label>
          <input type='number' step='0.1' name='finalCGPA' value={profile.finalCGPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>CGPA Before Drop</label>
          <input type='number' step='0.1' name='cgpaBeforeDrop' value={profile.cgpaBeforeDrop} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Graduation CGPA</label>
          <input type='text' name='graduationCGPA' value={profile.graduationCGPA} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Backlogs</label>
          <input type='number' name='backlogs' value={profile.backlogs} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        <div>
          <label className='block text-white'>Bans</label>
          <input type='number' name='bans' value={profile.bans} onChange={handleChange} className='w-full p-2 rounded-lg bg-gray-800 text-white' />
        </div>
        
        {/* Submit Button */}
        <button type='submit' className='mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600'>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
