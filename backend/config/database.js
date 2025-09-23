const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connectDB = async () => {
  try {
    // Try to connect to the provided MongoDB URI first
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('MongoDB connected successfully to cloud database');
      return;
    }
    
    // Fallback to in-memory MongoDB for development
    console.log('Starting in-memory MongoDB...');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to in-memory MongoDB for development');
    
    // Seed the database with test users
    await seedTestUsers();
    
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedTestUsers = async () => {
  try {
    const User = require('../models/User');
    
    // Check if users already exist
    const existingUser = await User.findOne({ username: 'admin' });
    if (existingUser) {
      console.log('Test users already exist');
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
    console.log('Test users created successfully');
    
  } catch (error) {
    console.error('Error seeding test users:', error);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
};

module.exports = { connectDB, disconnectDB };