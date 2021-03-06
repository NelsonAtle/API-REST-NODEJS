const User  = require('../models/user_model.js');
const Client  = require('../models/client_model.js');
const Token = require('../models/token_model.js');


//Create new user and insert in the database
exports.create = (req, res) => {
  var user = new User();
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.birthday = req.body.birthday;
  user.country = req.body.country;
  user.email   = req.body.email;
  user.password = req.body.password;
  user.type = "admin";
  user.state = false;
  user.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(user);
  });
};
exports.getToken = (req, res) => {
  var data={
      access_token:req.token
  };
  res.json(data);
}
//Send data user with token
exports.getUser = (req, res) => {
  var base64Url = req.token.split('.')[1];
  let buff = new Buffer(base64Url, 'base64');  
  let text = buff.toString('ascii');
  text = JSON.parse(text);
  
  User.findById(text["data_user"]._id)
      .then(user => {
          if(!user) {
              return res.status(404).send({
                  message: "User not found"
              });
          }
          var data ={
            _id:user._id,
            name:user.name,
            lastName:user.lastName,
            birthday:user.birthday,
            country:user.country,
            email:user.email
          };

          res.send(data);
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
};
//Update a user identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(id, update, {new:true}, (err, user) => {
    if(err) return res.status(500).send({message: 'Error internal server'});
        if(user){
            return res.status(200).send({
              user
            });
        }else{
            return res.status(404).send({
                message: 'Not found user'
            });
        }
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Token.remove({user:id},(err, token) => {       
    if(err){ 
      return res.status(500).send({message: 'Error internal server'});
    }
    if(token){
      return res.status(200).send({token});
    }else{
      return res.status(404).send({
        message:'Not found video'
      });
    }
  });
}