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

// Sample employees for roster
const employees = [
  "John Doe",
  "Jane Smith", 
  "Mark Taylor",
  "Alice Moore",
  "David Clark",
  "Sarah Wilson",
  "Michael Brown",
  "Emily Davis"
];

// Generate sample roster data for a month
const generateSampleRosterData = (year, month) => {
  const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
  const daysInMonth = new Date(year, month, 0).getDate();
  const rosterData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month - 1, day);
    const dateStr = dateObj.toISOString().split('T')[0];
    const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    // Create shifts with random employee assignments
    const shifts = ["Shift 01", "Shift 02"].map((shift) => ({
      shift,
      employees: Array(5).fill("").map(() => {
        // Randomly assign employees or leave empty
        return Math.random() > 0.3 ? employees[Math.floor(Math.random() * employees.length)] : "";
      })
    }));

    rosterData.push({
      date: dateStr,
      dayName: weekday,
      shifts
    });
  }

  return rosterData;
};

const sampleRosters = [
  {
    rosterName: "January 2025 Operations Roster",
    month: "2025-01",
    data: generateSampleRosterData(2025, 1),
    createdBy: "ADMIN001",
    createdByName: "System Administrator"
  },
  {
    rosterName: "February 2025 Operations Roster", 
    month: "2025-02",
    data: generateSampleRosterData(2025, 2),
    createdBy: "ADMIN001",
    createdByName: "System Administrator"
  },
  {
    rosterName: "March 2025 Operations Roster",
    month: "2025-03", 
    data: generateSampleRosterData(2025, 3),
    createdBy: "ADMIN001",
    createdByName: "System Administrator"
  }
];

const seedRosters = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing roster data...');
    await Roster.deleteMany({});
    
    console.log('Inserting sample rosters...');
    const insertedRosters = await Roster.insertMany(sampleRosters);
    
    console.log(`Successfully inserted ${insertedRosters.length} sample rosters:`);
    insertedRosters.forEach(roster => {
      console.log(`- ${roster.rosterId}: ${roster.rosterName}`);
    });
    
    console.log('Roster seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding rosters:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedRosters();
}

module.exports = { seedRosters };