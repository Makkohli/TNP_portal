import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

// Bind modal to app element
Modal.setAppElement('#root');

const CompanyDetails = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [company, setCompany] = useState(null); // State to store company details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/company/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCompany(data); // Set the fetched company data
          setLoading(false);
        } else {
          setError('Failed to fetch company details');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching company details');
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleApplyClick = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (resume) {
      console.log('Resume uploaded:', resume);
      setResume(null);
      handleCloseModal();
    } else {
      alert('Please select a resume to upload.');
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading company details...</div>;
  }

  if (error) {
    return <div className="p-6 text-white">{error}</div>;
  }

  if (!company) {
    return <div className="p-6 text-white">Company not found</div>;
  }

  return (
    <div className='p-6 flex-1 overflow-auto font-sans'>
      <div className='max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg text-white'>
        <h1 className='text-3xl font-bold mb-6'>{company.name}</h1>
        <p className='text-lg mb-4'><strong>Department:</strong> {company.department}</p>
        <p className='text-lg mb-4'><strong>Status:</strong> {company.status}</p>
        <div className='mb-6'>
          <strong>Apply:</strong>
          <button 
            onClick={handleApplyClick}
            className='inline-block mt-2 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-300'
          >
            Apply Now
          </button>
        </div>

        <div className='bg-[#232227] p-6 rounded-lg mb-6'>
          <h2 className='text-2xl font-semibold mb-4'>Job Details</h2>
          <p><strong>Location:</strong> {company.location}</p>
          <p><strong>Job Role:</strong> {company.jobRole}</p>
          <p><strong>Place of Posting:</strong> {company.placeOfPosting}</p>
          <p><strong>Remote:</strong> {company.isRemote ? 'Yes' : 'No'}</p>
          <p><strong>Batch:</strong> {company.batch}</p>
          <p><strong>CTC:</strong> {company.ctc}</p>
          <p><strong>CGPA:</strong> {company.cgpa}</p>
          <p><strong>Category:</strong> {company.category}</p>
          <p><strong>Backlogs:</strong> {company.backlogs}</p>
          <p><strong>Allowed Branches:</strong> {company.allowedBranches.join(', ')}</p>
          <p><strong>Registration Last Date:</strong> {new Date(company.registrationLastDate).toDateString()}</p>
          <p><strong>Coordinators:</strong></p>
          <ul>
            {company.coordinators.map((coord, index) => (
              <li key={index}>{coord.name}</li>
            ))}
          </ul>
          <p><strong>Job Description:</strong> {company.jobDescription}</p>
        </div>
      </div>

      {/* Modal for file upload */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Upload Resume"
        className='bg-[#373737] p-6 rounded-lg shadow-lg text-white'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      >
        <h2 className='text-2xl font-bold mb-4'>Upload Your Resume</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className='mb-4 text-white'
          />
          <button
            type="submit"
            className='px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-300'
          >
            Upload Resume
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className='px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-300 ml-4'
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyDetails;
