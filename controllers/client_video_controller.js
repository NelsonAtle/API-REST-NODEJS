const Client_Video  = require('../models/client_video_model.js');


//Create new client with video and insert in the database
exports.create = (req, res) => {
  var client_video = new Client_Video();
  client_video.client = req.body.client;
  client_video.video = req.body.video;
  client_video.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(client_video);
  });
};
//Search a videos of client with id
exports.getClientVideo = (req, res) => {
  Client_Video.find({client: req.params.id_client})
      .then(client_video => {
          if(!client_video) {
              return res.status(404).send({
                  message: "Videos of client not found"
              });
          }
          res.send(client_video);

          }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Videos of client not found"
              });
          }
          return res.status(500).send({
              message: "Error internal server"
          });
      });
};
//Delete a relation video and client by id
exports.delete = (req, res) => {
  Client_Video.remove({client: req.params.id_client,video:req.params.id_video}, function (err, client_video) {
      if(err){ 
        return res.status(500).send({message: 'Error internal server'});
      }
      var client_video ={
        n:1,
        ok:1
      }
      res.status(200).send(client_video);
  });
};
