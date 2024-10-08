// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import { NotificationsProvider } from './pages/NotificationsContext';
import CreateCompany from './pages/CreateComp';
import AcademicCalender from './pages/AcademicCalender';
import FAQs from './pages/FAQs';
import Resources from './pages/Resources';
import Error from './pages/Error'; // Import the error page

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
        localStorage.removeItem('role');
        return false;
      }
    }
    return false;
  });

  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole || null;
  });

  const handleLogin = (userRole) => {
    const expirationTime = Date.now() + 3600000; // 1 hour from now
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
  };

  return (
    <NotificationsProvider>
      <Router>
        <NavigationGuard isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
          <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-800">
            {isAuthenticated && <Sidebar />}
            <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-80' : ''}`}>
              {isAuthenticated && <Header onLogout={handleLogout} />}
              <main className="p-6 flex-1 overflow-auto">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
                  } />

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
                  
                  {/* Error Route */} 
                  <Route path="/error" element={<Error />} /> {/* Add Error route */}
                  
                  {/* Catch-All Route for Undefined Paths */}
                  <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                </Routes>
              </main>
            </div>
          </div>
        </NavigationGuard>
      </Router>
    </NotificationsProvider>
  );
}

// NavigationGuard to handle navigation
const NavigationGuard = ({ children, isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackNavigation = (event) => {
      // Check if user is authenticated and is on Dashboard or Students page
      if (isAuthenticated && (location.pathname === '/dashboard' || location.pathname === '/dashboard/students')) {
        handleLogout(); // Log out the user
        navigate('/error'); // Redirect to the error page immediately
      }
    };

    // Add event listener for popstate (back button)
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [isAuthenticated, location.pathname, navigate, handleLogout]);

  return children;
};

export default App;