const Sequelize = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.config
);

const User = sequelize.define('User', {
  name: Sequelize.STRING(20),
}, {
  freezeTableName: true,
});

const Video = sequelize.define('Video', {
  url: Sequelize.STRING,
  point: Sequelize.GEOMETRY,
  title: Sequelize.STRING(20),
  username: Sequelize,
  location: Sequelize.STRING,
}, {
  freezeTableName: true,
});

User.hasMany(Video);
Video.belongsTo(User);

sequelize.sync();

module.exports = { User, Video, sequelize };
