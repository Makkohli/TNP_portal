import React, { useState } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [newEvent, setNewEvent] = useState({ title: '', description: '' }); // State for the form data

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure both fields have values before submitting
    if (newEvent.title && newEvent.description) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        // API call to create a new event
        const response = await axios.post(
          'http://localhost:3000/api/v1/notices/create',
          newEvent,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
  
        // Check the API response and log it
        console.log('API Response:', response.data);
  
        // Extract the 'notice' from the response and add to the events array
        const newNotice = response.data.notice;  // Extract only the 'notice' part
  
        setEvents((prevEvents) => {
          // Update events array with the new event and limit to 3 events
          const updatedEvents = [newNotice, ...prevEvents].slice(0, 3);
          console.log('Updated Events Array:', updatedEvents);  // Log the updated events array
          return updatedEvents;
        });
  
        // Reset the form fields
        setNewEvent({ title: '', description: '' });
      } catch (error) {
        console.error('Error creating new event:', error);
      }
    }
  };
  

  return (
    <div className="p-6 bg-[#222222] flex-1 overflow-auto text-white">
      <div className="max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Schedule</h1>

        {/* Display upcoming events */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <ul>
            {events.length > 0 ? (
              events.map((event, index) => (
                <li key={index} className="mb-2">
                  <strong>{event.title}</strong>: {event.description}
                </li>
              ))
            ) : (
              <li>No upcoming events</li> // Display if no events are present
            )}
          </ul>
        </div>

        {/* Add new event form */}
        <div className="bg-[#484848] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Add New Event</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="p-2 w-full bg-gray-700 rounded-lg text-white"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                className="p-2 w-full bg-gray-700 rounded-lg text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
