const passport = require('../auth/passport');

module.exports = {
  facebook: passport.authenticate('facebook', {
    // scope: ['email', 'user_likes', 'user_location'],
    scope: 'email',
    profileFields: ['id', 'email', 'link'],
  }),
  facebook_callback: passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};
