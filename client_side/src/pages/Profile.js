import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: No token found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
        } else {
          setError(data.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError('Error fetching profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('resume', resumeFile);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/upload/add-resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setProfile((prev) => ({ ...prev, resumes: [...prev.resumes, data.resumeUrl] }));
        setResumeFile(null);
      } else {
        alert(data.message || 'Failed to upload resume.');
      }
    } catch (err) {
      alert('Error uploading resume.');
    }
  };

  const handleResumeDelete = async (resumeUrl) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/removecv/remove-resume`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resumeUrl })
      });
      const data = await response.json();
      if (response.ok) {
        setProfile((prev) => ({ ...prev, resumes: prev.resumes.filter(r => r !== resumeUrl) }));
      } else {
        alert(data.message || 'Failed to delete resume.');
      }
    } catch (err) {
      alert('Error deleting resume.');
    }
  };

  if (loading) return <p className="text-white">Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='p-6 bg-[#111827] flex-1 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-[#1F2937] p-6 rounded-lg shadow-md text-white'>
        <h1 className='text-2xl font-bold mb-4'>Profile</h1>

        <div className='mb-4'>
          <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <h3 className='mt-6 mb-2 text-lg font-semibold'>Resumes:</h3>
          <div className='mb-4'>
            {profile.resumes.length > 0 ? (
              profile.resumes.map((resume, index) => (
                <p key={index}>
                  Resume {index + 1}: 
                  <a href={resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                  <button 
                    className='ml-4 text-red-500 hover:underline' 
                    onClick={() => handleResumeDelete(resume)}>
                    Remove
                  </button>
                </p>
              ))
            ) : (
              <p>No resumes uploaded.</p>
            )}
          </div>
          <input type='file' onChange={(e) => setResumeFile(e.target.files[0])} className='text-white'/>
          <button onClick={handleResumeUpload} className='ml-2 bg-blue-500 p-2 rounded'>Upload Resume</button>
        </div>

        <Link to='/dashboard/edit-profile' className='text-blue-500 hover:underline'>Edit Profile</Link>
      </div>
    </div>
  );
};

export default Profile;
