const db = require('./../db');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  get: (someUser, cb) => {
    db.User.findAll({
      // where: { name: someUser.name },
    })
      .then(user => cb(null, user))
      .catch(cb);
  },
  post: (newUser, cb) => {
    db.User.findOrCreate({
      where: { name: newUser.name },
    })
      .spread((user, created) => cb(null, user, created));
  },
  checkToken: (token, cb) => {
    db.User.findOne({
      where: { facebook_token: token },
    })
      .then(user => cb(null, user))
      .catch(cb);
  },
  update: (id, token, cb) => {
    db.User.findOne({
      where: { facebook_id: id },
    })
      .then(user => {
        user.update({
          where: { facebook_token: token },
        })
          .then(user => cb(null, user))
          .catch(cb);
      })
      .catch(cb);
  }
};
