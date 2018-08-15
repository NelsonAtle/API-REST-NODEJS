const Token  = require('../models/token_model.js');
var jwt = require('jsonwebtoken');
const User  = require('../models/user_model.js');

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
  var correo = req.params.email;
  var pass = req.params.password;
  if (typeof headers === 'undefined') {

    User.find({email:req.params.email,password: req.params.password})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            var token = new Token();
            token.user = user[0]._id;
            token.token = jwt.sign({correo},'token_kids');
            if (user.length != 0) {
              token.save(function(err){
                  if(err) {
                      res.send(err);
                  }
                  res.status(201);
                  req.token = token.token;
                  req.user = user;
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
                message: "User not found"
            });
        });
    }
}
