const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const authController = require('../controllers/authController');
const likeController = require('../controllers/likeController');
const viewController = require('../controllers/viewController');
const router = require('express').Router();

router
  .get('/api/user', userController.get)
  .post('/api/user', userController.post)
  .get('/api/video/:latitude/:longitude/:radius', videoController.get)
  .get('/api/user_video/', videoController.getUserVideo)
  .post('/api/video', videoController.post)
  .post('/api/delete_video/:video', videoController.deleteVideo)
  .post('/api/view/:video/', viewController.post)
  .post('/api/like/:video/:liked', likeController.post)
  .get('/auth/facebook', authController.facebook)
  .get('/auth/facebook/callback', authController.facebook_callback)
  .post('/logout', authController.logout);

module.exports = router;
