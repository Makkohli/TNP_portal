import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role is 'student'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Show success message
      setMessage('Signup successful! Redirecting to login...');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 seconds delay
    } else {
      const errorData = await response.json();
      console.error('Signup failed:', errorData.message);
      setMessage('Signup failed: ' + errorData.message);  // Show error message
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg'>
        <h2 className='text-3xl text-white mb-6 text-center'>Signup</h2>
        {message && <p className='text-green-500 text-center mb-4'>{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className='mb-4'>
            <label className='block text-white mb-2'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full p-2 rounded-lg bg-gray-700 text-white'
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-white mb-2'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter manish@1234.com'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full p-2 rounded-lg bg-gray-700 text-white'
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='block text-white mb-2'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Manish@123'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full p-2 rounded-lg bg-gray-700 text-white'
            />
          </div>

          {/* Role */}
          <div className='mb-4'>
            <label className='block text-white mb-2'>Role</label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='w-full p-2 rounded-lg bg-gray-700 text-white'
            >
              <option value='student'>Student</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full p-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600'
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
