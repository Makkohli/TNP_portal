// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Schedule from './pages/Schedule';
import CompanyDetails from './pages/CompanyDetails';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Query from './pages/Query';
import Signup from './auth/signup';
import Login from './auth/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    if (storedAuth === 'true' && storedExpirationTime) {
      if (Date.now() < storedExpirationTime) {
        return true;
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('expirationTime');
        return false;
      }
    }
    return false;
  });

  const handleLogin = () => {
    console.log("User logged in");
    const expirationTime = Date.now() + 3600000; // 1 hour from now
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('expirationTime', expirationTime);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationTime');
  };

  console.log("App Render: isAuthenticated", isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen flex bg-[#222222]">
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-80' : ''}`}>
          {isAuthenticated && <Header onLogout={handleLogout} />}
          <main className="p-6 flex-1 overflow-auto">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/dashboard/students" element={isAuthenticated ? <Students /> : <Navigate to="/login" />} />
              <Route path="/dashboard/companies" element={isAuthenticated ? <Companies /> : <Navigate to="/login" />} />
              <Route path="/dashboard/schedule" element={isAuthenticated ? <Schedule /> : <Navigate to="/login" />} />
              <Route path="/company/:id" element={isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />} />
              <Route path="/dashboard/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/dashboard/query" element={isAuthenticated ? <Query /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
