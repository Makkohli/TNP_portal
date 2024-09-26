// src/context/NotificationsContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const NotificationsContext = createContext();

// Create the provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/notices/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort and limit notices
          const sortedNotices = data
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
            .slice(0, 9); // Adjust the slice as needed
          setNotifications(sortedNotices);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch notifications');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, loading, error }}>
      {children}
    </NotificationsContext.Provider>
  );
};
