import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // Accept onLogin as a prop

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default role is 'student'
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send the login data in the specified format
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role, // Include the role field
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { role, token, _id } = data; // Destructure role and token from response
  
        // Store the role and token in localStorage
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', _id);
  
        // Call onLogin to update authentication state
        onLogin(role); // Update the authentication state in App component
  
        // Redirect based on the role received from API
        if (role === 'admin') {
          navigate('/dashboard'); // Redirect to Admin Dashboard
        } else {
          navigate('/dashboard/students'); // Redirect to Student Dashboard
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError(error.toString()); 
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg'>
        <h2 className='text-3xl text-white mb-6 text-center'>Login</h2>
        <p className='text-white text-center'>Enter the values from the placeholder, valid for both student and admin</p>

         {/* Display error message if exists */}

         {error && <p className="text-red-500 text-center mb-1">{error}</p>}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>

          {/* Sign Up Button */}
          <button
            type='button'
            onClick={handleSignupRedirect}
            className='w-full p-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
