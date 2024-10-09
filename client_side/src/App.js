// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard'; // Assume Dashboard has Admin and Student sub-components
import Students from './pages/Students';
import Companies from './pages/Companies';
import Schedule from './pages/Schedule';
import CompanyDetails from './pages/CompanyDetails';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Query from './pages/Query';
import Signup from './auth/signup';
import Login from './auth/login';
import { NotificationsProvider } from './pages/NotificationsContext'; // Import NotificationsProvider
import CreateCompany from './pages/CreateComp';
import AcademicCalender from './pages/AcademicCalender';
import FAQs from './pages/FAQs';
import Resources from './pages/Resources';

function App() {
  // Initialize authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    if (storedAuth === 'true' && storedExpirationTime) {
      if (Date.now() < storedExpirationTime) {
        return true;
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('role'); // Remove role if session expired
        return false;
      }
    }
    return false;
  });

  // Initialize role state
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole || null;
  });

  // Handle user login
  const handleLogin = (userRole) => { // Accept userRole as a parameter
    console.log("User logged in with role:", userRole);
    const expirationTime = Date.now() + 3600000; // 1 hour from now
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('role', userRole);
  };

  // Handle user logout
  const handleLogout = () => {
    console.log("User logged out");
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
  };

  console.log("App Render: isAuthenticated =", isAuthenticated, ", role =", role);

  return (
    // Wrap the entire Router with NotificationsProvider
    <NotificationsProvider>
      <Router>
        <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Sidebar is visible only when authenticated */}
          {isAuthenticated && <Sidebar />}
          
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-80' : ''}`}>
            {/* Header is visible only when authenticated */}
            {isAuthenticated && <Header onLogout={handleLogout} />}
            
            {/* Main Routes */}
            <main className="p-6 flex-1 overflow-auto">
              <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  isAuthenticated ? (
                    role === 'admin' ? <Dashboard /> : <Students />
                  ) : (
                    <Navigate to="/login" />
                  )
                } />
                <Route path="/dashboard/students" element={
                  isAuthenticated ? <Students /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/companies" element={
                  isAuthenticated ? <Companies /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/schedule" element={
                  isAuthenticated ? <Schedule /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/comp" element={
                  isAuthenticated ? <CreateCompany /> : <Navigate to="/login" />
                } />
                 <Route path="/dashboard/academics" element={
                  isAuthenticated ? <AcademicCalender /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/faqs" element={
                  isAuthenticated ? <FAQs /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/resources" element={
                  isAuthenticated ? <Resources /> : <Navigate to="/login" />
                } />
                <Route path="/company/:id" element={
                  isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/edit-profile" element={
                  isAuthenticated ? <EditProfile /> : <Navigate to="/login" />
                } />
                <Route path="/profile" element={
                  isAuthenticated ? <Profile /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/query" element={
                  isAuthenticated ? <Query /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard/query" element={
                  isAuthenticated ? <Query /> : <Navigate to="/login" />
                } />
               
                
                {/* Catch-All Route for Undefined Paths */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </NotificationsProvider>
  );
}

export default App;
