const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const authController = require('../controllers/authController');
const likeController = require('../controllers/likeController');
const viewController = require('../controllers/viewController');
const isLoggedIn = require('../auth/helper');
const router = require('express').Router();
const db = require('../db');

router
  .use((req, res, next) => {
    console.log('HELLO');
    if (!userID[req.get('id')]) {
      db.User.findOne({
        where: {
          facebook_id: req.get('id'),
        },
      }).then(user => {
        if (user !== null) userID[req.get('id')] = user.id;
        console.log('user', userID);
      }).then(() => {
        next();
      });
    } else {
      next();
    }
  })
  .get('/api/user', userController.get)
  .post('/api/user', userController.post)
  .get('/api/video/:latitude/:longitude/:radius', videoController.get)
  .post('/api/video', videoController.post)
  .post('/api/delete_video/:user/:video', videoController.deleteVideo)
  .post('/api/like/:user/:video/:liked', likeController.post)
  .post('/api/view/:user/:video/', viewController.post)
  .get('/api/user_video/:user', videoController.getUserVideo)
  // authentication test in web browser
  .get('/', (req, res) => {
    res.render('../server/views/index.ejs');
  })
  // authentication test in web browser
  .get('/profile', isLoggedIn, (req, res) => {
    res.render('../server/views/profile.ejs', {
      user: req.user,
    });
  })
  .get('/auth/facebook', authController.facebook)
  .get('/auth/facebook/callback', authController.facebook_callback)
  .get('/logout', authController.logout);

module.exports = router;
