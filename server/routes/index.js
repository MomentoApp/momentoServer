const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
// const authController = require('../controllers/authController');
const passport = require('../auth/passport');
const isLoggedIn = require('../auth/helper');
// import { Router } from 'express';
// const router = new Router();

// router.route('api/user').get(userController.get);
// router.route('api/user').post(userController.post);

// router.route('api/video/:latitude/:longitude/:radius').get(videoController.get);
// router.route('api/video').post(videoController.post);

// router.route('/').get((req, res) => {
//   res.render('../server/views/index.ejs');
// });

// router.route('/profile').get(isLoggedIn, (req, res) => {
//   res.render('../server/views/profile.ejs', {
//     user: req.user,
//   });
// });

// router.route('/auth/facebook').get(
//   passport.authenticate('facebook', {
//     scope: 'email',
//   }));

// router.route('/auth/facebook/callback').get(
//   passport.authenticate('facebook', {
//     successRedirect: '/profile',
//     failureRedirect: '/',
//   }));

// router.route('/logout').get((req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// module.exports = router;

module.exports = (app, passport) => {
  app.get('api/user', userController.get);
  app.post('api/user', userController.post);

  app.get('api/video/:latitude/:longitude/:radius', videoController.get);
  app.post('api/video', videoController.post);

  app.get('/', (req, res) => {
    res.render('../server/views/index.ejs');
  });

  app.get('/login', (req, res) => {
    res.render('../server/views/login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/signup', (req, res) => {
    res.render('../server/views/signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('../server/views/profile.ejs', {
      user: req.user,
    });
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: 'email',
    }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/',
    }),
    (req, res) => {
      res.redirect('/profile');
    });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
