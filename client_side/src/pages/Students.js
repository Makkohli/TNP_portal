// src/pages/Students.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaEdit,
  FaCalendarAlt,
  FaTasks,
  FaExclamationCircle,
  FaCheckCircle,
  FaClipboardList,
} from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Hardcoded companies data (12 companies)
const hardcodedCompanies = [
  {
    name: 'Tech Corp',
    department: 'Engineering',
    status: 'Scheduled',
    logoUrl: '/logos/tech-corp-logo.svg',
    visitDate: '2024-09-15',
  },
  {
    name: 'Data Solutions',
    department: 'Data Science',
    status: 'Scheduled',
    logoUrl: '/logos/data-solutions-logo.svg',
    visitDate: '2024-09-15',
  },
  {
    name: 'InnovateX',
    department: 'Product Management',
    status: 'Scheduled',
    logoUrl: '/logos/innovatex-logo.svg',
    visitDate: '2024-09-20',
  },
  {
    name: 'DesignHub',
    department: 'UI/UX Design',
    status: 'Scheduled',
    logoUrl: '/logos/designhub-logo.svg',
    visitDate: '2024-10-05',
  },
  {
    name: 'CyberSecure',
    department: 'Cybersecurity',
    status: 'Scheduled',
    logoUrl: '/logos/cybersecure-logo.svg',
    visitDate: '2024-10-10',
  },
  {
    name: 'HealthPlus',
    department: 'Healthcare',
    status: 'Scheduled',
    logoUrl: '/logos/healthplus-logo.svg',
    visitDate: '2024-10-10',
  },
  {
    name: 'EduLearn',
    department: 'Education Technology',
    status: 'Scheduled',
    logoUrl: '/logos/edulearn-logo.svg',
    visitDate: '2024-10-15',
  },
  {
    name: 'FinTrust',
    department: 'Finance',
    status: 'Scheduled',
    logoUrl: '/logos/fintrust-logo.svg',
    visitDate: '2024-09-25',
  },
  {
    name: 'GreenEnergy',
    department: 'Renewable Energy',
    status: 'Scheduled',
    logoUrl: '/logos/greenenergy-logo.svg',
    visitDate: '2024-09-25',
  },
  {
    name: 'AutoDrive',
    department: 'Automotive',
    status: 'Scheduled',
    logoUrl: '/logos/autodrive-logo.svg',
    visitDate: '2024-10-20',
  },
  // Two additional companies
  {
    name: 'BioHealth',
    department: 'Biotechnology',
    status: 'Scheduled',
    logoUrl: '/logos/biohealth-logo.svg',
    visitDate: '2024-10-25',
  },
  {
    name: 'QuantumLeap',
    department: 'Quantum Computing',
    status: 'Scheduled',
    logoUrl: '/logos/quantumleap-logo.svg',
    visitDate: '2024-09-30',
  },
];

// Hardcoded job application statuses
const hardcodedJobStatuses = [
  {
    position: 'Software Engineer',
    companyName: 'Tech Corp',
    status: 'Pending',
  },
  {
    position: 'Data Analyst',
    companyName: 'Data Solutions',
    status: 'Interview Scheduled',
  },
  {
    position: 'Product Manager',
    companyName: 'InnovateX',
    status: 'Offer Received',
  },
  {
    position: 'UI/UX Designer',
    companyName: 'DesignHub',
    status: 'Rejected',
  },
  {
    position: 'Cybersecurity Specialist',
    companyName: 'CyberSecure',
    status: 'Scheduled',
  },
];

// Hardcoded academic deadlines
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

// Hardcoded achievements
const hardcodedAchievements = [
  {
    title: 'Dean’s List',
    description: 'Achieved a GPA of 3.8 or higher.',
    icon: <FaCheckCircle className='text-2xl text-green-500' />,
  },
  {
    title: 'Community Service',
    description: 'Completed 50 hours of community service.',
    icon: <FaClipboardList className='text-2xl text-blue-500' />,
  },
  {
    title: 'Best Project Award',
    description: 'Received the best project award in UI/UX Design.',
    icon: <FaCheckCircle className='text-2xl text-yellow-500' />,
  },
];

const Students = () => {
  // Example statistics
  const totalStudents = 50;
  const placedStudents = 21;
  const rejectedStudents = totalStudents - placedStudents;

  // State management
  const [notices, setNotices] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [companiesOnDate, setCompaniesOnDate] = useState([]);

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/notices/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort and limit notices
          const sortedNotices = data
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
            .slice(0, 9);
          setNotices(sortedNotices);
        } else {
          console.error('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  // Initialize companies with hardcoded data
  useEffect(() => {
    setCompanies(hardcodedCompanies);
  }, []);

  // Initialize jobStatuses with hardcoded data
  useEffect(() => {
    setJobStatuses(hardcodedJobStatuses);
  }, []);

  // Handle date selection on calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filter companies scheduled on the selected date
    const companiesForDate = companies.filter((company) => {
      const eventDate = new Date(company.visitDate).toDateString();
      return eventDate === date.toDateString();
    });

    // Limit to 3-5 companies
    const limitedCompanies = companiesForDate.slice(0, 5);
    setCompaniesOnDate(limitedCompanies);
  };

  return (
    <div className='p-4 md:p-6  min-h-screen text-white overflow-x-hidden'>
      {/* Student Achievements & Badges */}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaCheckCircle className='mr-2' />
          Achievements & Badges
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {hardcodedAchievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Announcements & Highlights Section */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-h-96 overflow-y-auto'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaExclamationCircle className='mr-2' />
          Announcements & Highlights
        </h2>
        {notices && notices.length > 0 ? (
          <ul className='space-y-4'>
            {notices.map((notice, index) => (
              <li
                key={index}
                className='bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200'
              >
                <h3 className='text-lg font-semibold mb-2'>{notice.title}</h3>
                <p className='text-sm mb-2'>{notice.description}</p>
                <p className='text-xs text-gray-400'>
                  {new Date(notice.dateCreated).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-400'>No announcements available.</p>
        )}
      </div>

      {/* Companies Section */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          Companies <span className='ml-2 text-sm text-gray-400'>(Scheduled Visits)</span>
        </h2>
        {companies.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {companies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No companies available.</p>
        )}
      </div>

      {/* Upcoming Interviews & Events Calendar */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaCalendarAlt className='mr-2' />
          Upcoming Interviews & Events
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Side: Calendar */}
          <div className='lg:col-span-1'>
            <CalendarComponent companies={companies} onDateChange={handleDateChange} />
          </div>
          {/* Right Side: Companies on Selected Date */}
          <div className='lg:col-span-2 bg-gray-700 p-4 rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold mb-4'>
              Companies Visiting on {selectedDate.toLocaleDateString()}
            </h3>
            {companiesOnDate.length > 0 ? (
              <ul className='space-y-4'>
                {companiesOnDate.map((company, index) => (
                  <li key={index} className='flex items-center'>
                    <img
                      src={company.logoUrl || '/logos/default-company-logo.svg'}
                      alt={`${company.name} logo`}
                      className='w-12 h-12 mr-4 object-cover rounded-full'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/logos/default-company-logo.svg';
                      }}
                    />
                    <div>
                      <h4 className='text-lg font-semibold'>{company.name}</h4>
                      <p className='text-sm text-gray-300'>{company.department}</p>
                      <p className='text-sm'>
                        Status:{' '}
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(
                            company.status
                          )}`}
                        >
                          {company.status}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-400'>No companies scheduled for this date.</p>
            )}
          </div>
        </div>
      </div>

      {/* Task Management & To-Do List */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaClipboardList className='mr-2' />
          To-Do List
        </h2>
        <ToDoList />
      </div>

      {/* Academic Calendar & Upcoming Deadlines */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaCalendarAlt className='mr-2' />
          Academic Calendar
        </h2>
        <AcademicCalendar deadlines={hardcodedDeadlines} />
      </div>

      {/* Job Application Status Tracker */}
      <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaTasks className='mr-2' />
          Job Application Status Tracker
        </h2>
        {jobStatuses.length > 0 ? (
          <div className='space-y-4'>
            {jobStatuses.map((job, index) => (
              <JobStatusCard key={index} job={job} />
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No job applications found.</p>
        )}
      </div>
    </div>
  );
};

// Stateless component for statistic cards
const StatCard = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-lg shadow-md flex items-center`}>
    {icon}
    <div className='ml-4'>
      <h3 className='text-md font-semibold'>{title}</h3>
      <p className='text-3xl font-bold'>{value}</p>
    </div>
  </div>
);

// Stateless component for companies with improved design
const CompanyCard = ({ company }) => (
  <div className='bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 flex flex-col items-center text-center'>
    <img
      src={company.logoUrl || '/logos/default-company-logo.svg'}
      alt={`${company.name} logo`}
      className='w-20 h-20 object-cover mb-4 rounded-full'
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/logos/default-company-logo.svg';
      }}
    />
    <h3 className='text-lg font-semibold mb-2'>{company.name}</h3>
    <p className='text-sm mb-2'>Department: {company.department}</p>
    <p className='text-sm'>
      Status:{' '}
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(
          company.status
        )}`}
      >
        {company.status}
      </span>
    </p>
  </div>
);

// Stateless component for job application status
const JobStatusCard = ({ job }) => (
  <div className='bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 flex justify-between items-center'>
    <div>
      <h3 className='text-lg font-semibold'>{job.position}</h3>
      <p className='text-sm text-gray-400'>{job.companyName}</p>
    </div>
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(
        job.status
      )}`}
    >
      {job.status}
    </span>
  </div>
);

// Calendar Component with clickable dates
const CalendarComponent = ({ companies, onDateChange }) => {
  // Determine dates with scheduled companies
  const getCompanyDates = () => {
    const dates = companies.map((company) => new Date(company.visitDate).toDateString());
    // Remove duplicates
    return [...new Set(dates)];
  };

  const companyDates = getCompanyDates();

  // Highlight dates with companies
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      if (companyDates.includes(dateStr)) {
        return <div className='mt-1 bg-blue-500 w-3 h-3 rounded-full mx-auto'></div>;
      }
    }
    return null;
  };

  return (
    <div className='overflow-x-auto'>
      <Calendar
        className='react-calendar text-black rounded-lg w-full max-w-full'
        tileContent={tileContent}
        onClickDay={onDateChange}
      />
    </div>
  );
};

// Task Management & To-Do List Component
const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Submit Assignment 2 for Data Science', completed: false },
    { id: 2, text: 'Prepare for Midterm Exams', completed: false },
    { id: 3, text: 'Attend Project Proposal Workshop', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: nextId, text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className='bg-gray-700 p-4 rounded-lg shadow-md'>
      {/* Input for new task */}
      <div className='flex mb-4'>
        <input
          type='text'
          placeholder='Add a new task...'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className='w-full p-2 rounded-l-md focus:outline-none'
        />
        <button
          onClick={handleAddTask}
          className='bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200'
        >
          Add
        </button>
      </div>
      {/* List of tasks */}
      <ul className='space-y-2'>
        {tasks.map((task) => (
          <li
            key={task.id}
            className='flex items-center justify-between bg-gray-600 p-2 rounded-md'
          >
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className='mr-2'
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className='text-red-500 hover:text-red-600 transition-colors duration-200'
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Student Achievements & Badges Component
const AchievementCard = ({ achievement }) => (
  <div className='bg-gray-700 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-600 transition-colors duration-200'>
    {achievement.icon}
    <div>
      <h3 className='text-lg font-semibold'>{achievement.title}</h3>
      <p className='text-sm text-gray-300'>{achievement.description}</p>
    </div>
  </div>
);

// Academic Calendar & Upcoming Deadlines Component
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
              <h4 className='text-lg font-semibold'>{deadline.title}</h4>
              <p className='text-sm text-gray-300'>{deadline.description}</p>
              <p className='text-xs text-gray-400'>{new Date(deadline.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to determine badge classes based on status
const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-blue-500 text-white';
    case 'interview scheduled':
      return 'bg-yellow-500 text-white';
    case 'offer received':
      return 'bg-green-500 text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    case 'scheduled':
      return 'bg-purple-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default Students;
