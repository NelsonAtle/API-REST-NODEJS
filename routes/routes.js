var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');

//USERS
router.post('/user', User.create);
router.get('/users', User.getUsers);
router.get('/user/:email/:password', User.getUser);
router.patch('/user/:id', User.update);

//VIDEOS
router.post('/video', Video.create);
router.get('/videos', Video.getVideos);
router.get('/video/:id', Video.getVideo);
router.patch('/video/:id', Video.update);

module.exports = router;
