const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ims_slt:ims1234@ims.rfgaa63.mongodb.net/IMS_slt');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const listCollections = async () => {
  try {
    await connectDB();
    
    console.log('📋 Listing all collections in IMS_slt database...');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    console.log(`\n📊 Found ${collections.length} collections:\n`);
    
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });
    
    // Specifically check for rosters collection
    const rostersCollection = collections.find(c => c.name === 'rosters');
    if (rostersCollection) {
      console.log('\n✅ "rosters" collection exists!');
      
      // Get count of documents in rosters collection
      const rosterCount = await mongoose.connection.db.collection('rosters').countDocuments();
      console.log(`📊 Number of documents in rosters collection: ${rosterCount}`);
      
      // Get a sample document
      const sampleDoc = await mongoose.connection.db.collection('rosters').findOne();
      if (sampleDoc) {
        console.log('\n📄 Sample roster document:');
        console.log('- ID:', sampleDoc._id);
        console.log('- Roster ID:', sampleDoc.rosterId);
        console.log('- Roster Name:', sampleDoc.rosterName);
        console.log('- Month:', sampleDoc.month);
        console.log('- Created By:', sampleDoc.createdByName);
        console.log('- Active:', sampleDoc.isActive);
      }
    } else {
      console.log('\n❌ "rosters" collection not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error listing collections:', error);
    process.exit(1);
  }
};

// Run the script
listCollections();