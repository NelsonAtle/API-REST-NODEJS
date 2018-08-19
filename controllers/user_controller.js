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
  user.type = "admin";
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
   res.json(text["data_user"]);
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
