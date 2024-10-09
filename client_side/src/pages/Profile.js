import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    class10Percentage: '',
    class12Percentage: '',
    dateOfBirth: '',
    gender: '',
    batch: '',
    degree: '',
    graduationGPA: '',
    category: '',
    collegeEmail: '',
    personalEmail: '',
    rollNumber: '',
    branch: '',
    contactNumber: '',
    alternateContactNumber: '',
    currentAddress: '',
    permanentAddress: '',
    aadhaar: '',
    panCard: '',
    resumes: [], // Array to hold resumes
    semester1GPA: '',
    semester2GPA: '',
    semester3GPA: '',
    semester4GPA: '',
    semester5GPA: '',
    semester6GPA: '',
    semester7GPA: '',
    semester8GPA: '',
    finalCGPA: '',
    cgpaBeforeDrop: '',
    graduationCGPA: '',
    backlogs: '',
    bans: ''
  });

  useEffect(() => {
    // Retrieve all the profile data from localStorage
    const storedProfile = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      bloodGroup: localStorage.getItem('bloodGroup'),
      class10Percentage: localStorage.getItem('class10Percentage'),
      class12Percentage: localStorage.getItem('class12Percentage'),
      dateOfBirth: localStorage.getItem('dateOfBirth'),
      gender: localStorage.getItem('gender'),
      batch: localStorage.getItem('batch'),
      degree: localStorage.getItem('degree'),
      graduationGPA: localStorage.getItem('graduationGPA'),
      category: localStorage.getItem('category'),
      collegeEmail: localStorage.getItem('collegeEmail'),
      personalEmail: localStorage.getItem('personalEmail'),
      rollNumber: localStorage.getItem('rollNumber'),
      branch: localStorage.getItem('branch'),
      contactNumber: localStorage.getItem('contactNumber'),
      alternateContactNumber: localStorage.getItem('alternateContactNumber'),
      currentAddress: localStorage.getItem('currentAddress'),
      permanentAddress: localStorage.getItem('permanentAddress'),
      aadhaar: localStorage.getItem('aadhaar'),
      panCard: localStorage.getItem('panCard'),
      resumes: JSON.parse(localStorage.getItem('resumes')) || [], // Load resumes from localStorage
      semester1GPA: localStorage.getItem('semester1GPA'),
      semester2GPA: localStorage.getItem('semester2GPA'),
      semester3GPA: localStorage.getItem('semester3GPA'),
      semester4GPA: localStorage.getItem('semester4GPA'),
      semester5GPA: localStorage.getItem('semester5GPA'),
      semester6GPA: localStorage.getItem('semester6GPA'),
      semester7GPA: localStorage.getItem('semester7GPA'),
      semester8GPA: localStorage.getItem('semester8GPA'),
      finalCGPA: localStorage.getItem('finalCGPA'),
      cgpaBeforeDrop: localStorage.getItem('cgpaBeforeDrop'),
      graduationCGPA: localStorage.getItem('graduationCGPA'),
      backlogs: localStorage.getItem('backlogs'),
      bans: localStorage.getItem('bans')
    };

    // Update the state with the retrieved data
    setProfile(storedProfile);
  }, []);

  

const handleResumeUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (profile.resumes.length >= 3) {
    alert("You can only upload up to 3 resumes.");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = async () => {
    const arrayBuffer = reader.result;

    try {
      // Load the PDF and compress it
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false }); // Compress PDF
      
      // Convert compressed PDF to base64
      const base64String = btoa(String.fromCharCode(...new Uint8Array(compressedPdfBytes)));
      console.log("Compressed Base64 Size:", base64String.length);

      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:3000/api/v1/uploadcv/add-resume", {
        method: 'POST',
        body: JSON.stringify({ resume: `data:application/pdf;base64,${base64String}` }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const newResumes = [...profile.resumes, base64String]; // Store compressed base64 string
        setProfile((prevProfile) => ({
          ...prevProfile,
          resumes: newResumes
        }));
        console.log("Successfully uploaded");
        localStorage.setItem('resumes', JSON.stringify(newResumes)); // Update localStorage
      } else {
        alert(data.message || 'Failed to upload resume.');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  reader.readAsArrayBuffer(file); // Read file as array buffer for compression
};

  
  

  const handleRemoveResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/api/v1/removecv/remove-resume", {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const updatedResumes = profile.resumes.slice(1); // Remove the oldest resume
        setProfile((prevProfile) => ({
          ...prevProfile,
          resumes: updatedResumes
        }));
        localStorage.setItem('resumes', JSON.stringify(updatedResumes)); // Update localStorage
        console.log("Successfully removed the oldest resume");
      } else {
        alert('Failed to remove the resume.');
      }
    } catch (error) {
      console.error('Error removing resume:', error);
    }
  };

  return (
    <div className='p-6 bg-[#222222] flex-1 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'>
        <h1 className='text-2xl font-bold mb-4'>Profile</h1>
        <div className='mb-4'>
          <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Blood Group:</strong> {profile.bloodGroup || 'N/A'}</p>
          <p><strong>Class 10 Percentage:</strong> {profile.class10Percentage || 'N/A'}</p>
          <p><strong>Class 12 Percentage:</strong> {profile.class12Percentage || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth || 'N/A'}</p>
          <p><strong>Gender:</strong> {profile.gender || 'N/A'}</p>
          <p><strong>Batch:</strong> {profile.batch || 'N/A'}</p>
          <p><strong>Degree:</strong> {profile.degree || 'N/A'}</p>
          <p><strong>Graduation GPA:</strong> {profile.graduationGPA || 'N/A'}</p>
          <p><strong>Category:</strong> {profile.category || 'N/A'}</p>
          <p><strong>College Email:</strong> {profile.collegeEmail || 'N/A'}</p>
          <p><strong>Personal Email:</strong> {profile.personalEmail || 'N/A'}</p>
          <p><strong>Roll Number:</strong> {profile.rollNumber || 'N/A'}</p>
          <p><strong>Branch:</strong> {profile.branch || 'N/A'}</p>
          <p><strong>Contact Number:</strong> {profile.contactNumber || 'N/A'}</p>
          <p><strong>Alternate Contact Number:</strong> {profile.alternateContactNumber || 'N/A'}</p>
          <p><strong>Current Address:</strong> {profile.currentAddress || 'N/A'}</p>
          <p><strong>Permanent Address:</strong> {profile.permanentAddress || 'N/A'}</p>
          <p><strong>Aadhaar:</strong> {profile.aadhaar || 'N/A'}</p>
          <p><strong>PAN Card:</strong> {profile.panCard || 'N/A'}</p>
          
          {/* Resume Section */}
          <h3 className='mt-6 mb-2 text-lg font-semibold'>Resumes:</h3>
          <div className='mb-4'>
            {profile.resumes.map((resume, index) => {
              const byteCharacters = atob(resume); // Decode the base64 string
              const byteNumbers = new Uint8Array(byteCharacters.length);
              
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }

              const blob = new Blob([byteNumbers], { type: 'application/pdf' });
              const blobUrl = URL.createObjectURL(blob); // Create a blob URL

              return (
                <p key={index}>
                  Resume {index + 1}: <a href={blobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
                </p>
              );
            })}
          </div>

          {/* Button to Remove Oldest Resume */}
          <button 
            onClick={handleRemoveResume} 
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            disabled={profile.resumes.length === 0} // Disable button if no resumes
          >
            Remove Resume
          </button>

          {/* Upload Resume Section */}
          <div className='mt-6'>
            <label className='block mb-2 text-sm font-bold'>Upload New Resume:</label>
            <input type='file' accept='application/pdf' onChange={handleResumeUpload} />
          </div>
        </div>

        <Link to='/dashboard/edit-profile' className='text-blue-500 hover:underline'>Edit Profile</Link>
      </div>
    </div>
  );
};

export default Profile;