const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const { connectDB } = require('../config/database');

const seedOrganizations = async () => {
  try {
    await connectDB();
    console.log('Connected to database for seeding...');

    // Check if organizations already exist
    const existingOrgs = await Organization.countDocuments();
    if (existingOrgs > 0) {
      console.log('Organizations already exist, skipping seed...');
      return;
    }

    // Create default organizations
    const organizations = [
      {
        organization: 'SLT',
        organizationType: 'Type 1',
        createdBy: 'system',
        createdByName: 'System Administrator'
      },
      {
        organization: 'Mobitel',
        organizationType: 'Type 1',
        createdBy: 'system',
        createdByName: 'System Administrator'
      },
      {
        organization: 'Dialog',
        organizationType: 'Type 2',
        createdBy: 'system',
        createdByName: 'System Administrator'
      },
      {
        organization: 'Hutch',
        organizationType: 'Type 2',
        createdBy: 'system',
        createdByName: 'System Administrator'
      },
      {
        organization: 'Airtel',
        organizationType: 'Type 3',
        createdBy: 'system',
        createdByName: 'System Administrator'
      }
    ];

    const createdOrgs = await Organization.insertMany(organizations);
    console.log(`✅ Successfully seeded ${createdOrgs.length} organizations`);

    // List the created organizations
    createdOrgs.forEach((org, index) => {
      console.log(`${index + 1}. ${org.organization} (${org.organizationId}) - ${org.organizationType}`);
    });

  } catch (error) {
    console.error('Error seeding organizations:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run if called directly
if (require.main === module) {
  seedOrganizations();
}

module.exports = seedOrganizations;