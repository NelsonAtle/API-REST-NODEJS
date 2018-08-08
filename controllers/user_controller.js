const User  = require('../models/user_model.js');


//Create new user and insert in the database
exports.create = (req, res) => {
  var user = new User();
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.birthday = req.body.birthday;
  user.country = req.body.country;
  user.email   = req.body.email;
  user.password = req.body.password;
  user.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(user);
  });
};
//Search user with email and password
exports.getUser = (req, res) => {
  User.find({email:req.params.email,password: req.params.password})
      .then(user => {
          if(!user) {
              return res.status(404).send({
                  message: "User not found"
              });
          }
          res.send(user);
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
  };
//Update a user identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(id, update, {new:true}, (err, user) => {
    if(err) return res.status(500).send({message: 'Error en el servidor'});
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
