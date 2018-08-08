var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');
const Video = require('../controllers/video_controller.js');
const Client = require('../controllers/client_controller.js');
const Token  = require('../models/token_model.js');
const UserModel  = require('../models/user_model.js');
var jwt = require('jsonwebtoken');

//USERS
router.post('/user', User.create);
router.get('/user/:email/:password',loginToken, User.getUser);
router.patch('/user/:id', User.update);

//VIDEOS
router.post('/video', Video.create);
router.get('/video/:id', Video.getVideo);
router.patch('/video/:id', Video.update);

//CLIENTS
router.post('/client', Client.create);
router.get('/client/:id', Client.getClient);
router.patch('/client/:id', Client.update);

function confirmToken(req,res,next) {
  const headers = req.headers['authorization'];
  console.log(headers);
  if (typeof headers !== 'undefined') {
      const header = headers.split(" ");
      header = header[1];
      req.token =  header;
      next();
  }else{
    res.sendStatus(403);
  }

}
function loginToken(req,res,next) {
  var emailpost = req.params.email;
  const headers = req.headers['authorization'];
  //console.log(headers);
  if (typeof headers !== 'undefined') {
      const header = headers.split(" ");
      header = header[1];
      req.token =  header;
      //next();
  }else{
    //res.send(req.params.email);
    UserModel.find({email:emailpost,password: req.params.password})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            var token = new Token();
            token.correo = emailpost;
            token.token = jwt.sign({emailpost},'token_kids');
            token.save(function(err){
                if(err) {
                    res.send(err);
                }
                res.status(201);
                res.json(token);
            });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            return res.status(500).send({
                message: "User not found"
            });
        });
    //res.sendStatus(403);
    /*var token = new Token();
    token.correo = req.body.correo;
    token.token  = jwt.sign({req.body.correo},'token_kids');
    token.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(token);
    });*/
  }
}
module.exports = router;
