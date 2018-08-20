const Client_Video  = require('../models/client_video_model.js');
const Video  = require('../models/video_model.js');

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
//Delete a relation video and client by id
exports.delete = (req, res) => {
 const id = req.params.video;
  Client_Video.remove({id_video:id},(err, element) => {       
    if(err){ 
      return res.status(500).send({message: 'Error internal server'});
    }
    if(element){
      return res.status(200).send({element});
    }else{
      return res.status(404).send({
        message:'Not found video'
      });
    }
  });
};
