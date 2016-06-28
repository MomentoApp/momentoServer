// Deployment (before pushing to Github): comment out line 4, 9, 11, 13
// Local: comment out line 8, 10, 12

// const secret = require('../secret');

module.exports = {
  facebookAuth: {
    clientID: process.env.fb_clientID,
    // clientID: secret.fb_clientID,
    clientSecret: process.env.fb_clientSecret,
    // clientSecret: secret.fb_clientSecret,
    callbackURL: process.env.fb_callbackURL,
    // callbackURL: secret.fb_callbackURL,
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
