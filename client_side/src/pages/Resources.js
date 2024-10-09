import React from 'react';
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

function Resources() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
        <FaBook className="mr-2" />
        Resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
}

export default Resources;
