const { sequelize } = require('../config/database');
const Organization = require('../models/Organization');

const initializeDatabase = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ force: true }); // force: true will drop existing tables
    console.log('✅ Database tables created successfully');

    // Insert sample data
    const sampleOrganizations = [
      {
        ORGANIZATION_ID: '1',
        ORGANIZATION: 'ABC Corporation',
        ORGANIZATION_TYPE: 'Type 1',
        CREATED_BY: '015777',
        CREATED_BY_NAME: 'Romaine Murcott',
        CREATED_DTM: new Date('2025-07-17T12:49:20'),
        ENDED_BY: '',
        ENDED_BY_NAME: '',
        END_DTM: null
      },
      {
        ORGANIZATION_ID: '2',
        ORGANIZATION: 'XYZ Industries',
        ORGANIZATION_TYPE: 'Type 2',
        CREATED_BY: '015778',
        CREATED_BY_NAME: 'John Smith',
        CREATED_DTM: new Date('2025-07-16T10:30:15'),
        ENDED_BY: '',
        ENDED_BY_NAME: '',
        END_DTM: null
      },
      {
        ORGANIZATION_ID: '3',
        ORGANIZATION: 'Tech Solutions Ltd',
        ORGANIZATION_TYPE: 'Type 1',
        CREATED_BY: '015779',
        CREATED_BY_NAME: 'Sarah Johnson',
        CREATED_DTM: new Date('2025-07-15T14:15:45'),
        ENDED_BY: '',
        ENDED_BY_NAME: '',
        END_DTM: null
      }
    ];

    await Organization.bulkCreate(sampleOrganizations);
    console.log('✅ Sample data inserted successfully');

    console.log('🎉 Database initialization completed!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    await sequelize.close();
  }
};

// Run if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
