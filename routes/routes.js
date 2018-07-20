var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');
const Client = require('../controllers/client_controller.js');

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

//CLIENTS
router.post('/client', Client.create);
router.get('/clients', Client.getClients);
router.get('/client/:id', Client.getClient);
router.patch('/client/:id', Client.update);

module.exports = router;
