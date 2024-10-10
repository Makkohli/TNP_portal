// src/pages/Error.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Start countdown from 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect to login after countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      navigate('/login');
    }

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl">404 Not Found</h1>
        <p className="mt-4">Oops! The page you’re looking for doesn’t exist.</p>
        <p className="mt-2">This might be because you’ve logged out or navigated to a page that is no longer available.</p>
        <p className="mt-2">Redirecting to login in {countdown} seconds...</p>
        <button 
          onClick={() => navigate('/login')} 
          className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
};

export default Error;
