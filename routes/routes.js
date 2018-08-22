var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');
const Client = require('../controllers/client_controller.js');
const Client_Video = require('../controllers/client_video_controller.js');
const Token  = require('../controllers/token_controller.js');
const Email  = require('../controllers/email_controller.js');
const UserModel  = require('../models/user_model.js');



//USERS
router.post('/user', User.create);
router.get('/user/:email/:password',Token.loginToken, User.getToken);
router.get('/user/token',Token.confirmToken, User.getUser);
router.patch('/user/:id',Token.confirmToken, User.update);
router.delete('/user/:id',Token.confirmToken, User.delete);

//VIDEOS
router.post('/videos',Token.confirmToken, Video.create);
router.get('/videos/user/:user',Token.confirmToken, Video.getVideoUser);
router.get('/videos/:id',Token.confirmToken, Video.getVideo);
router.patch('/videos/:id',Token.confirmToken, Video.update);
router.delete('/videos/:id',Token.confirmToken, Video.delete);

//CLIENTS
router.post('/client', Client.create);
router.get('/client/:username/:pin',Token.loginTokenClient, Client.getToken);
router.get('/client/token',Token.confirmToken, Client.getClient);
router.patch('/client/:id',Token.confirmToken, Client.update);
router.delete('/client/:id',Token.confirmToken, Client.delete);
router.get('/client/:user',Token.confirmToken, Client.getClients);

//CLIENTS - VIDEO
router.post('/client_video',Token.confirmToken, Client_Video.create);
router.get('/client_video/video/:client',Token.confirmToken, Client_Video.getVideos);
router.get('/client_video/client/:video',Token.confirmToken, Client_Video.getClients);
router.delete('/client_video/:video',Token.confirmToken, Client_Video.delete);

//EMAIL
router.post('/email/send/:email',Email.sendEmail);
router.patch('/email/verificar/:code',Email.verificar);

module.exports = router;
