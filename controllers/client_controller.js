const Client  = require('../models/client_model.js');


//Create new client and insert in the database
exports.create = (req, res) => {
  var client = new Client();
  client.idRoot = req.body.idRoot;
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
//Search all clients in database
exports.getClients = (req, res) => {
  Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};
//Search user with email and password
exports.getClient = (req, res) => {
  Client.findById(req.params.id)
      .then(client => {
          if(!client) {
              return res.status(404).send({
                  message: "Client not found"
              });
          }
          res.send(client);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Client not found"
              });
          }
          return res.status(500).send({
              message: "Client not found"
          });
      });
  };
//Update a user identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  Client.findByIdAndUpdate(id, update, {new:true}, (err, client) => {
    if(err) return res.status(500).send({message: 'Error Server'});
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
