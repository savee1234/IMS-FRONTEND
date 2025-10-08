const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { connectDB } = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const shiftRoutes = require('./routes/shifts');
const operationAvailabilityRoutes = require('./routes/operationAvailability');
const solutionProjectsRoutes = require('./routes/solutionProjects');
const organizationsRoutes = require('./routes/organizations');
const organizationContactPersonsRoutes = require('./routes/organizationContactPersons');
const rosterRoutes = require('./routes/rosters');
const complaintsRoutes = require('./routes/complaints');

const app = express();

const PORT = process.env.PORT || 44354;
const onboardMediumRoutes = require('./routes/onboardMedium');

// Security middleware
app.use(helmet());
app.use(cors());
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB()
  .then(() => {
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Routes
app.use('/Login', authRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/operation-availability', operationAvailabilityRoutes);
app.use('/api/solution-projects', solutionProjectsRoutes);
app.use('/api/organizations', organizationsRoutes);
app.use('/api/organization-contact-persons', organizationContactPersonsRoutes);
app.use('/api/onboard-mediums', onboardMediumRoutes);
app.use('/api/rosters', rosterRoutes);
app.use('/api/complaints', complaintsRoutes);

// Serve React frontend static files
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  // Development mode - just show API info
  app.get('*', (req, res) => {
    res.status(404).json({ error: 'Route not found. In development, run frontend separately.' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Export the app for testing purposes
module.exports = app;