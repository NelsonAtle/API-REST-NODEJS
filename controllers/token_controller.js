const Token  = require('../models/token_model.js');
var jwt = require('jsonwebtoken');
const User  = require('../models/user_model.js');
const Client  = require('../models/client_model.js');

exports.confirmToken=(req,res,next)=> {
  const headers = req.headers['authorization'];
  if (typeof headers !== 'undefined') {
      const header = headers.split(" ");
      Token.find({token: header[1]})
          .then(token => {
              if(!token) {
                  return res.status(404).send({
                      message: "Token not found"
                  });
              }
              if (token.length != 0) {
                req.token = header[1]; 
                next();
              }else {
                return res.status(404).send({
                    message: "Token not found"
                });
              }

              }).catch(err => {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({
                      message: "Token not found"
                  });
              }
              return res.status(500).send({
                  message: "Error internal server"
              });
          });
  }else{
    res.sendStatus(403);
  }
}
exports.loginToken=(req,res,next)=>{
  const headers = req.headers['authorization'];
  if (typeof headers === 'undefined') {
    User.find({email:req.params.email,password: req.params.password})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            var data_user = {
              id:user[0]._id,
              name: user[0].name,
              lastName: user[0].lastName,
              birthday:user[0].birthday,
              country: user[0].country,
              email:user[0].email,
              type: user[0].type
            }
            var token = new Token();
            token.user = user[0]._id;
            token.token = jwt.sign({data_user},'token_kids');
            if (user.length != 0) {
              token.save(function(err){
                  if(err) {
                      res.send(err);
                  }
                  res.status(201);
                  req.token = token.token;
                  next();
              });
            }else {
              return res.status(404).send({
                  message: "User not found"
              });
            }

            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            return res.status(500).send({
                message: "Error internal server"
            });
        });
    }
}
exports.loginTokenClient=(req,res,next)=>{
  const headers = req.headers['authorization'];
  var user = req.params.user;
  if (typeof headers === 'undefined') {
    Client.find({username:req.params.username,pin: req.params.pin})
        .then(client => {
            if(!client) {
                return res.status(404).send({
                    message: "Client not found"
                });
            }
            var data_client = {
              id:client[0]._id,
              name:client[0].name,
              username:client[0].username,
              years:client[0].years,
              type: client[0].type
            }
            var token = new Token();
            token.user = client[0]._id;
            token.token = jwt.sign({data_client},'token_kids');
            if (client.length != 0) {
              token.save(function(err){
                  if(err) {
                      res.send(err);
                  }
                  res.status(201);
                  req.token = token.token;
                  next();
              });
            }else {
              return res.status(404).send({
                  message: "Client not found"
              });
            }

            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found"
                });
            }
            return res.status(500).send({
                message: "Error internal server"
            });
        });
    }
}
