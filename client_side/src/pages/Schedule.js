import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarPlus, Calendar } from 'lucide-react';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (newEvent.title && newEvent.description) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/notices/create`,
          newEvent,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
  
        console.log('API Response:', response.data);
  
        const newNotice = response.data.notice;
  
        setEvents((prevEvents) => {
          const updatedEvents = [newNotice, ...prevEvents].slice(0, 3);
          console.log('Updated Events Array:', updatedEvents);
          return updatedEvents;
        });
  
        setNewEvent({ title: '', description: '' });
      } catch (error) {
        console.error('Error creating new event:', error);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6  min-h-screen font-sans text-white"
    >
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2" size={28} />
          Schedule
        </h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <AnimatePresence>
            {events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700 p-4 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-semibold text-blue-300">{event.title}</h3>
                    <p className="text-gray-300 mt-1">{event.description}</p>
                  </motion.li>
                ))}</ul>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 italic"
              >
                No upcoming events
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-inner"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CalendarPlus className="mr-2" size={24} />
            Add New Event
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="p-3 w-full bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                className="p-3 w-full bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300 w-full"
            >
              Add Event
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Schedule;