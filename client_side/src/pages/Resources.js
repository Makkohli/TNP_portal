import React, { useState } from 'react';
import { FaDatabase, FaCode, FaLaptopCode, FaPython, FaCalculator, FaBook } from 'react-icons/fa'; // Importing icons

const resourcesData = [
  {
    title: 'Database Management Systems (DBMS)',
    description: 'Learn about database design, normalization, and SQL.',
    icon: <FaDatabase className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/dbms/',
  },
  {
    title: 'Operating Systems (OS)',
    description: 'Understand processes, threads, and memory management.',
    icon: <FaLaptopCode className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/operating-systems/',
  },
  {
    title: 'Object-Oriented Programming (OOP)',
    description: 'Explore principles of OOP, including classes and objects.',
    icon: <FaCode className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
  },
  {
    title: 'C++',
    description: 'Learn C++ programming, syntax, and applications.',
    icon: <FaCode className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/c-plus-plus/',
  },
  {
    title: 'Java',
    description: 'Master Java programming concepts and best practices.',
    icon: <FaCode className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/java/',
  },
  {
    title: 'Python',
    description: 'Get started with Python programming and its libraries.',
    icon: <FaPython className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/python-programming-language/',
  },
  {
    title: 'Computer Fundamentals',
    description: 'Understand basic concepts in computer science.',
    icon: <FaBook className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/computer-fundamentals/',
  },
  {
    title: 'Aptitude',
    description: 'Practice and improve your aptitude skills.',
    icon: <FaCalculator className="text-4xl" />,
    link: 'https://www.geeksforgeeks.org/aptitude-questions/',
  },
];

const Resources = () => {
  // To-Do List logic
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
        <FaBook className="mr-2" />
        Resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {resourcesData.map((resource, index) => (
          <a 
            key={index} 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
          >
            {resource.icon}
            <h3 className="font-semibold text-lg text-white mt-2">{resource.title}</h3>
            <p className="text-gray-300 text-center">{resource.description}</p>
          </a>
        ))}
      </div>

      {/* To-Do List section */}
      <div className='bg-gray-700 p-4 rounded-lg shadow-md'>
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
          <FaBook className="mr-2" />
          To-Do List
        </h2>
        <div className='flex mb-4 text-gray-950'>
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
    </div>
  );
};

export default Resources;
