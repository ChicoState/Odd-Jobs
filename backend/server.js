// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./database');
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
require('dotenv').config();
const cors = require('cors');

// Configure Mongoose
mongoose.set('useCreateIndex', true);

// Initialize the app
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://didactic-space-guide-69g79xrq5xjr25466-3000.app.github.dev', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Enable CORS preflight for all routes
app.options('*', cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Logging Middleware (optional for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Odd Jobs API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
