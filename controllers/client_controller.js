const Client  = require('../models/client_model.js');


//Create new client and insert in the database
exports.create = (req, res) => {
  var client = new Client();
  client.name = req.body.name;
  client.user = req.body.user;
  client.pin = req.body.pin;
  client.years   = req.body.years;
  client.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(client);
  });
};
//Search user with email and password
exports.getClient = (req, res) => {
  var data = {
    id: req.client[0]._id,
    name: req.client[0].name,
    user: req.client[0].user,
    years: req.client[0].years,
    token: req.token
  }
  res.json(data);
};
//Update a user identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  Client.findByIdAndUpdate(id, update, {new:true}, (err, client) => {
    if(err) return res.status(500).send({message: 'Error internal server'});
        if(client){
            return res.status(200).send({
              client
            });
        }else{
            return res.status(404).send({
                message: 'Not found client'
            });
        }
  });
};
