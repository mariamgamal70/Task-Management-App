const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  }
});
User.beforeCreate(async (user) => {
  const hashedPassword = await  bcrypt.hash(user.password,12);
  user.password = hashedPassword;
  user.confirmPassword = undefined;
});
User.prototype.correctPassword =async function(candidatePassword,
    userPassword,
) {
  // candidate pass is not hashed (original pass from user), userpassword is hashed
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;