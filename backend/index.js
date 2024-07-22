const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const adminRoutes = require('./routes/adminRoute');
const employeeRoutes = require('./routes/employeeRoute');
require('dotenv').config();

app.use(express.json()); // Middleware to parse JSON bodies

// Set up the CORS policy
app.use(cors({
  origin: '*',
  credentials: true
}));

dbConnect(); // Connect to MongoDB

const PORT = process.env.PORT || 5000;

// Define admin routes
app.use('/api', adminRoutes);

// Define employee routes
app.use('/api', employeeRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Listening to the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
