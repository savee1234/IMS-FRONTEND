const mongoose = require('mongoose');
require('dotenv').config();
const Roster = require('../models/Roster');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ims_slt:ims1234@ims.rfgaa63.mongodb.net/IMS_slt');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const clearRosterData = async () => {
  try {
    await connectDB();
    
    console.log('Clearing all roster data...');
    const result = await Roster.deleteMany({});
    
    console.log(`Successfully cleared ${result.deletedCount} rosters from the database.`);
    console.log('Roster data clearing completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error clearing roster data:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  clearRosterData();
}

module.exports = { clearRosterData };