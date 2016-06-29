const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const authController = require('../controllers/authController');
const likeController = require('../controllers/likeController');
const viewController = require('../controllers/viewController');
const isLoggedIn = require('../auth/helper');
const router = require('express').Router();

router.get('/api/user', userController.get);
router.post('/api/user', userController.post);

// router.get('/api/video/:latitude/:longitude/:radius/:user', videoController.get);
router.get('/api/video/:latitude/:longitude/:radius', videoController.get);
router.post('/api/video', videoController.post);
router.post('/api/like/:user/:video/:liked', likeController.post);
router.post('/api/view/:user/:video/', viewController.post);
router.get('/api/user_video/:user', videoController.getUserVideo);

router.get('/', (req, res) => {
  res.render('../server/views/index.ejs');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('../server/views/profile.ejs', {
    user: req.user,
  });
});

router.get('/auth/facebook', authController.facebook);
router.get('/auth/facebook/callback', authController.facebook_callback);
router.get('/logout', authController.logout);

module.exports = router;
