const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./../db').User;
const configAuth = require('./config');

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
},
  (token, refreshToken, profile, done) => {
    console.log('FACEBOOK PROFILE----', profile, '----FACEBOOK PROFILE');
    process.nextTick(() => {
      done(null, profile);
    });
  }));

passport.serializeUser((profile, done) => {
  console.log('serializeUser----', profile, '----serializeUser');
  done(null, profile);
});

passport.deserializeUser((profile, done) => {
  User.findOrCreate({
    where: {
      facebook_id: profile.id,
      name: profile.displayName,
      // facebook_token: token,
    },
  })
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = passport;

