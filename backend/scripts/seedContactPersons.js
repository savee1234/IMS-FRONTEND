const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const OrganizationContactPerson = require('../models/OrganizationContactPerson');
const Organization = require('../models/Organization');
require('dotenv').config();

const seedContactPersons = async () => {
  try {
    await connectDB();
    
    // Get existing organizations
    const organizations = await Organization.find({ isActive: true });
    
    if (organizations.length === 0) {
      console.log('❌ No organizations found. Please run seedOrganizations.js first.');
      process.exit(1);
    }
    
    console.log(`Found ${organizations.length} organizations to create contact persons for.`);
    
    // Sample contact persons data
    const contactPersons = [
      {
        name: 'John Smith',
        title: 'Manager',
        organizationId: organizations[0]._id,
        organizationName: organizations[0].organization,
        email: 'john.smith@abc.com',
        mobileNumber: '+1-555-0101',
        officeContactNumber: '+1-555-0001',
        callingName: 'John',
        createdBy: 'admin',
        createdByName: 'System Administrator'
      },
      {
        name: 'Sarah Johnson',
        title: 'Director',
        organizationId: organizations[0]._id,
        organizationName: organizations[0].organization,
        email: 'sarah.johnson@abc.com',
        mobileNumber: '+1-555-0102',
        officeContactNumber: '+1-555-0002',
        callingName: 'Sarah',
        createdBy: 'admin',
        createdByName: 'System Administrator'
      },
      {
        name: 'Michael Brown',
        title: 'Coordinator',
        organizationId: organizations[1]._id,
        organizationName: organizations[1].organization,
        email: 'michael.brown@xyz.com',
        mobileNumber: '+1-555-0103',
        officeContactNumber: '+1-555-0003',
        callingName: 'Mike',
        createdBy: 'admin',
        createdByName: 'System Administrator'
      },
      {
        name: 'Emily Davis',
        title: 'Supervisor',
        organizationId: organizations[1]._id,
        organizationName: organizations[1].organization,
        email: 'emily.davis@xyz.com',
        mobileNumber: '+1-555-0104',
        officeContactNumber: '+1-555-0004',
        callingName: 'Emily',
        createdBy: 'admin',
        createdByName: 'System Administrator'
      },
      {
        name: 'David Wilson',
        title: 'Executive',
        organizationId: organizations[2]._id,
        organizationName: organizations[2].organization,
        email: 'david.wilson@techsolutions.com',
        mobileNumber: '+1-555-0105',
        officeContactNumber: '+1-555-0005',
        callingName: 'David',
        createdBy: 'admin',
        createdByName: 'System Administrator'
      }
    ];
    
    // Clear existing contact persons (optional)
    // await OrganizationContactPerson.deleteMany({});
    
    // Create contact persons
    for (const contactData of contactPersons) {
      // Check if contact person already exists
      const existingContact = await OrganizationContactPerson.findOne({
        email: contactData.email,
        isActive: true
      });
      
      if (!existingContact) {
        const contactPerson = new OrganizationContactPerson(contactData);
        await contactPerson.save();
        console.log(`✓ Created contact person: ${contactData.name} (${contactData.organizationName})`);
      } else {
        console.log(`- Contact person already exists: ${contactData.name} (${contactData.email})`);
      }
    }
    
    // Display statistics
    const totalContacts = await OrganizationContactPerson.countDocuments({ isActive: true });
    console.log(`\n📊 Total active contact persons in database: ${totalContacts}`);
    
    console.log('\n🎉 Contact persons seeding completed successfully!');
    console.log('💡 You should now see "organizationcontactpersons" collection in MongoDB Compass.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding contact persons:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedContactPersons();
}

module.exports = seedContactPersons;