const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');
const User = require('./user.db');

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



module.exports = Task;
