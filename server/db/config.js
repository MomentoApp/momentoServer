module.exports = {
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  config: {
    host: 'momento.caxamxz9bjrd.us-west-2.rds.amazonaws.com',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
