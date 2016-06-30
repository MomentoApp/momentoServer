const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./../db').User;
const configAuth = require('./config');

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  profileFields: ['id', 'email', 'first_name', 'last_name'],
},
  (token, refreshToken, profile, done) => {
    console.log('FACEBOOK PROFILE----', profile, '----FACEBOOK PROFILE');
    console.log('token----', token, '----token');
    process.nextTick(() => {
      User.findOrCreate({
        where: {
          facebook_id: profile.id,
        },
        defaults: {
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          facebook_token: token,
          email: profile.emails[0].value,
        },
      })
      .spread((user, created) => {
        console.log('USER', user, 'CREATED', created);
        if (!created) {
          user.update({
            facebook_token: token,
          })
        }
        done(null, user);
      })
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

