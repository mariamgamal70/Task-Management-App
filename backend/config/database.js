const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 15,           // Increase for high-traffic apps
      min: 0,
      acquire: 30000,    // Max time (ms) to try to get a connection before error
      idle: 10000        // Time before an idle connection is released
    }
  }
);

module.exports = sequelize;