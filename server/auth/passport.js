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
    console.log('token----', token, '----token');
    process.nextTick(() => {
      // User.fineOne({
      //   where: {
      //     facebook_id: profile.id,
      //   },
      // })
      //   .then(user => {
      //     // if no user
      //       // create
      //     // if user
      //       // then 
      //   })
      //   .catch(err => done(err));
      User.findOrCreate({
        where: {
          facebook_id: profile.id,
        },
        defaults: {
          name: profile.displayName,
          facebook_token: token,
        },
      })
      .then(user => done(null, user))
      .catch(err => done(err));
    });
  }));

passport.serializeUser((profile, done) => {
  console.log('serializeUser----', profile, '----serializeUser');
  done(null, profile);
});

passport.deserializeUser((profile, done) => {
  done(null, profile);
});

module.exports = passport;

