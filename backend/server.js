const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 44354;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Sample data for organizations (replace with database)
let organizations = [
  {
    ORGANIZATION_ID: '1',
    ORGANIZATION: 'ABC Corporation',
    ORGANIZATION_TYPE: 'Type 1',
    CREATED_BY: '015777',
    CREATED_BY_NAME: 'Romaine Murcott',
    CREATED_DTM: '7/17/2025 12:49:20 PM',
    ENDED_BY: '',
    ENDED_BY_NAME: '',
    END_DTM: ''
  },
  {
    ORGANIZATION_ID: '2',
    ORGANIZATION: 'XYZ Industries',
    ORGANIZATION_TYPE: 'Type 2',
    CREATED_BY: '015778',
    CREATED_BY_NAME: 'John Smith',
    CREATED_DTM: '7/16/2025 10:30:15 AM',
    ENDED_BY: '',
    ENDED_BY_NAME: '',
    END_DTM: ''
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'IMS Backend API',
    version: '1.0.0',
    endpoints: {
      organizations: '/MasterData/GetSystemOrganization',
      saveOrganization: '/MasterData/SaveSystemOrganization'
    }
  });
});

// MasterData Routes
app.get('/MasterData/GetSystemOrganization', (req, res) => {
  try {
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

app.post('/MasterData/SaveSystemOrganization', (req, res) => {
  try {
    const { organization, organizationId, organizationType } = req.body;
    
    if (!organization || !organizationId || !organizationType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrganization = {
      ORGANIZATION_ID: organizationId,
      ORGANIZATION: organization,
      ORGANIZATION_TYPE: organizationType,
      CREATED_BY: '015777', // Default user ID
      CREATED_BY_NAME: 'Romaine Murcott', // Default user name
      CREATED_DTM: new Date().toLocaleString(),
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    };

    organizations.push(newOrganization);

    res.json({ message: 'System Organization Successfully Saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save organization' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 IMS Backend Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/`);
});
