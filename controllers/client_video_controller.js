const Client_Video  = require('../models/client_video_model.js');
const Video  = require('../models/video_model.js');
const Client  = require('../models/client_model.js');

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
exports.getVideos = (req, res) => {
  Client_Video.find({client: req.params.client})
      .then(client_video => {
          if(!client_video) {
              return res.status(404).send({
                  message: "Videos of client not found"
              });
          }
          var size = Object.keys(client_video).length;
          var listaVideos=[];
          for (var i = 0; i < size; i++) {
              var id_video= client_video[i].video;
                Video.findById(id_video).then(video => {
                  if(!video) {
                    return res.status(404).send({
                        message: "Video not found"
                    });
                  }
                  listaVideos.push(video);
                  if (listaVideos.length==size) {
                      res.send(listaVideos);
                  }
                  }).catch(err => {
                    if(err.kind === 'ObjectId') {
                      return res.status(404).send({
                         message: "Video not found"
                      });
                    }
                    return res.status(500).send({
                        message: "Error internal server"
                    });
                });
            
          }
          res.status(200);
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
exports.getClients = (req, res) => {
  Client_Video.find({video: req.params.video})
      .then(client_video => {
          if(!client_video) {
              return res.status(404).send({
                  message: "Video not found"
              });
          }
          var size = Object.keys(client_video).length;
          var listaClientes=[];
          for (var i = 0; i < size; i++) {
              var id_client= client_video[i].client;
                Client.findById(id_client).then(client => {
                  if(!client) {
                    return res.status(404).send({
                        message: "Client not found"
                    });
                  }
                  var data = {
                    _id : client._id,
                    name: client.name
                  };
                  listaClientes.push(data);
                  if (listaClientes.length==size) {
                      res.send(listaClientes);
                  }
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
            
          }
          res.status(200);
          }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Video not found"
              });
          }
          return res.status(500).send({
              message: "Error internal server"
          });
      });
};
//Delete a relation video and client by id
exports.delete = (req, res) => {
 const id = req.params.video;
  Client_Video.remove({video:id},(err, element) => {  

    if(err){ 
      return res.status(500).send({message: 'Error internal server'});
    }
    if(element.n>0){
      return res.status(200).send({element});
    }else{
      return res.status(404).send({
        message:'Not found video'
      });
    }
  });
};
