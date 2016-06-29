// Deployment (before pushing to Github): comment out line 4, 8, 10, 12, 15
// Local: comment out line 7, 9, 11, 14

const secret = require('../secret');

module.exports = {
  // username: process.env.db_username,
  username: secret.db_username,
  // password: process.env.db_password,
  password: secret.db_password,
  // database: process.env.db_database,
  database: secret.db_database,
  config: {
    // host: process.env.db_host,
    host: secret.db_host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
