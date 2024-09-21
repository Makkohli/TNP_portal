import React, { useEffect } from 'react';
import { Home, Users, Briefcase, Calendar, User, MessageCircle } from 'lucide-react'; // Import MessageCircle icon
import { useLocation, Link } from 'react-router-dom';
import '@fontsource/montserrat'; // Ensure you have installed @fontsource/montserrat

const Sidebar = () => {
  const MenuList = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Students', icon: Users, path: '/dashboard/students' },
    { name: 'Companies', icon: Briefcase, path: '/dashboard/companies' },
    { name: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { name: 'Profile', icon: User, path: '/profile' }, // Updated Profile menu item
    { name: 'Query', icon: MessageCircle, path: '/dashboard/query' } // Added Query menu item
  ];

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 h-screen w-80 p-5 bg-[#373737] font-montserrat text-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">NSUT</h1>
        <h2 className="text-sm font-bold">Dwarka, New Delhi</h2>
      </div>
      <hr className="my-6 border border-white" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-[#4971FC] hover:text-white rounded-lg cursor-pointer items-center ${
                location.pathname === menu.path ? 'bg-[#4971FC] text-white' : ''
              }`}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="text-lg font-bold">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
