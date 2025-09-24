const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const OrganizationContactPerson = require('../models/OrganizationContactPerson');
require('dotenv').config();

const clearCloudDatabase = async () => {
  try {
    // Connect directly to cloud MongoDB
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    console.log('🌐 Connecting to cloud MongoDB database...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to cloud MongoDB successfully!');
    console.log('🗑️  Starting to clear sample data from cloud database...\n');
    
    // Clear Organization Contact Persons first (due to foreign key relationship)
    const deletedContacts = await OrganizationContactPerson.deleteMany({});
    console.log(`✅ Deleted ${deletedContacts.deletedCount} organization contact persons from cloud database`);
    
    // Clear Organizations
    const deletedOrganizations = await Organization.deleteMany({});
    console.log(`✅ Deleted ${deletedOrganizations.deletedCount} organizations from cloud database`);
    
    // Verify deletion
    const remainingOrganizations = await Organization.countDocuments();
    const remainingContacts = await OrganizationContactPerson.countDocuments();
    
    console.log('\n📊 Cloud Database Status After Cleanup:');
    console.log(`- Organizations remaining: ${remainingOrganizations}`);
    console.log(`- Contact persons remaining: ${remainingContacts}`);
    
    if (remainingOrganizations === 0 && remainingContacts === 0) {
      console.log('\n🎉 All sample data has been successfully cleared from cloud database!');
      console.log('💡 Cloud database is now clean and ready for fresh data.');
    } else {
      console.log('\n⚠️  Some data may still remain in the cloud database.');
    }
    
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from cloud database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing cloud database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  clearCloudDatabase();
}

module.exports = clearCloudDatabase;