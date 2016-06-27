const secret = require('../secret');

module.exports = {
  facebookAuth: {
    clientID: 699168510234037,
    clientSecret: 'fc8e52b297b8d090dba37bf2cfa01afa',
    // clientID: process.env.fb_clientID || secret.fb_clientID,
    // clientSecret: process.env.fb_clientSecret || secret.fb_clientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
