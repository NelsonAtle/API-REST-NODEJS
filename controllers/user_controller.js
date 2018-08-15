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
//Send data user with token
exports.getUser = (req, res) => {
    var data = {
      id: req.user[0]._id,
      name: req.user[0].name,
      lastName: req.user[0].lastName,
      birthday: req.user[0].birthday,
      country: req.user[0].country,
      email: req.user[0].email,
      token: req.token
    }
    res.json(data);
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
