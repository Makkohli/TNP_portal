import React from 'react';
import {
  FaCalendarAlt,
} from 'react-icons/fa';

// Academic Calendar Component
const AcademicCalendar = ({ deadlines }) => {
  return (
    <div className='bg-gray-700 p-4 rounded-lg shadow-md'>
      <ul className='space-y-4'>
        {deadlines.map((deadline, index) => (
          <li key={index} className='flex items-center'>
            <div className='bg-yellow-500 p-2 rounded-full mr-4'>
              <FaCalendarAlt className='text-white' />
            </div>
            <div>
              <h4 className='text-lg font-semibold text-white'>{deadline.title}</h4>
              <p className='text-sm text-gray-300'>{deadline.description}</p>
              <p className='text-xs text-gray-400'>{new Date(deadline.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function AcademicCalender() {
  const hardcodedDeadlines = [
    {
      title: 'Assignment 1 Submission',
      date: '2024-09-20',
      description: 'Submit Assignment 1 for Data Science course.',
    },
    {
      title: 'Midterm Exams',
      date: '2024-10-10',
      description: 'Midterm exams for all engineering courses.',
    },
    {
      title: 'Project Proposal Deadline',
      date: '2024-10-15',
      description: 'Submit project proposals for Product Management course.',
    },
  ];

  return (
    <div> {/* Academic Calendar & Upcoming Deadlines */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center text-white'>
          <FaCalendarAlt className='mr-2' />
          Academic Calendar
        </h2>
        <AcademicCalendar deadlines={hardcodedDeadlines} />
      </div>
    </div>
  );
}

export default AcademicCalender;
