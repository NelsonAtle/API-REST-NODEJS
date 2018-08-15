var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');
const Client = require('../controllers/client_controller.js');
const Token  = require('../controllers/token_controller.js');
const UserModel  = require('../models/user_model.js');


//USERS
router.post('/user', User.create);
router.get('/user/:email/:password',Token.loginToken, User.getUser);
router.patch('/user/:id',Token.confirmToken, User.update);

//VIDEOS
router.post('/videos',Token.confirmToken, Video.create);
router.get('/videos/:id',Token.confirmToken, Video.getVideo);
router.patch('/videos/:id',Token.confirmToken, Video.update);

//CLIENTS
router.post('/client', Client.create);
router.get('/client/:id', Client.getClient);
router.patch('/client/:id', Client.update);


module.exports = router;
