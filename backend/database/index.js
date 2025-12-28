const sequelize = require('../config/database'); // Path to your Sequelize instance
const { DataTypes } = require('sequelize');

// Import individual models
const User = require('./user.db');
const Task = require('./task.db');

// Define Relationships (Associations)
Task.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'UserId' });

// Collect all models into one object
const models = {
  User,
  Task,
};

// Export the connection and models
module.exports = {
  sequelize,
  ...models
};
