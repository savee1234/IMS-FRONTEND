const mongoose = require('mongoose');
const User = require('../models/User');

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ims_slt:ims1234@ims.rfgaa63.mongodb.net/');
    
    // Check if users already exist
    const existingUser = await User.findOne({ username: 'admin' });
    if (existingUser) {
      console.log('Users already exist');
      return;
    }

    // Create default users
    const defaultUsers = [
      {
        username: 'admin',
        password: 'admin123',
        email: 'admin@ims.com'
      },
      {
        username: 'user',
        password: 'user123',
        email: 'user@ims.com'
      }
    ];

    await User.insertMany(defaultUsers);
    console.log('Default users created successfully');
    
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  seedUsers();
}

module.exports = seedUsers;