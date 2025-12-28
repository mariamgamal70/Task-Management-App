const { DataTypes } = require('sequelize');
const sequelize = require('./../server.js');
const User = require('./user.db.js');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'done'),
    defaultValue: 'pending'
  },
});

// Associations
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); //each task belongs to a user 1 to 1 relation
User.hasMany(Task, { foreignKey: 'userId' });//one to many relation (user can have many tasks)

module.exports = Task;
