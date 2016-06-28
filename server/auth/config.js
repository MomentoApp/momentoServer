// const secret = require('../secret') || null;

module.exports = {
  facebookAuth: {
    // clientID: 699168510234037,
    // clientID: 700922706725284,
    clientID: process.env.fb_clientID,
    // clientSecret: '78f7f1063669d29dc61ac114ece1914b',
    clientSecret: process.env.fb_clientSecret,
    // callbackURL: 'http://momento-4.gnzjvesgnp.us-west-2.elasticbeanstalk.com/auth/facebook/callback',
    callbackURL: process.env.fb_callbackURL,
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
