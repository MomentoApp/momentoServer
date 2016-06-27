const secret = require('../secret');

module.exports = {
  facebookAuth: {
    clientID: process.env.fb_clientID || secret.fb_clientID,
    clientSecret: process.env.fb_clientSecret || secret.fb_clientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
