const db = require('./../db');

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
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
      });
    // db.User.create({
    //   name: newUser.name,
    // })
    //   .then((user) => cb(null, user))
    //   .catch(cb);
  },
};
