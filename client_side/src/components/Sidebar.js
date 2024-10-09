import React, { useEffect, useState } from 'react';
import { Home, Users, Briefcase, Calendar } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import '@fontsource/montserrat';

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const adminMenu = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
    {name:'Company', icon:Home, path:'/dashboard/comp'}
  ];

  const studentMenu = [
    { name: 'Dashboard', icon: Home, path: '/dashboard/students' },
    { name: 'Profile', icon: Users, path: '/profile' },
    { name: 'Query', icon: Calendar, path: '/dashboard/query' },
    { name: 'Companies', icon: Briefcase, path: '/dashboard/companies' },
    { name: 'Academic Calender', icon: Briefcase, path: '/dashboard/academics' },
    { name: 'Resources', icon: Briefcase, path: '/dashboard/resources' },
    { name: 'FAQs', icon: Briefcase, path: '/dashboard/faqs' },
  ];

  const MenuList = role === 'admin' ? adminMenu : studentMenu;

  return (
    <div className="fixed top-0 left-0 h-screen w-72 p-5 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl font-montserrat text-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">NSUT</h1>
        <h2 className="text-sm font-medium text-gray-400">Dwarka, New Delhi</h2>
      </div>
      <hr className="my-6 border border-gray-600" />
      <div className="mt-4 space-y-3">
        {MenuList.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                location.pathname === menu.path
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="text-lg font-semibold">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
