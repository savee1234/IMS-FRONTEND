const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const Organization = require('../models/Organization');
require('dotenv').config();

const seedOrganizations = async () => {
  try {
    await connectDB();
    
    // Clear existing organizations (only if you want to reset)
    // await Organization.deleteMany({});
    
    const organizations = [
      {
        organization: 'ABC Corporation',
        organizationType: 'Type 1',
        createdBy: '015777',
        createdByName: 'Romaine Murcott'
      },
      {
        organization: 'XYZ Industries',
        organizationType: 'Type 2',
        createdBy: '015778',
        createdByName: 'John Smith'
      },
      {
        organization: 'Tech Solutions Ltd',
        organizationType: 'Type 1',
        createdBy: '015779',
        createdByName: 'Sarah Johnson'
      },
      {
        organization: 'Global Systems Inc',
        organizationType: 'Type 3',
        createdBy: '015780',
        createdByName: 'Mike Wilson'
      },
      {
        organization: 'Innovation Corp',
        organizationType: 'Type 2',
        createdBy: '015781',
        createdByName: 'Lisa Brown'
      }
    ];
    
    // Check if organizations already exist
    for (const orgData of organizations) {
      const existingOrg = await Organization.findOne({ 
        organization: { $regex: new RegExp(`^${orgData.organization}$`, 'i') },
        isActive: true 
      });
      
      if (!existingOrg) {
        const organization = new Organization(orgData);
        await organization.save();
        console.log(`✓ Created organization: ${organization.organizationId} - ${orgData.organization}`);
      } else {
        console.log(`- Organization already exists: ${existingOrg.organizationId} - ${orgData.organization}`);
      }
    }
    
    console.log('\n🎉 Organizations seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding organizations:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedOrganizations();
}

module.exports = seedOrganizations;