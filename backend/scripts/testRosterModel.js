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

const testRosterCreation = async () => {
  try {
    await connectDB();
    
    console.log('Testing roster creation...');
    
    // Create a simple test roster
    const testRoster = new Roster({
      rosterName: "Test Roster - December 2024",
      month: "2024-12",
      data: [
        {
          date: "2024-12-01",
          dayName: "Sunday",
          shifts: [
            {
              shift: "Shift 01",
              employees: ["John Doe", "Jane Smith", "", "", ""]
            },
            {
              shift: "Shift 02", 
              employees: ["Mark Taylor", "", "", "", ""]
            }
          ]
        }
      ],
      createdBy: "TEST001",
      createdByName: "Test User"
    });
    
    const savedRoster = await testRoster.save();
    console.log('✅ Test roster created successfully!');
    console.log('Roster ID:', savedRoster.rosterId);
    console.log('MongoDB _id:', savedRoster._id);
    console.log('Roster Name:', savedRoster.rosterName);
    
    // Check if we can find it
    const foundRoster = await Roster.findById(savedRoster._id);
    console.log('✅ Can retrieve the roster from database');
    
    // Check collection stats
    const collection = mongoose.connection.collection('rosters');
    const count = await collection.countDocuments();
    console.log(`📊 Total rosters in collection: ${count}`);
    
    console.log('🎉 Roster model is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during roster creation test:', error);
    process.exit(1);
  }
};

// Run the test
testRosterCreation();