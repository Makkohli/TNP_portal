import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Schedule from './pages/Schedule';
import CompanyDetails from './pages/CompanyDetails'; // Import CompanyDetails
import EditProfile from './pages/EditProfile'; // Import EditProfile
import Profile from './pages/Profile'; // Import Profile
import Query from './pages/Query'; // Import Query

function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-[#222222]">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-80"> {/* Adjust margin to prevent overlap */}
          <Header />
          <main className="p-6 flex-1 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/students" element={<Students />} />
              <Route path="/dashboard/companies" element={<Companies />} />
              <Route path="/dashboard/schedule" element={<Schedule />} />
              <Route path="/company/:id" element={<CompanyDetails />} />
              <Route path="/dashboard/edit-profile" element={<EditProfile />} /> {/* Route for EditProfile */}
              <Route path="/profile" element={<Profile />} /> {/* Route for Profile */}
              <Route path="/dashboard/query" element={<Query />} /> {/* Route for Query */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
