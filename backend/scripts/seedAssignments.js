const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const AssignmentModel = require('../models/Assignments');
const Usermanagement = require('../models/Usermanagement');

const seedAssignments = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Fetch all users from Usermanagement
    const users = await Usermanagement.find();
    console.log(`Found ${users.length} users`);

    if (users.length === 0) {
      console.log('No users found. Please create users first.');
      process.exit(1);
    }

    // Clear existing assignments
    await AssignmentModel.deleteMany({});
    console.log('Cleared existing assignments');

    // Get the first user as the default assignedBy
    const defaultAssigner = users[0].userName || users[0].name || 'System';

    // Create assignments for each user
    const assignmentsToCreate = [];

    users.forEach(user => {
      // Create Main Assignment for each user
      assignmentsToCreate.push({
        assignedTo: user._id,
        assignedBy: defaultAssigner,
        Assignment: 'Main Assignment'
      });

      // Create Sub Assignment for each user
      assignmentsToCreate.push({
        assignedTo: user._id,
        assignedBy: defaultAssigner,
        Assignment: 'Sub Assignment'
      });
    });

    // Bulk insert all assignments
    const createdAssignments = await AssignmentModel.insertMany(assignmentsToCreate);
    console.log(`Successfully created ${createdAssignments.length} assignments`);
    console.log(`- ${users.length} Main Assignments`);
    console.log(`- ${users.length} Sub Assignments`);

    // Display sample assignments
    console.log('\nSample assignments created:');
    const samples = await AssignmentModel.find().limit(5).populate('assignedTo', 'userName name');
    samples.forEach(assignment => {
      console.log(`  [${assignment._id}] ${assignment.Assignment} -> ${assignment.assignedTo?.userName || assignment.assignedTo?.name} (by ${assignment.assignedBy})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding assignments:', error);
    process.exit(1);
  }
};

seedAssignments();
