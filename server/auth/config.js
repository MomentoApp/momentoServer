// const secret = require('../secret') || null;

module.exports = {
  facebookAuth: {
    // clientID: 699168510234037,
    clientSecret: 'fc8e52b297b8d090dba37bf2cfa01afa',
    clientID: 699168510234037,
    // clientSecret: process.env.fb_clientSecret || secret.fb_clientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
