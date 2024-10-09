import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

import CountUp from 'react-countup';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  const recentPlacements = [
    { name: 'John Doe', department: 'Full Stack', company: 'Google', contact: 'john@example.com' },
    { name: 'Jane Smith', department: 'UI/UX', company: 'Apple', contact: 'jane@example.com' },
    { name: 'Bob Johnson', department: 'Data Science', company: 'Amazon', contact: 'bob@example.com' },
  ];

  // Data for the pie chart
  const placedPercentage = 21;
  const totalStudents = 50;
  const unplacedPercentage = totalStudents - placedPercentage;

  const pieData = {
    labels: ['Placed Students', 'Unplaced Students'],
    datasets: [
      {
        data: [placedPercentage, unplacedPercentage],
        backgroundColor: ['#6366f1', '#f43f5e'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Data for the bar chart with gradient bars
  const companies = ['Google', 'Apple', 'Amazon'];
  const placedNumbers = [10, 6, 5];

  const barData = {
    labels: companies,
    datasets: [
      {
        label: 'Students Placed',
        data: placedNumbers,
        backgroundColor: (context) => {
          const canvas = context.chart.canvas;
          const ctx = canvas.getContext('2d');
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, '#6366f1');
          gradient.addColorStop(1, '#818cf8');
          return gradient;
        },
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#e2e8f0',
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#e2e8f0',
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.1)',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce'
    }
  };

  const AnimatedPie = animated(Pie);
  const AnimatedBar = animated(Bar);

  const pieAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const barAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  return (
    <div className='p-6  min-h-screen font-sans'>
      <h1 className="text-3xl font-bold text-white mb-6">Placement Dashboard</h1>
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Total Students Card */}
        <motion.div variants={fadeIn} className='bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg text-white'>
          <h2 className='text-lg font-semibold mb-2'>Total Students</h2>
          <CountUp end={50} duration={2} className='text-4xl font-bold' />
        </motion.div>
        
        {/* Placed Students Card */}
        <motion.div variants={fadeIn} className='bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg text-white'>
          <h2 className='text-lg font-semibold mb-2'>Placed Students</h2>
          <CountUp end={21} duration={2} className='text-4xl font-bold' />
        </motion.div>
        
        {/* Time Left Card */}
        <motion.div variants={fadeIn} className='bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl shadow-lg text-white'>
          <h2 className='text-lg font-semibold mb-2'>Time Left</h2>
          <CountUp end={16} duration={2} className='text-4xl font-bold' suffix=' Days' />
        </motion.div>
        
        {/* Upcoming Events Card */}
        <motion.div variants={slideIn} className='lg:col-span-1 bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg text-white'>
          <h2 className='text-lg font-semibold mb-4'>Upcoming Events</h2>
          <p className='text-sm font-medium mb-4'>{`Today, ${dateString}`}</p>
          <div className='space-y-3'>
            {['Google Drive - 10am to 12pm', 'Project Meeting - 2pm to 3pm', 'Code Review - 4pm to 5pm'].map((event, index) => (
              <motion.div
                key={index}
                className='bg-purple-800 bg-opacity-50 p-3 rounded-lg text-sm'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className='text-white'>{event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Placements and Charts Section */}
      <motion.div
        className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6'
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Recent Placements Card */}
        <motion.div variants={slideIn} className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg text-white'>
          <h2 className='text-xl font-semibold mb-4'>Recent Placements</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='text-left border-b border-gray-600'>
                  <th className='pb-3 pr-4 font-semibold'>Name</th>
                  <th className='pb-3 pr-4 font-semibold'>Department</th>
                  <th className='pb-3 pr-4 font-semibold'>Company</th>
                  <th className='pb-3 font-semibold'>Contact</th>
                </tr>
              </thead>
              <tbody>
                {recentPlacements.map((placement, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='border-b border-gray-700 last:border-b-0'
                  >
                    <td className='py-3 pr-4'>{placement.name}</td>
                    <td className='py-3 pr-4'>{placement.department}</td>
                    <td className='py-3 pr-4'>{placement.company}</td>
                    <td className='py-3'>{placement.contact}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className='space-y-6'>
          {/* Placement Percentage Card */}
          <motion.div variants={fadeIn} className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg text-white'>
            <h2 className='text-xl font-semibold mb-4'>Placement Percentage</h2>
            <div className='flex items-center justify-center'>
              <animated.div style={pieAnimation} className='w-64 h-64'>
                <AnimatedPie data={pieData} options={pieOptions} />
              </animated.div>
            </div>
            <div className='text-center mt-4'>
              <CountUp end={placedPercentage} duration={2} className='text-3xl font-bold' suffix='%' />
              <p className='text-gray-300'>of students placed</p>
            </div>
          </motion.div>

          {/* Company-wise Placements Card */}
          <motion.div variants={fadeIn} className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg text-white'>
            <h2 className='text-xl font-semibold mb-4'>Company-wise Placements</h2>
            <animated.div style={barAnimation} className='w-full h-64'>
              <AnimatedBar data={barData} options={barOptions} />
            </animated.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;