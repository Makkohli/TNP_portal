import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import companyData from '../data/companies.json'; // Import JSON data

// Bind modal to app element
Modal.setAppElement('#root');

const CompanyDetails = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const company = companyData.find(company => company.id === id); // Find the company details
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resume, setResume] = useState(null);

  if (!company) {
    return <div className="p-6 text-white">Company not found</div>;
  }

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
      // Handle the resume upload logic here
      console.log('Resume uploaded:', resume);
      // Reset resume state
      setResume(null);
      handleCloseModal();
    } else {
      alert('Please select a resume to upload.');
    }
  };

  return (
    <div className='p-6 bg-[#222222] flex-1 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md text-white'>
        <h1 className='text-2xl font-bold mb-4'>{company.name}</h1>
        <p className='text-lg mb-2'><strong>Department:</strong> {company.department}</p>
        <p className='text-lg mb-2'><strong>Status:</strong> {company.status}</p>
        <div className='mb-4'>
          <strong>Apply:</strong>
          <button 
            onClick={handleApplyClick}
            className='inline-block mt-2 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-300'
          >
            Apply Now
          </button>
        </div>

        <div className='bg-[#2a2a2a] p-4 rounded-md mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Job Details</h2>
          <p><strong>Location:</strong> {company.location}</p>
          <p><strong>Job Role:</strong> {company.jobRole}</p>
          <p><strong>Place of Posting:</strong> {company.placeOfPosting}</p>
          <p><strong>Remote:</strong> {company.remote}</p>
          <p><strong>Batch:</strong> {company.batch}</p>
          <p><strong>CTC/Stipend:</strong> {company.ctcStipend}</p>
          <p><strong>CTC/Stipend Info:</strong> {company.ctcStipendInfo}</p>
          <p><strong>CGPA:</strong> {company.cgpa}</p>
          <p><strong>Category:</strong> {company.category}</p>
          <p><strong>Backlogs:</strong> {company.backlogs}</p>
          <p><strong>Allowed Branches:</strong> {company.allowedBranches}</p>
          <p><strong>Registration Last Date:</strong> {new Date(company.registrationLastDate).toDateString()}</p>
          <p><strong>Coordinators:</strong></p>
          <ul>
            {company.coordinators.map((coord, index) => (
              <li key={index}>{coord.name} - {coord.contact}</li>
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
        className='bg-[#373737] p-6 rounded-lg shadow-md text-white'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50'
      >
        <h2 className='text-2xl font-bold mb-4'>Upload Your Resume</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className='mb-4'
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
