const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./../db').User;
const configAuth = require('./config');

module.exports = () => {
  passport.serializeUser((profile, done) => {
    console.log('--------serializeUser', profile);
    done(null, profile);
  });
  passport.deserializeUser((profile, done) => {
    User.findOrCreate({
      where: { facebook_id: profile.id },
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
  },
    (token, refreshToken, profile, done) => {
      console.log('----------', profile, '-----------');
      process.nextTick(() => {
        done(null, profile);
        // User.findOrCreate({
        //   where: { facebook_id: profile.id },
        // })
        // .then(user => done(null, user))
        // .catch(err => done(err));
        //.spread((user, created) => done(null, user, created));
        // User.findOne({
        //   where: { facebook_id: profile.id },
        // }).then((err, user) => {
          // if (err) return done(err);
          // if (user) {
          //   return done(null, user);
          // } else {
          //   User.create({
          //     name: profile.displayName,
          //     facebook_id: profile.id,
          //     facebook_token: token,
          //   })
          //     .then(user => {
          //       done(null, user);
          //     });
          // }
        // });
      });
    }));
};

