const express = require('express');
const cors = require('cors');
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://tnp-portal-lake.vercel.app',
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from the allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin);  // Allow the requested origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify methods if necessary
  credentials: true,  // Allow credentials (cookies, headers, etc.)
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Your routes here
app.post('/api/v1/auth/login', (req, res) => {
  // Your login logic
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
