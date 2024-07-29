import React, { useState } from 'react';

const Schedule = () => {
  // Initial state for events
  const [events, setEvents] = useState([
    { id: 1, title: 'Google Drive', time: '10am to 12pm' },
    { id: 2, title: 'Team Meeting', time: '1pm to 2pm' },
    { id: 3, title: 'Project Presentation', time: '3pm to 5pm' }
  ]);

  // State for new event form
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.time) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: '', time: '' }); // Reset form
    }
  };

  return (
    <div className="p-6 bg-[#222222] flex-1 overflow-auto text-white">
      <div className="max-w-4xl mx-auto bg-[#373737] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Schedule</h1>
        
        {/* Display events */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id} className="mb-2">
                <strong>{event.title}</strong> - {event.time}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Form to add new event */}
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
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                placeholder="Event Time"
                className="p-2 w-full bg-gray-700 rounded-lg text-white"
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
