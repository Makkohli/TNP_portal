import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

function Dashboard() {
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
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
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
          gradient.addColorStop(0, '#4a90e2'); // Start color
          gradient.addColorStop(1, '#007bff'); // End color
          return gradient;
        },
        borderColor: 'rgba(0,0,0,0)', // No border
        borderWidth: 0,
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: '#444444',
        },
      },
    },
  };

  return (
    <div className='p-6 bg-[#222222]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Total Students Card */}
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold'>Total Students</h2>
          <p className='text-2xl font-bold text-blue-400'>50</p>
        </div>
        
        {/* Placed Students Card */}
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold'>Placed Students</h2>
          <p className='text-2xl font-bold text-red-400'>21</p>
        </div>
        
        {/* Time Left Card */}
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold'>Time Left</h2>
          <p className='text-2xl font-bold text-yellow-400'>16 Days</p>
        </div>
        
        {/* Upcoming Events Card */}
        <div className='lg:col-span-2 bg-[#373737] p-4 rounded-lg shadow-md text-white flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Upcoming Events</h2>
          <p className='text-xl font-bold mb-4'>{`Today, ${dateString}`}</p>
          <div className='flex flex-col gap-2'>
            <div className='bg-[#222222] border border-yellow-400 p-2 rounded-md text-sm'>
              <p className='text-white'>Google Drive - 10am to 12pm</p>
            </div>
            <div className='bg-[#222222] border border-yellow-400 p-2 rounded-md text-sm'>
              <p className='text-white'>Project Meeting - 2pm to 3pm</p>
            </div>
            <div className='bg-[#222222] border border-yellow-400 p-2 rounded-md text-sm'>
              <p className='text-white'>Code Review - 4pm to 5pm</p>
            </div>
          </div>
        </div>
        
        {/* Recent Placements Card */}
        <div className='lg:col-span-2 bg-[#373737] p-4 rounded-lg shadow-md text-white'>
          <h2 className='text-lg font-semibold mb-4'>
            <span className='text-yellow-400 font-bold text-sm'>RECENT PLACEMENTS</span>
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='text-left'>
                  <th className='pb-2 pr-4 font-bold'>Name</th>
                  <th className='pb-2 pr-4 font-bold'>Department</th>
                  <th className='pb-2 pr-4 font-bold'>Company</th>
                  <th className='pb-2 font-bold'>Contact</th>
                </tr>
              </thead>
              <tbody>
                {recentPlacements.map((placement, index) => (
                  <tr key={index} className='border-t border-gray-700'>
                    <td className='py-2 pr-4'>{placement.name}</td>
                    <td className='py-2 pr-4'>{placement.department}</td>
                    <td className='py-2 pr-4'>{placement.company}</td>
                    <td className='py-2'>{placement.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Placement Percentage Card and Bar Chart */}
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
        {/* Placement Percentage Card */}
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold mb-4'>Placement Percentage</h2>
          <div className='w-48 h-48'>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <p className='text-center text-xl mt-4'>{placedPercentage}%</p>
        </div>

        {/* Bar Chart Card */}
        <div className='bg-[#373737] p-4 rounded-lg shadow-md text-white flex flex-col items-center'>
          <h2 className='text-lg font-semibold mb-4'>Company-wise Placements</h2>
          <div className='w-full h-60'>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
