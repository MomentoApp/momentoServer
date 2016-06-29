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
  like_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  view_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
}, {
  freezeTableName: true,
});

const Like = sequelize.define('Like', {
}, {
  freezeTableName: true,
});

const View = sequelize.define('View', {
}, {
  freezeTableName: true,
});

User.hasMany(Video);
Video.belongsTo(User);
User.hasMany(Like);
Like.belongsTo(User);
Video.hasMany(Like);
Like.belongsTo(Video);
User.hasMany(View);
View.belongsTo(User);
Video.hasMany(View);
View.belongsTo(Video);

sequelize.sync();

module.exports = { User, Video, Like, View, sequelize };
