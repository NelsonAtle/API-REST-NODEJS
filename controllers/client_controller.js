const Client  = require('../models/client_model.js');


//Create new client and insert in the database
exports.create = (req, res) => {
  var client = new Client();
  client.name = req.body.name;
  client.user = req.body.user;
  client.username = req.body.username;
  client.pin = req.body.pin;
  client.years   = req.body.years;
  client.type = "guest";
  client.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(client);
  });
};
exports.getToken = (req, res) => {
  var data={
      access_token:req.token
  };
  res.json(data);
}
//Search a user with email and password
exports.getClient = (req, res) => {
    var base64Url = req.token.split('.')[1];
    let buff = new Buffer(base64Url, 'base64');  
    let text = buff.toString('ascii');
    text = JSON.parse(text);
    Client.findById(text["data_client"]._id)
      .then(client => {
          if(!client) {
              return res.status(404).send({
                  message: "Client not found"
              });
          }
          var data ={
            _id:client._id,
            name:client.name,
            username:client.username,
            years:client.years
          };

          res.send(data);
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
//Delete a user by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Client.findByIdAndRemove(id,(err, client) => {       
    if(err){ 
      return res.status(500).send({message: 'Error internal server'});
    }
    if(client){
      return res.status(200).send({client});
    }else{
      return res.status(404).send({
        message:'Not found client'
      });
    }
  });
}

exports.getClients=(req, res) => {
  const id = req.params.user;
  Client.find({user:id})
      .then(clients => {
          if(!clients) {
              return res.status(404).send({
                  message: "Clients not found"
              });
          }
          res.send(clients);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Clients not found"
              });
          }
          return res.status(500).send({
              message: "Error internal server"
          });
  });
};