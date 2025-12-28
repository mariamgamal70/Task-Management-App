const { DataTypes } = require('sequelize');
const sequelize = require('./../server.js');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
    allowNull: false,
    unique: true,
  },
    password: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      notEmpty: true,
      isConfirmed(value) {
        if (value !== this.password) {
          throw new Error('Password confirmation does not match password');
        }   
        }
    }
  }
});

module.exports = User;