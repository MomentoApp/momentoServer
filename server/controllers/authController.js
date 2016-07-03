const passport = require('../auth/passport');
const User = require('../models/userModel');

module.exports = {
  facebook: passport.authenticate('facebook', {
    scope: 'email',
  }),
  facebook_callback: passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
  logout: (req, res) => {
    User.logout(req.get('id'), (err, data) => {
      if (err) throw err;
      if (data) res.send(data);
    })
  },
};
