const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const Organization = require('../models/Organization');
const OrganizationContactPerson = require('../models/OrganizationContactPerson');
require('dotenv').config();

const clearSampleData = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Starting to clear sample data...\n');
    
    // Clear Organization Contact Persons first (due to foreign key relationship)
    const deletedContacts = await OrganizationContactPerson.deleteMany({});
    console.log(`✅ Deleted ${deletedContacts.deletedCount} organization contact persons`);
    
    // Clear Organizations
    const deletedOrganizations = await Organization.deleteMany({});
    console.log(`✅ Deleted ${deletedOrganizations.deletedCount} organizations`);
    
    // Verify deletion
    const remainingOrganizations = await Organization.countDocuments();
    const remainingContacts = await OrganizationContactPerson.countDocuments();
    
    console.log('\n📊 Database Status After Cleanup:');
    console.log(`- Organizations remaining: ${remainingOrganizations}`);
    console.log(`- Contact persons remaining: ${remainingContacts}`);
    
    if (remainingOrganizations === 0 && remainingContacts === 0) {
      console.log('\n🎉 All sample data has been successfully cleared!');
      console.log('💡 Database is now clean and ready for fresh data.');
    } else {
      console.log('\n⚠️  Some data may still remain in the database.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing sample data:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  clearSampleData();
}

module.exports = clearSampleData;