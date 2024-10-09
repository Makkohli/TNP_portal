import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

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
    resumes: [],
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
      resumes: JSON.parse(localStorage.getItem('resumes')) || [],
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
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
        const base64String = btoa(String.fromCharCode(...new Uint8Array(compressedPdfBytes)));

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
          const newResumes = [...profile.resumes, base64String];
          setProfile((prevProfile) => ({
            ...prevProfile,
            resumes: newResumes
          }));
          localStorage.setItem('resumes', JSON.stringify(newResumes));
        } else {
          alert(data.message || 'Failed to upload resume.');
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    };

    reader.readAsArrayBuffer(file);
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
        const updatedResumes = profile.resumes.slice(1);
        setProfile((prevProfile) => ({
          ...prevProfile,
          resumes: updatedResumes
        }));
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
      } else {
        alert('Failed to remove the resume.');
      }
    } catch (error) {
      console.error('Error removing resume:', error);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className='p-6 bg-[#222222] min-h-screen flex-1 overflow-auto font-sans'>
      <motion.div
        className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <h1 className='text-3xl font-bold mb-6'>Profile</h1>
        <motion.div variants={fadeIn} className='mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className='mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Contact Details</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <p><strong>College Email:</strong> {profile.collegeEmail || 'N/A'}</p>
            <p><strong>Personal Email:</strong> {profile.personalEmail || 'N/A'}</p>
            <p><strong>Contact Number:</strong> {profile.contactNumber || 'N/A'}</p>
            <p><strong>Alternate Contact Number:</strong> {profile.alternateContactNumber || 'N/A'}</p>
            <p><strong>Current Address:</strong> {profile.currentAddress || 'N/A'}</p>
            <p><strong>Permanent Address:</strong> {profile.permanentAddress || 'N/A'}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className='mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Documents</h2>
          <p><strong>Aadhaar:</strong> {profile.aadhaar || 'N/A'}</p>
          <p><strong>PAN Card:</strong> {profile.panCard || 'N/A'}</p>
        </motion.div>

        <motion.div variants={fadeIn} className='mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Resumes</h2>
          <div className='mb-4'>
            {profile.resumes.map((resume, index) => {
              const byteCharacters = atob(resume);
              const byteNumbers = new Uint8Array(byteCharacters.length);
              
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }

              const blob = new Blob([byteNumbers], { type: 'application/pdf' });
              const blobUrl = URL.createObjectURL(blob);

              return (
                <motion.p key={index} variants={slideIn}>
                  Resume {index + 1}: <a href={blobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
                </motion.p>
              );
            })}
          </div>
          <motion.button 
            onClick={handleRemoveResume} 
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            disabled={profile.resumes.length === 0}
            variants={slideIn}
          >
            Remove Resume
          </motion.button>
          <div className='mt-6'>
            <label className='block mb-2 text-sm font-bold'>Upload New Resume:</label>
            <input type='file' accept='application/pdf' onChange={handleResumeUpload} className='text-black'/>
          </div>
        </motion.div>

        <Link to='/dashboard/edit-profile' className='text-blue-500 hover:underline'>Edit Profile</Link>
      </motion.div>
    </div>
  );
};

export default Profile;