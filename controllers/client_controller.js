const Client  = require('../models/client_model.js');


//Create new client and insert in the database
exports.create = (req, res) => {
  var client = new Client();
  client.name = req.body.name;
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
    res.json(text["data_client"]);
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
  Client.remove({
            _id: req.params.id
        }, function (err, client) {
            if(err) return res.status(500).send({message: 'Error internal server'});
            res.sendStatus(200);
        });
};
