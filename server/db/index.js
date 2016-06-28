const Sequelize = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.config
);

const User = sequelize.define('User', {
  // name: Sequelize.STRING(20),
  name: Sequelize.STRING,
  facebook_id: Sequelize.BIGINT,
  facebook_token: Sequelize.STRING,
  email: Sequelize.STRING,
}, {
  freezeTableName: true,
});

const Video = sequelize.define('Video', {
  url: Sequelize.STRING,
  point: Sequelize.GEOMETRY,
  title: Sequelize.STRING(20),
  username: Sequelize.STRING,
  location: Sequelize.STRING,
}, {
  freezeTableName: true,
});

User.hasMany(Video);
Video.belongsTo(User);

sequelize.sync();

module.exports = { User, Video, sequelize };
