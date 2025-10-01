const mongoose = require('mongoose');
const OnboardMedium = require('../models/OnboardMedium');
require('dotenv').config();

const clearOnboardMedia = async () => {
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
    console.log('🗑️  Starting to clear onboard media data from cloud database...\n');
    
    // Get count before deletion
    const countBefore = await OnboardMedium.countDocuments();
    console.log(`📊 Found ${countBefore} onboard media records in database`);
    
    // Clear OnboardMedium collection
    const deletedOnboardMedia = await OnboardMedium.deleteMany({});
    console.log(`✅ Deleted ${deletedOnboardMedia.deletedCount} onboard media records from cloud database`);
    
    // Verify deletion
    const remainingOnboardMedia = await OnboardMedium.countDocuments();
    
    console.log('\n📊 Onboard Media Collection Status After Cleanup:');
    console.log(`- Onboard media records remaining: ${remainingOnboardMedia}`);
    
    if (remainingOnboardMedia === 0) {
      console.log('\n🎉 All onboard media data has been successfully cleared from cloud database!');
      console.log('💡 Onboard media collection is now empty and ready for fresh data.');
    } else {
      console.log('\n⚠️  Some onboard media data may still remain in the cloud database.');
    }
    
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from cloud database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing onboard media from cloud database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  clearOnboardMedia();
}

module.exports = clearOnboardMedia;