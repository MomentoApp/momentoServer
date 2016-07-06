const db = require('./../db');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  get: (facebook_id, cb) => {
    db.User.findOne({
      where: { facebook_id },
    })
    .then(user => cb(null, user))
    .catch(cb);
  },
  post: (newUser, facebook_id, facebook_token, cb) => {
    db.User.findOne({
      where: { facebook_id }, 
    })
    .then(found => {
      if (found === null) {
        db.User.create({
          name: newUser.name,
          email: newUser.email,
          facebook_id,
          facebook_token,
          facebook_pic: newUser.pictureUrl,
        })
        .then(user => cb(null, user, true))
        .catch(cb);
      } else {
        cb(null, found, false);
      }
    })
  },
  checkToken: (facebook_token, cb) => {
    db.User.findOne({
      where: { facebook_token },
    })
    .then(user => cb(null, user))
    .catch(cb);
  },
  update: (facebook_id, facebook_token, facebook_pic, cb) => {
    console.log('called')
    db.User.findOne({
      where: { facebook_id },
    })
    .then(user => {
      user.update({
        where: { 
          facebook_token,
        },
      })
      .then(user => cb(null, user))
      .catch(cb);
    })
    .catch(cb);
  },
  logout: (facebook_id, cb) => {
    db.User.update({
      facebook_token: null,
    },{
      where: { facebook_id }
    })
    .then(user => cb(null, user))
    .catch(cb);
  },
};
