var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');
const Client = require('../controllers/client_controller.js');
const Client_Video = require('../controllers/client_video_controller.js');
const Token  = require('../controllers/token_controller.js');
const UserModel  = require('../models/user_model.js');


//USERS
router.post('/user', User.create);
router.get('/user/:email/:password',Token.loginToken, User.getToken);
router.get('/user/token',Token.confirmToken, User.getUser);
router.patch('/user/:id',Token.confirmToken, User.update);

//VIDEOS
router.post('/videos',Token.confirmToken, Video.create);
router.get('/videos/user/:id',Token.confirmToken, Video.getVideoUser);
router.get('/videos/:id',Token.confirmToken, Video.getVideo);
router.patch('/videos/:id',Token.confirmToken, Video.update);
router.delete('/videos/:id',Token.confirmToken, Video.delete);

//CLIENTS
router.post('/client', Client.create);
router.get('/client/:username/:pin',Token.loginTokenClient, Client.getToken);
router.get('/client/token',Token.confirmToken, Client.getClient);
router.patch('/client/:id',Token.confirmToken, Client.update);
router.delete('/client/:id',Token.confirmToken, Client.delete);
router.get('/client/clients',Token.confirmToken, Client.getClients);

//CLIENTS - CATEGORY
router.post('/client_video',Token.confirmToken, Client_Video.create);
router.get('/client_video/:id_client',Token.confirmToken, Client_Video.getClientVideo);
router.delete('/client_video/:id_client/:id_video',Token.confirmToken, Client_Video.delete);


module.exports = router;
