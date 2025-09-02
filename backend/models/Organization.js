const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Organization = sequelize.define('Organization', {
  ORGANIZATION_ID: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
    comment: 'Unique identifier for the organization'
  },
  ORGANIZATION: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Name of the organization'
  },
  ORGANIZATION_TYPE: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Type/category of the organization'
  },
  CREATED_BY: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'User ID who created the organization'
  },
  CREATED_BY_NAME: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Name of the user who created the organization'
  },
  CREATED_DTM: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date and time when the organization was created'
  },
  ENDED_BY: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'User ID who ended/deactivated the organization'
  },
  ENDED_BY_NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Name of the user who ended/deactivated the organization'
  },
  END_DTM: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date and time when the organization was ended/deactivated'
  }
}, {
  tableName: 'ORGANIZATIONS',
  timestamps: false,
  comment: 'System organizations table'
});

module.exports = Organization;
