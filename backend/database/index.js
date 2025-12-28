const sequelize = require('../config/database'); // Path to your Sequelize instance
const { DataTypes } = require('sequelize');

// Import individual models
const User = require('./user.db');
const Task = require('./task.db');

// Define Relationships (Associations)
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); //each task belongs to a user 1 to 1 relation
User.hasMany(Task, { foreignKey: 'userId' });//one to many relation (user can have many tasks)

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
