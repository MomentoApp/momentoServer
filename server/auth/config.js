// const secret = require('../secret') || null;

module.exports = {
  facebookAuth: {
    // clientID: 699168510234037,
    clientID: 700922706725284,
    clientSecret: '78f7f1063669d29dc61ac114ece1914b',
    // clientSecret: process.env.fb_clientSecret || secret.fb_clientSecret,
    callbackURL: 'http://momento-4.gnzjvesgnp.us-west-2.elasticbeanstalk.com/auth/facebook/callback',
  },
  googleAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};
